/**
 * Created by AndreaMerten on 1/19/18.
 */


import React from 'react'

const styles={
  div:{
    display:'flex',
    justifyContent:'center',
    marginTop:'5%',
    width: '75vw'
  }
}


const Footer = () => {
  return(
    <div style={styles.div}>
      <p>©2018 AM Market Strategies</p>
    </div>
  )
}


export default Footer