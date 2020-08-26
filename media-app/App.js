import React, { Component } from 'react'
import io from "socket.io-client"
import { Text, StyleSheet, View, Platform, ActivityIndicator, Vibration, Button } from 'react-native'
import Constants from "expo-constants"
import axios from 'axios'
import StoriesList from './components/StoriesList'
import Header from './components/Header'
import Danger from './components/Danger'

export default class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      storiesID: [],
      stories: []
    }    
  }

  async componentDidMount() {
    this.socket = io('http://192.168.43.216:3002', { transports: ['websocket'], jsonp: false })
    this.socket.connect()
    this.socket.on('connect', () => { console.log('connected to socket server') })
    this.socket.on("infos", (danger) => this.setState(() => ({ danger }), () => this.alert()) )
    
    await this.loadIDs()
    await this.loadStories(0)
  }

  loadIDs = async () => {
    const res = await axios.get("https://hacker-news.firebaseio.com/v0/newstories.json")
    this.setState({ storiesID: res.data })
  }

  loadStories = async (startID) => {
    this.setState({ stories: [] })
    const stories = []
    const { storiesID } = this.state
    let i = startID
    while ( true ) {
      let res = await axios.get(`https://hacker-news.firebaseio.com/v0/item/${storiesID[i]}.json`)
      if(res.data) stories.push(res.data)
      if(stories.length == 20) break
      i++
      console.log(i)
    }
    this.setState({ stories })
  }

  refresh = () => {
    this.loadIDs()
    this.loadStories(0)
  }

  alert = () => {
    Vibration.vibrate(5000)
    setTimeout(() => Vibration.vibrate(5000), 8000)
    setTimeout(() => Vibration.vibrate(5000), 16000)

    setTimeout(() => this.setState({danger: null}), 30000)
  }

  render() {
    const { stories, danger } = this.state
    return (
      <View style={ danger ? [styles.container, styles.danger] : styles.container }>
        {
          danger ? 
            <Danger info={danger} />
            :
            <>
              <Header refresh={this.refresh} />
              {
                stories.length === 0 ?
                  <View style={styles.centerIndicator}>
                      <ActivityIndicator size="large" color="#212121" />
                      <Text style={styles.laodingText}>Loading news ...</Text>
                  </View>
                  :
                  <StoriesList stories={stories}/>
              }
            </>
        }
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === 'android' || Platform.Version < 11 ? Constants.statusBarHeight : 0,
  },
  danger: {
    backgroundColor: '#f32013'    
  },
  centerIndicator: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  laodingText: {
    marginTop: 10
  },  
  storiesList: {
    flex: 1
  },
})
