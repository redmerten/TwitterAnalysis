/**
 * Created by AndreaMerten on 12/28/17.
 */
import React from 'react'
import ScrollAnimation from 'react-animate-on-scroll'
import 'animate.css/animate.min.css'
import Media from 'react-media'

import bmx from '../images/typesOfBikes/bmx-bike.png'
import cityCruiser from '../images/typesOfBikes/city-cruiser.png'
import electric from '../images/typesOfBikes/electric-bike.png'
import fixie from '../images/typesOfBikes/fixie.png'
import mountain from '../images/typesOfBikes/mountain-yeti.png'
import road from '../images/typesOfBikes/road-davinci.png'
import kids from '../images/typesOfBikes/kids2.png'
import fat from '../images/typesOfBikes/fatbike.png'


const viewStyle = {
  height:'80vh',
  width:'100vw',
  display:'grid',
  gridTemplateColumns: 'repeat(4,1fr)',
  //gridGap:'5%'
}

const lightBlue='#52A0F5'
const orange = '#BB6558'
const darkBlue = '#0073C4'
const blueBlk='#1A3256'

const fontStyle ={
  fontFamily:'Courier',
  fontVariant: 'small-caps',
  color: blueBlk
}

const styles ={
  lgViewStyle:{
    viewStyle:{
      height:'80vh',
      width:'100vw',
      display:'grid',
      gridTemplateColumns: 'repeat(4,1fr)',
      backgroundColor: orange
    },
    headingStyle:{
      gridColumn:'1/5',
      justifySelf:'center',
      height:'15vh'
    },
    pStyle:{
      fontSize:'2.5em',
      color: blueBlk,
      marginTop:'2%'
    },
    imgGridDiv:{
      gridColumn:'1/5',
      height:'65vh'
    },
    imgsFlexDiv:{
      display:'flex',
      flexDirection:'row',
      flexWrap:'wrap',
      justifyContent:'space-evenly'
    },
    imgTypeDiv:{
      display:'flex',
      flexDirection:'column',
      justifyContent:'center',
      alignItems:'center',
      width:'23vw',
      marginBottom:'2%'
    },
    imgStyle:{
      borderRadius:'50%',
      maxHeight:'22vh',
      maxWidth:'22vw',
      marginTop:'2%'
    },
    bikeTypeStyle:{
      marginTop:'2%',
      ...fontStyle,
      fontSize: '1.5em'
    }
  },

  smlViewStyle:{
    viewStyle:{
      //height:'80vh',
      //width:'100%',
      display:'grid',
      gridTemplateColumns: 'repeat(4,1fr)',
      //backgroundColor: orange
    },
    headingStyle:{
      gridColumn:'1/5',
      justifySelf:'center',
      //height:'20px'
    },
    pStyle:{
      fontSize:'1.5em',
      color: blueBlk,
      marginTop:'2%'
    },
    imgGridDiv:{
      gridColumn:'1/5',
      //height:'150px'
    },
    imgsFlexDiv:{
      display:'flex',
      flexDirection:'row',
      flexWrap:'wrap',
      justifyContent:'space-evenly'
    },
    imgTypeDiv:{
      display:'flex',
      flexDirection:'column',
      justifyContent:'center',
      alignItems:'center',
      width:'40%',
      marginBottom:'2%'
    },
    imgStyle:{
      borderRadius:'50%',
      height:'100px',
      maxWidth:'100%',
      marginTop:'2%'
    },
    bikeTypeStyle:{
      marginTop:'2%',
      ...fontStyle,
      fontSize: '1.5em',
      //alignSelf:'flex-start'
    }

  }
}

const renderBikeRow =(style)=>{
  const bikepics=[mountain, bmx, cityCruiser, road, electric,  kids, fat, fixie]
  const biketypes =['Mountain', 'BMX', 'Cruisers', 'Road',  'Electric', 'Kids', 'Fat Bikes', 'Fixies']
  return(
    <div style={style.viewStyle}>
      <div style={style.headingStyle}>
        <p style={{...fontStyle, ...style.pStyle}}>
          We have bikes for every purpose and budget
        </p>
      </div>
      <div
        style={style.imgGridDiv}>
        <div style={style.imgsFlexDiv}>
          {bikepics.map((p,i)=>{
            return(
              <div key={i}
                   style={style.imgTypeDiv}>
                <ScrollAnimation animateIn='pulse' initiallyVisible={true}
                                 style={{
                                   'display':'flex',
                                   'justifyContent':'center',
                                   'alignItems':'center'
                                 }}>
                  <img src={p} alt=""
                        style={style.imgStyle}
                  />
                </ScrollAnimation>
                <p style={style.bikeTypeStyle}>
                  {biketypes[i]}
                </p>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

const Bikes = ()=>{
  return(
    <div style={{'backgroundColor':orange}} >
      <Media query= '(max-width: 812px)'>
        {matches => {
          console.log('matches', matches)
          return(
            matches ? (
              renderBikeRow(styles.smlViewStyle)
            )
              :
              (
              renderBikeRow(styles.lgViewStyle)
            )
          )
        }
        }
      </Media>

    </div>
  )
}

export default Bikes