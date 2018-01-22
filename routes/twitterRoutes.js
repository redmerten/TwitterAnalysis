/**
 * Created by AndreaMerten on 1/18/18.
 */

const Twitter = require('twitter')
const keys = require('../config/keys')
//const mongoose = require('mongoose')
//const Tweets = mongoose.model('tweets')

const client = new Twitter({
  consumer_key: keys.twitterConsumerKey,
  consumer_secret: keys.twitterConsumerSecret,
  access_token_key: keys.twitterAccessToken,
  access_token_secret: keys.twitterAccessTokenSecret
});

//const params = {screen_name: 'nodejs'};
//const params = {screen_name: 'SpeakerRyan'};

const separateTweets = (all) =>{
  const tweets={}
  tweets.tweets = all.filter(t=> t.slice(0,2) !== 'RT')
  tweets.retweets = all.filter(t=> t.slice(0,2) === 'RT')
  return tweets
}

const tweetsToWordCount = (tweets) =>{
  const words={}
  tweets.forEach(t=>{
    t.split(' ').forEach(word=>{
      if (word in words){
        words.word +=1
      }
      else words.word = 0
    })
  })
  return words
}

const addToDatabase =()=>{

}

module.exports = (app) => {
  app.get('/api/tweets', async (req, res) => {
    console.log('numtweets?',req.query.numTweets)

    //grab record from database; check since_id and grab tweets from there


    const params={
      screen_name:req.query.tweeter,
      count:req.query.numTweets,
      tweet_mode: 'extended'
      //since_id: newestId
    }
    //console.log('req from tweets route ',req)

    await client.get('statuses/user_timeline', params,  (error, tweets, response) => {

      //console.log(tweets)
      if (!error) {
        //next time just grab newest tweets by looking at newest id


        //change this to map to a new object with just the database fields
        //sort by id - higher the id, the newer the tweet
        //const t = tweets.map(t => t.full_text)
        const newestId = tweets[0].id
        console.log(newestId)
        //const tweetObj=separateTweets(t)
        //console.log(tweetObj)
        //const tweetWords = tweetsToWordCount(tweetObj.tweets)
        //console.log(tweetWords)
        res.send(tweets)
      }
      else {
        res.send({error:error})
        console.log('ERROR', error)
      }
    })
  })
}
