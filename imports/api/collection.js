import { Meteor } from "meteor/meteor";
import { Mongo } from "meteor/mongo";
import { check } from "meteor/check";
import Twitter from "twitter";
import Watson from "watson-developer-cloud/personality-insights/v3";

export const Collection = new Mongo.Collection("collection");
export const User = new Mongo.Collection("user");
export const UserTweets = new Mongo.Collection("usertweets");
export const Following = new Mongo.Collection("following");

if (Meteor.isServer) {
  // This code only runs on the server
  Meteor.publish("collection", function tasksPublication () {
    return Collection.find();
  });
  Meteor.publish("user", function tasksPublication () {
    return User.find();
  });
  Meteor.publish("usertweets", function tasksPublication () {
    return UserTweets.find();
  });
  Meteor.publish("following", function tasksPublication () {
    return Following.find();
  });

  let watsonClient = new Watson({
    url: "https://gateway.watsonplatform.net/personality-insights/api",
    username: process.env.WATSON_USERNAME,
    password: process.env.WATSON_PASSWORD,
    version: "2017-10-13"
  });

  let client = new Twitter({
    consumer_key: process.env.TWITTER_CONSUMER_KEY,
    consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
    access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
    access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
  });

  // This method will trigger the streamer
  Meteor.methods({
    "twitter.get.user.data" (userName) {
      check(userName, String);
      check(userName !== "", true);
      console.log("Query search User: " + userName);
      // Create the Twitter object
      let promesaUser = client.get("users/show", { screen_name: userName });
      return promesaUser.then(user => {
        console.log("se encontro");
        console.log(user);
        // TODO:
        let tweets = Meteor.call("get.tweets", user.id_str);
        let friends = Meteor.call("get.friends", user.id_str);

        let pFriends = [];
        for (var i = 0, j = 0; i < friends.length && j < 6; i++) {
          if (!friends[i].isP) {
            let tFriend = Meteor.call("get.tweets", friends[i].id);
            let pFriend = Meteor.call("get.personality", tFriend);
            pFriends.push({ name: friends[i].name, personality: pFriend });
            j++;
          }
        }

        let userP = Meteor.call("get.personality", tweets);
        return { name: user.name, image: user.profile_image_url_https.replace("_normal", ""), personality: userP,
          friends: pFriends };
      }).catch(err => {
        console.log("error");
        console.log(err);
      });

      // let promesaTweets = client.get("statuses/user_timeline", { user_id: user.id });
      // let promesaSeguidores = client.get("friends/list", { user_id: user.id });
    },
    "get.tweets" (userId) {
      check(userId, String);

      // Create the Twitter object
      let promesaTweets = client.get("statuses/user_timeline", { user_id: userId });
      return promesaTweets.then(tweets => {
        console.log("se encontro tweets");
        let textos = "";
        for (var i = 0; i < tweets.length; i++) {
          textos += tweets[i].text;
        }
        return textos;
      }).catch(err => {
        console.log("error");
        console.log(err);
      });
    },
    "get.friends" (userId) {
      check(userId, String);
      // Create the Twitter object
      let promesaSeguidores = client.get("friends/list", { user_id: userId });
      return promesaSeguidores.then(friends => {
        let idsFriends = friends.users.map((friend, i) => {
          let id = friend.id_str;
          let name = friend.name;
          let isP = friend.protected;
          return { id, name, isP };
        });
        console.log("se encontro friends");
        return idsFriends;
      }).catch(err => {
        console.log("error");
        console.log(err);
      });
    },
    "get.personality" (text) {
      check(text, String);
      check(text !== "", true);

      let profileParams = {
        // Get the content from the JSON file.
        content: text,
        content_type: "text/html;charset=utf-8",
        consumption_preferences: false,
        content_language: "es"

      };
      let personality = new Promise((resolve, reject) => {
        watsonClient.profile(profileParams, (err, { personality }) => {
          if (err) reject(err);
          resolve(personality);
        });
      });
      return personality.then((result) => {
        return result;
      }).catch((err) => {
        console.log("error en watson !!!! ");
        console.log(err);
      });
    },
    "tweets.save.amount" (number) {
      check(number, Number); //checks that an amount of tweets was sent.
      let query = { type: "number" };
      let numberTweets = UserTweets.findOne(query);
      let insert = {};
      if (!numberTweets) {
        insert = { type: "number", number, total: 1 };
      } else {
        numberTweets.number += number;
        numberTweets.total++; //updates the stats of number tweets
        insert = numberTweets;
      }
      UserTweets.update(query, insert, { upsert: true });
    }
  }); //Meteor.methods
}
