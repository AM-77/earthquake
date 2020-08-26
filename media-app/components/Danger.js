import React, { Component } from 'react'
import { Text, StyleSheet, View, Platform } from 'react-native'
import Constants from "expo-constants"

export default class Danger extends Component {
  render() {
    const { info } = this.props
    return (
      <View style={styles.container}>
        <View style={styles.innerContainer}>
          <Text style={styles.danger}>!!! DANGER !!!</Text>
          <Text style={styles.dnp}>Dont Panic</Text>
          <Text style={styles.title}>INFOS:</Text>
          <Text style={styles.info}>
            <Text style={styles.infoTitle}>City:</Text>
            <Text style={styles.infoText}> {info.city}</Text>
          </Text>
          <Text style={styles.info}>
            <Text style={styles.infoTitle}>Time:</Text>
            <Text style={styles.infoText}> {`${new Date(info.time).toLocaleString()}`}</Text>
          </Text>
          <Text style={styles.info}>
            <Text style={styles.infoTitle}>Strength:</Text>
            <Text style={styles.infoText}> {info.strength}</Text>
          </Text>
          <Text style={styles.info}>
            <Text style={styles.infoTitle}>Range:</Text>
            <Text style={styles.infoText}> {info.range} KM</Text>
          </Text>
          <Text style={styles.info}>
            <Text style={styles.infoTitle}>Description:</Text>
            <Text style={styles.infoText}> {info.description}</Text>
          </Text>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: 0,
    left: 0,
    paddingTop: Platform.OS === 'android' || Platform.Version < 11 ? Constants.statusBarHeight : 0,
    zIndex: 10
  },
  innerContainer: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  danger: {
    fontSize: 47,
    color: '#f1f2f3'
  },
  dnp: {
    fontSize: 20,
    marginBottom: 25,
    color: '#f1f2f3'
  },
  title: {
    color: '#f1f2f3',
    fontSize: 20,
    marginBottom: 15
  },
  info: {
    flexDirection: 'row',
    width: '80%',
    marginBottom: 10,
  },
  infoTitle: {
    fontSize: 15,
    textDecorationLine: 'underline',
    color: '#f1f2f3'
  },
  infoText: {
    fontSize: 16,
    color: '#f1f2f3'
  }
})
