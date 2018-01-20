import React, {Component} from 'react'
import {BrowserRouter, Route} from 'react-router-dom'
import {connect} from 'react-redux' //allows react component to call action creator
import * as actions from '../actions'
//app will show all components
import '@blueprintjs/core/dist/blueprint.css'


import Header from './Header'
import Landing from './Landing'
import Footer from './Footer'
import BlogDetail from './BlogDetail'


class  App extends Component {

    render () {
      return (
        <div>
          <BrowserRouter>
            <div >
              <Header/>
              <Route exact path="/" component={Landing}/>
              <Route exact path="/detail/:blogid" component={BlogDetail}/>
              <Footer/>
            </div>
          </BrowserRouter>
        </div>
      )
    }
}

//this is imported by main index.js

export default connect(null, actions)(App)
