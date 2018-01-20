/**
 * Created by AndreaMerten on 10/2/17.
 */



import {FETCH_BLOG} from './types'
import {FETCH_SERVICECHART} from './types'
import {FETCH_TWEETS} from './types'
import axios from 'axios'


export const  fetchBlog = () => async dispatch => {
  const res = await axios.get('/api/blog')
  dispatch({ type: FETCH_BLOG, payload: res.data})
}

export const  fetchServiceChart = () => async dispatch => {
  const res = await axios.get('/api/serviceChart')
  dispatch({ type: FETCH_SERVICECHART, payload: res.data})
}


export const fetchTweets = (tweeter) => async dispatch => {
  console.log('inside tweet action')
  const res = await axios.get('/api/tweets',
    {params: {tweeter}})
  dispatch({ type: FETCH_TWEETS, payload: res.data})
}
