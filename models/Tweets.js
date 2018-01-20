/**
 * Created by AndreaMerten on 1/18/18.
 */
//require this file into index.js

const mongoose = require('mongoose')
const {Schema} = mongoose // mongoose.Schema

const tweetsSchema = new Schema ({

  username: String,
  newestId:Number,

  tweets:[{
    created_at: String,
    id: Number,
    id_str: String,
    source: String,
    tweet: String,
    tweetwords:[{
      one:[{word:String,count:Number}],
      two:[{word:String,count:Number}],
      three:[{word:String,count:Number}]
    }],
  }],

  retweets:[{
    created_at: String,
    id: Number,
    id_str: String,
    source: String,
    retweet: String,
    tweetwords:[{
      one:[{word:String,count:Number}],
      two:[{word:String,count:Number}],
      three:[{word:String,count:Number}]
    }],
  }],
})





//tell mongoose to create a new collection called users
mongoose.model('tweets', tweetsSchema)

//fill the database
