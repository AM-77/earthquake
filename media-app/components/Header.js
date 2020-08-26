import React, { Component } from 'react'
import { Text, StyleSheet, View, Image, TouchableOpacity } from 'react-native'

export default class Header extends Component {
  render() {
    const hnIcon = require ('../assets/hn.png')
    const refreshIcon = require ('../assets/refresh.png')
    const { refresh } = this.props
    return (
      <View style={styles.container}>
        <Image style={styles.logo} source={hnIcon} />
        <Text style={styles.text}> Hacker News </Text>
        <TouchableOpacity onPress={refresh} style={styles.refresh}>
          <Image style={styles.refreshIcon} source={refreshIcon} />
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ff6600',
    padding: 10
  },
  logo: {
    width: 30,
    height: 30,
    borderWidth: 1,
    borderColor: '#f1f2f3',
    marginRight: 'auto'
  },
  text: {
    fontSize: 21,
    color: '#f1f2f3'
  },
  refresh: {
    width: 35,
    height: 35,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#f1f2f3',
    marginLeft: 'auto',
    backgroundColor: '#112211'
  },
  refreshIcon: {
    width: 30,
    height: 30,
  }
})
