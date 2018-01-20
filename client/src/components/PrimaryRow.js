/**
 * Created by AndreaMerten on 1/18/17.
 */

import React, {Component} from 'react'
import {connect} from 'react-redux'
import Media from 'react-media'
import {Icon} from 'react-fa'
import {BarChart} from 'react-easy-chart';


import {fetchTweets} from '../actions/index'
import _ from 'lodash'
import './styles.css'



class PrimaryRow extends Component{
  state:{
    inputValue:''
  }

  updateInputValue =(evt) =>{
    this.setState({inputValue: evt.target.value})
  }

  componentDidMount(){
    this.props.fetchTweets('KamalaHarris')
    //console.log('tweets',this.props)

  }

  tweetsToOneWordCount = () =>{
    const no = `if all when not &amp our the of at it so my who as has them about are to i a an this we in their they us by for you with i'm on which would until from and that too have is be —`
    const nonos = no.split(' ')
    nonos.sort()
    console.log(nonos)
    const punctuation = ['.', ',', '?', '!', '"', ';', ':']
    const words={}

    this.props.tweets.forEach(t=>{
      //console.log(t)
      t.full_text.split(' ')
        .forEach(w=>{
          let word = w.toLowerCase()
          if (punctuation.includes(word[word.length-1])) {
            word =word.slice(0, word.length-1)
            //console.log('punct', word)
          }
          if (!nonos.includes(word)){
            if (word in words){
              words[word] +=1
            }
            else {
              words[word] = 1
            }
          }
        })

    })
    const wordArray = _.map(words, (val, key) => {
        return { "x": key, "y": val }
      })
    wordArray.sort((a,b)=>b.y - a.y)
    console.log('wordJSON',wordArray)
    return wordArray
  }

  renderChart=(data)=>{

    return(
      <div style={styles.chartDiv}>
        <BarChart
          colorBars
          axes
          //margin={{top: 50, right: 100, bottom: 50, left: 100}}
          axisLabels={{x: 'Word', y: 'Word Count'}}
          height={500}
          width={1000}
          yTickNumber={data[0].y}
          data={data}
        />
      </div>
    )
  }

  analyzeTweets =()=>{
    const oneWordJSON=this.tweetsToOneWordCount()
    //const dataToChart=oneWordJSON.filter(w=>w.y>5)
    const dataToChart = oneWordJSON.slice(0,20)
    console.log(dataToChart)
    return(
      <div style={styles.nextDiv}>
        {this.renderChart(dataToChart)}

      </div>
    )
  }

  renderPrimaryRow=(style)=> {

    return (
      <div style={style.mainDiv}>
        <h4>Tweet Analysis</h4>
        <input value={this.state.inputValue} onChange={evt => this.updateInputValue(evt)}>
          Whose Tweets Would you Like to Analyze?
        </input>

        {Array.isArray(this.props.tweets)
          ? this.analyzeTweets()
          : <div style={styles.nextDiv}>
             <Icon spin name="spinner" style={styles.iconStyle}/>
          </div>
        }


      </div>
    )
  }

  render() {
    //console.log('tweets in render ',this.props.tweets)
    return (
      <div style={{}}>
        <Media query='(max-width: 812px)'>
          {matches => {
            return (
              matches ? (
                this.renderPrimaryRow(styles.smlScreen)
              ) : (
                this.renderPrimaryRow(styles.lgScreen)
              )
            )
          }
          }
        </Media>

      </div>

    )
  }
}

const styles={
  lgScreen:{
    mainDiv:{
      paddingTop:'60px',
      display:'flex',
      flexDirection:'column',
      justifyContent:'center',
      alignItems:'center',
      width: '75vw'

    },
    nextDiv:{
      display:'flex',
      flexDirection:'column',
      justifyContent:'center',
      alignItems:'center',
      marginTop:'2%'

    },
    spinnerStyle:{
      iconSize:'3x',
      display:'flex',
      justifyContent:'center'
    },
    chartDiv:{
      display:'flex',
      justifyContent:'center',
      alignItems:'center'
    }
  },
  smlScreen:{

  }
}


const mapStateToProps = (state) =>{
  return state
}

export default connect(mapStateToProps, {fetchTweets})(PrimaryRow)
