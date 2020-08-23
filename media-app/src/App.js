import React, { Component } from 'react'
import ReactMapGL from 'react-map-gl'
import { setRTLTextPlugin } from 'mapbox-gl'
import Axios from 'axios'
import md5 from 'md5'
import Markers from './Markers'

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

  async componentDidMount() {
    
    setRTLTextPlugin( 'https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-rtl-text/v0.2.3/mapbox-gl-rtl-text.js', (err) => console.error(err), true )

    const res = await this.fetchData()
    if (res.data && res.data.code === 200) {
      const infos = res.data.infos.map(({ info }) => JSON.parse(info))
      this.setState({ infos, row_infos:  md5(JSON.stringify(res.data.infos)) })

      setInterval(async () => {
        let response = await this.fetchData()
        if (response.data && response.data.code === 200) {
          const row_infos = md5(JSON.stringify(response.data.infos))
          if (row_infos !== this.state.row_infos) {
            const infos = response.data.infos.map(({ info }) => JSON.parse(info))
            this.setState({ infos, row_infos  })
          } else {
            // console.log("fetching ...")
          }   
        } else {
          console.error(response)
        }
      }, 5000)
    } else {
      console.error(res)
    }
  }

  clear = () => Axios.get("http://localhost:3002/clear").then(res => console.log(res)).catch(err => console.error(err))

  fetchData = () => Axios.get("http://localhost:3002/infos")

  setViewport = (viewport) => this.setState({ viewport }) 

  render() {
    const { infos, viewport } = this.state

    return (
      <div className="container">
        
        <div className="heading">
          <h1>The Media App `Data Visualization`</h1>
          {/* <button onClick={this.clear}>clear</button> */}
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
