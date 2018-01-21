/**
 * Created by AndreaMerten on 10/2/17.
 */

import {FETCH_TWEETS} from './types'
import axios from 'axios'


export const fetchTweets = (tweeter, numTweets) => async dispatch => {
  console.log('inside tweet action')
  const res = await axios.get('/api/tweets',
    {params: {tweeter, numTweets}}
    )
  dispatch({ type: FETCH_TWEETS, payload: res.data})
}
