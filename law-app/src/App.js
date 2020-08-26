import React, { Component } from 'react'
import ReactMapGL from 'react-map-gl'
import { setRTLTextPlugin } from 'mapbox-gl'
import Markers from './Markers'
import io from "socket.io-client"

import "mapbox-gl/dist/mapbox-gl.css"

export default class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      infos: [], 
      row_infos: "",
      viewport: {
        width: "100%",
        height: "100%",
        longitude: 3.04197,
        latitude: 34.7525,
        zoom: 5
      }
    }
  }

  componentDidMount() {
    setRTLTextPlugin( 'https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-rtl-text/v0.2.3/mapbox-gl-rtl-text.js', (err) => console.error(err), true )
    
    this.socket = io("http://localhost:3006")
    this.socket.on("infos", (info) => this.setState((state) => ({ ...state, infos: [...state.infos, info] })))
  }

  setViewport = (viewport) => this.setState({ viewport }) 

  render() {
    const { infos, viewport } = this.state

    return (
      <div className="container">
        <div className="heading">
          <h1>The Law Enforcement App `Data Visualization`</h1>
        </div>
        <div className="map">
          <ReactMapGL
            {...viewport}
            onViewportChange={nextViewport => this.setViewport(nextViewport)} 
            mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
            mapStyle={'mapbox://styles/mapbox/dark-v10'}
            >
            <Markers infos={infos} />
          </ReactMapGL>
        </div>
      </div>
    )
  }
}
