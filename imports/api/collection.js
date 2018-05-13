import { Meteor } from "meteor/meteor";
import { Mongo } from "meteor/mongo";
import { check } from "meteor/check";
import Twitter from "twitter";

export const Collection = new Mongo.Collection("collection");
export const User = new Mongo.Collection("user");
export const UserTweets = new Mongo.Collection("usertweets");
export const Following = new Mongo.Collection("following");

if (Meteor.isServer) {
  // This code only runs on the server
  Meteor.publish("collection", function tasksPublication() {
    return Collection.find();
  });
  Meteor.publish("user", function tasksPublication() {
    return User.find();
  });
  Meteor.publish("usertweets", function tasksPublication() {
    return UserTweets.find();
  });
  Meteor.publish("following", function tasksPublication() {
    return Following.find();
  });

  // This method will trigger the streamer
  Meteor.methods({
    "twitter.get.user.data"(query) {
      check(query, String);
      check(query !== "", true);

      console.log("Query search User: " + query);
      // Create the Twitter object
      let client = new Twitter({
        consumer_key: process.env.TWITTER_CONSUMER_KEY,
        consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
        access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
        access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
      });
      let promesaUser = client.get("users/show", { screen_name: query });

      return promesaUser.then(
        (user) => {
          let promesaTweets = client.get("statuses/user_timeline", { user_id: user.id });
          let promesaSeguidores = client.get("friends/list", { user_id: user.id });

          return Promise.all([promesaTweets, promesaSeguidores]).then((values) => {
            let saveDB = new Promise((resolve, reject) => {
              Meteor.call("tweets.save.amount", values[0].length, (err, response) => {
                if (err) reject(err);
                resolve(response);
              });
            });
            saveDB
              .catch(err => console.log(err));
            let d = { user: user, tweets: values[0], seguidores: values[1] };
            return d;
          }).catch(() => {
            console.log("Algo pasa...");
          });
        }
      ).catch((err) => {
        return err;
      });
    }, // twitter.stream
    "tweets.save.amount"(number) {
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
