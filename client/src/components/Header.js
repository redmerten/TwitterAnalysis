/**
 * Created by AndreaMerten on 9/28/17.
 */

import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import Media from 'react-media'
import './styles.css'

// import {
//   Menu,
//   MenuItem,
//   PopoverInteractionKind,
//   Popover,
//   Position
// } from "@blueprintjs/core"
import '@blueprintjs/core/dist/blueprint.css'
import {Icon} from 'react-fa'


const blueBlk='#1A3256'

const styles ={
  fontStyle:{
    fontFamily:'Helvetica Neue, Helvetica, Arial, sans-serif',
    //fontVariant: 'small-caps',
    color: blueBlk
  },
  navStyle:{
    display:'flex',
    backgroundColor:'white',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems:'center',
    height: '60px',
    boxShadow:'0 0 0 0 '
  },
  navLgBrandDiv: {
    div:{
      flexGrow:'2',
      display:'flex' ,
      justifyContent: 'flex-start',
      alignItems:'center',
      marginLeft:"1%"
    },
    iconSize:'3x',
    textStyle:{
      fontSize:'125%',
      marginTop:'1%',
    },
    brandTextStyle:{
      fontSize:'150%',
      marginTop:'10%',
      fontFamily:'Arial',
      fontVariant: 'small-caps',
      color:blueBlk
    },

  },
  navSmlBrandDiv:{
    div:{
      flexGrow:'5',
      display:'flex' ,
      justifyContent: 'center',
      alignItems:'center',
    },
    iconSize:'2x',
    textStyle:{
      fontSize:'150%',
      marginTop:'5%',
    },
    textDiv:{
      flexGrow:'4'
    },
    brandTextStyle:{
      fontSize:'125%',
      marginTop:'5%',
      fontFamily:'Oldtime',
      fontVariant: 'small-caps',
      color:blueBlk,
      //flexGrow:'4'
    },
  },




  smlViewP:{
    fontFamily:'Helvetica Neue,Helvetica,Arial,sans-serif',
    //fontVariant: 'small-caps',
    color: blueBlk,
    fontSize:'100%',
    marginLeft:'2%'
  },

  lgView:{
    contactUsDiv:{
      marginRight:'2%',
      flexGrow:'.65',
      display:'flex' ,
      justifyContent: 'flex-end'
    }
  },
  smlView:{
    contactUsDiv:{
      marginRight:'2%',
      flexGrow:1,
      display:'flex' ,
      justifyContent: 'flex-end'
    }
  }
}



class Header extends Component {

  renderBrandDiv=(style)=>{
    return(
      <div
        style={style.div}
      >
        <Icon size={style.iconSize} name="eye" style={{'marginLeft':'0%'}}/>
        <Link to='/' //className="pt-navbar-heading"
              style={{"marginLeft":"1%", 'display':'flex', 'alignItems':'center'}}>
          <p style={style.brandTextStyle}>
            Twitter Analyzer
          </p>
        </Link>
      </div>
    )
  }


  render(){
    return(
    <nav
      className="pt-navbar pt-fixed-top "
      style = {styles.navStyle}
    >
        <Media query= '(max-width: 812px)'>
          {matches => {
            console.log('matches', matches)
            return(
              matches ? (
                this.renderBrandDiv(styles.navSmlBrandDiv)
              ):(
                this.renderBrandDiv(styles.navLgBrandDiv)
                )
            )
          }
          }
        </Media>
      </nav>
    )
  }
}


export default Header