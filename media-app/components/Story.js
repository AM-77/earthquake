import React, { Component } from 'react'
import { Text, StyleSheet, View, TouchableHighlight, Linking, Image } from 'react-native'

export default class Story extends Component {

  open = (url) => Linking.openURL(url).catch((err) => console.error('An error occurred', err));

  render() {
    const { story } = this.props

    const timeIcon = require ('../assets/time.png')
    const externalIcon = require ('../assets/external.png')
    const heartIcon = require ('../assets/heart.png')
    const webIcon = require ('../assets/web.png')

    return (
      <TouchableHighlight style={styles.container} onPress={() => this.open(story.url)} >
        <View style={styles.innerContainer}>
          <View style={styles.header}>
            <View style={styles.id}>
              <Text style={styles.idIext}><Text style={styles.idIcon}>#</Text> { story.id }</Text>
            </View>
            <View style={styles.time}>
              <Image style={styles.timeIcon} source={timeIcon} />
              <Text style={styles.timeText}>{`${new Date(story.time * 1000).toLocaleDateString()} ${new Date(story.time * 1000).toLocaleTimeString()}` }</Text>
            </View>
          </View>
          <View style={styles.title}>
            <Text style={styles.titleText}>{ story.title }</Text>
            <Image style={styles.externalIcon} source={externalIcon} />
          </View>

          <View style={styles.footer}>
            <View style={styles.score}>
              <Image style={styles.heartIcon} source={heartIcon} />
              <Text style={styles.scoreText}>{ story.score }</Text>
            </View>
            <Text style={styles.author}>by: <Text style={styles.underline}>{ story.by }</Text></Text>
            { story.url && <View style={styles.web}>
              <Image style={styles.webIcon} source={webIcon} />
              <Text style={styles.webText}>{ story.url.slice(story.url.indexOf('//') + 2, story.url.indexOf('/', 8)) }</Text>
            </View> }
          </View>
        </View>
      </TouchableHighlight>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    margin: 20,
    backgroundColor: '#f1f2f3',
    position: 'relative',
    borderRadius: 5,
    padding: 15
  },
  innerContainer: {
    flex: 1
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 15
  },
  idIcon: {
    fontWeight: '700',
    fontSize: 14
  },
  idIext: {
    fontSize: 12
  },
  time: {
    flexDirection: 'row',
    alignItems: 'center',
    fontWeight: 'bold'
  },
  timeIcon: {
    width: 20,
    height: 20,
    marginRight: 5
  },
  timeText: {
    fontSize: 12
  },
  title: {
    width: '100%',
    flexDirection: 'row',
    paddingLeft: 20,
    paddingRight: 20,
    alignItems: 'center',
    justifyContent: 'center'
  },
  titleText: {
    fontSize: 25,
    fontWeight: 'bold',
    marginRight: 10
  },
  externalIcon: {
    width: 25,
    height: 25,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 15
  },
  score: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: 'bold'
  },
  heartIcon: {
    width: 12,
    height: 12,
    marginRight: 5
  },
  scoreText: {
    fontSize: 10
  },
  author: {
    fontSize: 12
  },  
  underline: {
    textDecorationLine: 'underline'
  },
  web: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: 'bold'
  },
  webIcon: {
    width: 12,
    height: 12,
    marginRight: 5
  },
  webText: {
    fontSize: 10
  }
})
