import React, { Component } from 'react'
import { Marker } from "react-map-gl"
import Pin from './Pin'

export default class Markers extends Component {
  render() {
    const { infos } = this.props
    return (<>
      { 
        infos.map((info, index) => <Marker 
          key={index}
          latitude={ parseFloat(info.latitude) }
          longitude={ parseFloat(info.longitude) }
          >
          <Pin info={info} />
        </Marker> )
      }
      </>
    )
  }
}

