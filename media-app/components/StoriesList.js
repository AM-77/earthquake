import React, { Component } from "react"
import { FlatList } from "react-native"
import Story from "./Story"

export default class StoriesList extends Component {
    renderStory= ({ item }) => (<Story story={item} />) 
    keyExtractor = ({ id }) => id.toString()
    render() { 
      return (<FlatList data={this.props.stories} renderItem={this.renderStory} keyExtractor={this.keyExtractor} />) 
    }
}