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

const punctuation = ['.', ',', '?', '!', '"', ';', ':']


class PrimaryRow extends Component{
  state={
    inputValue:'',
    tweeter:'',
    numTweets: 200
  }

  updateInputValue =(evt) =>{
    this.setState({inputValue: evt.target.value})
  }
  updateTweeter =(event) =>{
    event.preventDefault()
    this.setState({tweeter: this.state.inputValue})
    this.props.fetchTweets(this.state.tweeter, this.state.numTweets)
  }

  componentDidMount(){
    const mostFollowed =[
      'katyperry', 'justinbieber', 'barackobama', 'rihanna', 'taylorswift13',
      'TheEllenShow', 'ladygaga', 'Oprah', 'Cristiano', 'jtimberlake',
      'nytimes', 'KimKardashian', 'ArianaGrande', 'britneyspears', 'selenagomez',
      'ddlovato', 'cnnbrk', 'BillGates', 'jimmyfallon', 'realDonaldTrump'
    ]
    const pick = Math.floor(Math.random() * 20)
    this.props.fetchTweets(mostFollowed[pick], this.state.numTweets)
    this.setState({inputValue:mostFollowed[pick]})
    //console.log('tweets',this.props)

  }

  tweetsToOneWordCount = () =>{
    const no = `if =&gt all am when not &amp our  the of at it it's so my who as has them about are to i a an this we in their they us her rt @ how was or u me your than must will every more up by for you with his i'm on which would until from and that too have is be —`
    const nonos = no.split(' ')
    nonos.push("it’s")
    nonos.push("i’m")
    nonos.sort()
    console.log(nonos)
    const words={}

    this.props.tweets.forEach(t=>{
      //console.log(t)
      t.full_text.split(' ')
        .forEach(w=>{
          let word = w.toLowerCase().trim()
          if (punctuation.includes(word[word.length-1])) {
            word =word.slice(0, word.length-1)
          }
          if (word==="it's") console.log('its', word)
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
    //console.log('wordJSON',wordArray)
    return wordArray
  }

  tweetsToTwoWords = () =>{
    const tweetParse = (t, words) =>{
      let tw=t
      while (tw.length>1){
        let twoWords=tw.slice(0,2).join(' ')
        if (twoWords in words){
          words.twoWords += 1
        }
        else {
          words[twoWords] = 1
        }
        tw=tw.slice(2)
      }
      return words
    }

    let tweets = []
    this.props.tweets.forEach(t=> {
      //console.log(t)
      let tweet=[]
      t.full_text.split(' ')
        .forEach(w => {
          let word = w.toLowerCase()
          if (punctuation.includes(word[word.length - 1])) {
            word = word.slice(0, word.length - 1)
          }
          tweet.push(word)
        })
      tweets.push(tweet)
    })
    let words={}
    tweets.forEach(t=>{
      words=tweetParse(t, words)
      words=tweetParse(t.slice(1),words)
    })
    //console.log('twor words', words)
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



  analyzeTweets =(style)=>{
    const oneWordJSON=this.tweetsToOneWordCount()
    //const twoWordJSON=this.tweetsToTwoWords()
    //const dataToChart=oneWordJSON.filter(w=>w.y>5)
    const dataToChart = oneWordJSON.slice(0,20)
    //console.log(dataToChart)
    return(
      <div style={style.nextDiv}>
        {this.renderChart(dataToChart)}

      </div>
    )
  }

  renderPrimaryRow=(style)=> {
    console.log('tweeter', this.state.tweeter)
    console.log('value', this.state.inputValue)
    return (
      <div style={style.mainDiv}>
        <h4>Enter A Tweeter for Analysis</h4>
        <form onSubmit={(event)=>this.updateTweeter(event)}
        >
          <input
            type="text"
            value={this.state.inputValue}
            onChange={evt => this.updateInputValue(evt)}
          />
          <input type="submit" value="Submit" />
        </form>

        {this.state.inputValue===''
          ? <div/>
          : <h4 style={style.chartTitle}>Here's what @{this.state.inputValue} cares about</h4>
        }
        {Array.isArray(this.props.tweets)
          ? this.analyzeTweets(style)
          : <div style={style.nextDiv}>
             <Icon spin name="spinner" style={style.spinnerStyle}/>
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
    chartTitle:{
      marginTop:'3%'
    },
    chartDiv:{
      display:'flex',
      justifyContent:'center',
      alignItems:'center'
    },
    submitButton:{

    }
  },
  smlScreen:{

  }
}


const mapStateToProps = (state) =>{
  return state
}

export default connect(mapStateToProps, {fetchTweets})(PrimaryRow)
