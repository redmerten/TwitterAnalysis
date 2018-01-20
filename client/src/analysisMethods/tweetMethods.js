/**
 * Created by AndreaMerten on 1/18/18.
 */


export const separateTweetsRetweets = (tweets) =>{
  const text = tweets.text
  const retweets = text.filter(e=> e[0]==="R" && e[1]==='T')
}