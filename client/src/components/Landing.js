/**
 * Created by CameronMerten on 10/1/17.
 */

import React, {Component} from 'react'
import {connect} from 'react-redux'
import '@blueprintjs/core/dist/blueprint.css'
import PrimaryRow from './PrimaryRow'
import LatestNews from './LatestNews'


class Landing extends Component {

  render(){
    //console.log('state from landing', this.props)
    return (
      <div style={{'paddingTop':'3%'}}>
        <PrimaryRow/>

        {/*<LatestNews/>*/}
      </div>
    )}
}

const mapStateToProps = (state) =>{
  return state
}

export default connect(mapStateToProps)(Landing)
