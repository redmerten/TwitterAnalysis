/**
 * Created by AndreaMerten on 1/18/18.
 */

import {FETCH_TWEETS} from '../actions/types'


//imported by reducers/index

export default function (state = {}, action) {
  switch (action.type) {
    case FETCH_TWEETS:
      return action.payload
    default:
      return state
  }
}
