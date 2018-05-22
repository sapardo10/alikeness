//Incluir rate limiter para evitar brecha de seguridad

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

  let watsonClient1 = new Watson({
    url: "https://gateway.watsonplatform.net/personality-insights/api",
    username: process.env.WATSON_USERNAME1,
    password: process.env.WATSON_PASSWORD1,
    version: "2017-10-13"
  });

  let watsonClient2 = new Watson({
    url: "https://gateway.watsonplatform.net/personality-insights/api",
    username: process.env.WATSON_USERNAME2,
    password: process.env.WATSON_PASSWORD2,
    version: "2017-10-13"
  });

  let clientesWatsonClient = [watsonClient1, watsonClient2];
  let clientesWatsonClientrUso = [0, 0];

  let client = new Twitter({
    consumer_key: process.env.TWITTER_CONSUMER_KEY,
    consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
    access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
    access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
  });

  let client2 = new Twitter({
    consumer_key: process.env.TWITTER_CONSUMER_KEY2,
    consumer_secret: process.env.TWITTER_CONSUMER_SECRET2,
    access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY2,
    access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET2
  });
  let client3 = new Twitter({
    consumer_key: process.env.TWITTER_CONSUMER_KEY3,
    consumer_secret: process.env.TWITTER_CONSUMER_SECRET3,
    access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY3,
    access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET3
  });
  let client4 = new Twitter({
    consumer_key: process.env.TWITTER_CONSUMER_KEY4,
    consumer_secret: process.env.TWITTER_CONSUMER_SECRET4,
    access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY4,
    access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET4
  });
  let client5 = new Twitter({
    consumer_key: process.env.TWITTER_CONSUMER_KEY5,
    consumer_secret: process.env.TWITTER_CONSUMER_SECRET5,
    access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY5,
    access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET5
  });
  let client6 = new Twitter({
    consumer_key: process.env.TWITTER_CONSUMER_KEY6,
    consumer_secret: process.env.TWITTER_CONSUMER_SECRET6,
    access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY6,
    access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET6
  });
  let client7 = new Twitter({
    consumer_key: process.env.TWITTER_CONSUMER_KEY7,
    consumer_secret: process.env.TWITTER_CONSUMER_SECRET7,
    access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY7,
    access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET7
  });
  let client8 = new Twitter({
    consumer_key: process.env.TWITTER_CONSUMER_KEY8,
    consumer_secret: process.env.TWITTER_CONSUMER_SECRET8,
    access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY8,
    access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET8
  });

  let clientesTwitter = [client, client2, client3, client4, client5, client6, client7, client8];
  let clientesTwitterUso = [0, 0, 0, 0, 0, 0, 0, 0];

  // This method will trigger the streamer
  Meteor.methods({
    "get.twitter.account" (userName, lenguage) {
      check(userName, String);
      check(userName !== "", true);
      check(lenguage, String);
      check(lenguage !== "", true);
      check(lenguage === "es" || lenguage === "en", true);
      console.log("Get twitter account " + userName);
      // Create the Twitter object
      let i = Meteor.call("darClienteT");
      console.log("lsito resp");
      let promesaUser = clientesTwitter[i].get("users/show", { screen_name: userName });

      return promesaUser.then(user => {
        console.log("Getted twitter account " + user.screen_name);
        let tweets = Meteor.call("get.tweets", user.id_str);
        let userP = Meteor.call("get.personality", tweets, lenguage);

        return { name: user.screen_name, personality: userP, followers_count: user.followers_count,
          following_count: user.friends_count, image: user.profile_image_url_https.replace("_normal", ""),
          idStr: user.id_str };
      }).catch(err => {
        console.log("error et.twitter.account");
        console.log(err);
        throw new Meteor.Error("Error-Getting-user", err.toString());
      });
    },
    "twitter.get.user.data2" (typeCompare, numberAccunts, idStr, lenguage) {
      check(typeCompare, String);
      check(typeCompare === "following" || typeCompare === "followers", true);
      check(typeCompare !== "", true);
      check(numberAccunts, Number);
      check(numberAccunts <= 20, true);
      check(idStr, String);
      check(idStr !== "", true);

      console.log("Get data " + idStr);
      let compare;

      if (typeCompare === "following") {
        compare = Meteor.call("get.friends", idStr);
      }
      if (typeCompare === "followers") {
        compare = Meteor.call("get.followers", idStr);
      }
      console.log("Got Compare ");
      let pCompate = [];
      for (var i = 0, j = 0; i < compare.length && j < numberAccunts; i++) {
        if (!compare[i].isP) {
          let tFriend = Meteor.call("get.tweets", compare[i].id);
          if (tFriend.split(" ").length >= 100) {
            let pFriend = Meteor.call("get.personality", tFriend, lenguage);
            pCompate.push({ name: compare[i].screenName, personality: pFriend });
            j++;
          }
        }
      }
      console.log("Retromno");
      return { compare: pCompate };
    },
    "get.tweets" (userId) {
      check(userId, String);

      // Create the Twitter object
      let i = Meteor.call("darClienteT");
      console.log("lsito resp");
      let promesaTweets = clientesTwitter[i].get("statuses/user_timeline",
        { user_id: userId, include_rts: "false", trim_user: "true", count: "200" });
      return promesaTweets.then(tweets => {
        let textos = "";
        for (var i = 0; i < tweets.length; i++) {
          let resp = tweets[i].text.split("https");
          textos += resp[0];
        }
        return textos;
      }).catch(err => {
        console.log("error get.tweets");
        console.log(err);
        throw new Meteor.Error("Error-Getting-tweets", err.toString());
      });
    },
    "get.friends" (userId) {
      check(userId, String);
      // Create the Twitter object
      let i = Meteor.call("darClienteT");
      let promesaSeguidores = clientesTwitter[i].get("friends/list",
        { user_id: userId, count: "200" });
      return promesaSeguidores.then(friends => {
        let idsFriends = friends.users.map((friend, i) => {
          let id = friend.id_str;
          let name = friend.name;
          let isP = friend.protected;
          let screenName = friend.screen_name;
          return { id, name, isP, screenName };
        });
        console.log("se encontro friends");
        return idsFriends;
      }).catch(err => {
        console.log("error get.friends");
        console.log(err);
        throw new Meteor.Error("Error-Getting-friends", err.toString());
      });
    },
    "get.followers" (userId) {
      check(userId, String);
      // Create the Twitter object
      let i = Meteor.call("darClienteT");
      let promesaSeguidores = clientesTwitter[i].get("followers/list",
        { user_id: userId, count: "200" });
      return promesaSeguidores.then(friends => {
        let idsFriends = friends.users.map((friend, i) => {
          let id = friend.id_str;
          let name = friend.name;
          let screenName = friend.screen_name;
          let isP = friend.protected;
          return { id, name, isP, screenName };
        });
        console.log("se encontro followers");
        return idsFriends;
      }).catch(err => {
        console.log("error get.followers");
        console.log(err);
        throw new Meteor.Error("Error-Getting-Followers", err.toString());
      });
    },
    "get.personality" (text, lenguage) {
      check(text, String);
      check(text !== "", true);
      check(lenguage, String);
      check(lenguage !== "", true);
      check(lenguage === "es" || lenguage === "en", true);

      let profileParams = {
        // Get the content from the JSON file.
        content: text,
        content_type: "text/html;charset=utf-8",
        consumption_preferences: false,
        content_language: lenguage
      };
      let personality = new Promise((resolve, reject) => {
        let index = Meteor.call("darClienteWatson");
        clientesWatsonClient[index].profile(profileParams, (err, { personality }) => {
          if (err) reject(err);
          resolve(personality);
        });
      });
      return personality.then((result) => {
        return result;
      }).catch((err) => {
        console.log("error en watson !!!! ");
        console.log(err);
        throw new Meteor.Error("Error-watson", err.toString());
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
    },
    "darClienteT" () {
      let min = 9999999999999999;
      let index = -1;
      for (let i = 0; i < clientesTwitterUso.length; i++) {
        if (clientesTwitterUso[i] <= min) {
          min = clientesTwitterUso[i];
          index = i;
        }
      }
      console.log("Regisro uso twitter");
      clientesTwitterUso[index]++;
      console.log(clientesTwitterUso);
      return index;
    },
    "darClienteWatson" () {
      let min = 9999999999999999;
      let index = -1;
      for (let i = 0; i < clientesWatsonClientrUso.length; i++) {
        if (clientesWatsonClientrUso[i] <= min) {
          min = clientesWatsonClientrUso[i];
          index = i;
        }
      }
      console.log("registro uso whaton");
      clientesWatsonClientrUso[index]++;
      console.log(clientesWatsonClientrUso);
      return index;
    }
  }); //Meteor.methods
}
