/**
 * Created by AndreaMerten on 12/26/17.
 */

import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {fetchBlog} from '../actions/index'
import Media from 'react-media'


const lightBlue='#52A0F5'
const orange = '#BB6558'
const darkBlue = '#0073C4'
const blueBlack='#031E39'
const blueBlk='#1A3256'

const flexStyle={
  display:'flex'
}

const gridStyle={
  display:'grid',

}

const fontStyle ={
  fontFamily:'Helvetica Neue, Helvetica, Arial, sans-serif',
  //fontVariant: 'small-caps',
  color: blueBlk
}




const buttonStyle ={
  backgroundColor: orange, /* Green */
  border: 'none',
  color: blueBlk,
  padding: '2% 5%',
  textAlign: 'center',
  textDecoration: 'none',
  //display: inline-block,
  //fontSize: '2em',
  width:'175px'

}

const styles ={
  lgViewStyle:{
    mainDiv:{
      height:'80vh',
      width:'100vw',
      backgroundColor:lightBlue,
      display:'grid',
    },
    headerDiv:{
      display:'flex',
      justifyContent:'center',
      alignItems:'center',
      //'height':'10vh'
    },
    headerP:{
      fontSize:'2.5em',
      color: blueBlk,
      marginTop:'0%'
    },
    allBlogsDiv:{
      display:'flex',
      justifyContent:'space-between',
      //'alignItems':'flex-start',
      //'maxHeight':'90vh',
      margin:'0% 5% 0% 5%'
    },
    blogDiv:{
      display:'flex',
      flexDirection:'column',
      justifyContent:'space-between',
      width: '25vw',
      marginBottom:'5vh'
    },
    imgStyle:{
      width:'25vw',
      height:'25vh'
    },
    blogTitle:{
      marginTop:'2%',
      lineHeight:'150%'
    },
    contentStyle:{
      fontSize:'1.25em',
      marginTop:'2%'
    },
    buttonFontSize:{
      fontSize:'150%'
    }

  },

  smViewStyle:{
    mainDiv:{
      backgroundColor:lightBlue,
      display:'flex',
      flexDirection:'column'
    },
    headerDiv:{
      display:'flex',
      justifyContent:'center',
      alignItems:'center',
      height:'75px',
      marginBottom: '0px'
    },
    headerP:{
      fontSize:'150%',
      color: blueBlk,
      marginTop:'0%'
    },
    allBlogsDiv:{
      display:'flex',
      flexDirection:'column',
      justifyContent:'center',
      //'alignItems':'center',
      //'maxHeight':'90vh',
      margin:'0% 10% 5% 10%'
    },
    blogDiv:{
      display:'flex',
      flexDirection:'column',
      justifyContent:'flex-start',
      alignItems:'flex-start',
      //width: '25vw',
      marginBottom:'10%'
    },
    imgStyle:{
      maxWidth:'100%',
      height:'280px',
    },
    blogTitle:{
      marginTop:'2%',
      lineHeight:'150%'
    },
    contentStyle:{
      fontSize:'1.25em',
      marginTop:'1%'
    },
    buttonFontSize:{
      fontSize:'150%'
    }

  }
}

class LatestNews extends Component{

  componentDidMount(){
    this.props.fetchBlog()
    //console.log('latest news',this.props)
  }


  renderBlog=(style)=> {
    if (this.props.blog.map) {
      console.log(this.props.blog)
      const blogs = this.props.blog.slice(0,3)

      return(
        <div style={style.allBlogsDiv}
        >
          {blogs.map((b)=>{
            return(
              <div
                key={b.id}
                style={style.blogDiv}
              >
                <img
                  src={b.thumbnail.link} alt=""
                  style={style.imgStyle}>
                </img>
                <h5 style={style.blogTitle}>
                  {b.title}
                </h5>

                <p style={style.contentStyle}>
                  {b.content.length > 150 ? b.content.slice(0,150) : b.content}
                </p>
                <Link
                  to={`/detail/${b.id}`}
                >
                  <button
                    style={{...buttonStyle, ...fontStyle, ...style.buttonFontSize}}
                  >Read More</button>
                </Link>
              </div>
            )
          })}
        </div>
      )
    }
    else return <div/>
  }


  renderLatestNews(style){
    return(
      < div style={style.mainDiv}>
          <div style={style.headerDiv}>
            <p style={{...fontStyle, ...style.headerP}}>
              Latest News
            </p>
          </div>

        {this.renderBlog(style)}
      </div>
    )
  }

  render(){
    return (
      <div style={{'backgroundColor': lightBlue}}>
        <Media query='(max-width: 812px)'>
          {matches => {
            return (
              matches ? (
                this.renderLatestNews(styles.smViewStyle)
              ) : (
                this.renderLatestNews(styles.lgViewStyle)
              )
            )
          }
          }
        </Media>
      </div>
    )
  }
}


const mapStateToProps = (state) =>{
  return state
}

export default connect(mapStateToProps, {fetchBlog})(LatestNews)