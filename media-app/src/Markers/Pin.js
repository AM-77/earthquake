import React, { Component } from 'react'
import pin from './pin.png'

export default class Pin extends Component {

  constructor(props) {
    super(props)
    this.state = { showInfos: false }
  }

  onPinMouseOver = () => this.setState({ showInfos: true })
  onPinMouseLeave = () => this.setState({ showInfos: false })
  
  render() {
    const { info } = this.props
    const { showInfos } = this.state
    return (<>
      { 
        <div onMouseOver={this.onPinMouseOver} onMouseLeave={this.onPinMouseLeave} className="pin-container">
          {
            showInfos && <div className="info">
              <b>Earthquake</b>
              <p><span>city:</span> { info.city }</p>
              <p><span>time:</span> { new Date(info.time).toGMTString() }</p>
              <p><span>range:</span> { info.range } KM</p>
              <p><span>strength:</span> { info.strength }</p>
              <p><span>description:</span> { info.description }</p>
              <p><span>published at:</span> { new Date(info.published).toGMTString() }</p>
            </div>
          }
          <div className="pin" >
            <img src={pin} alt='pin' />
          </div>
        </div>
      }
      </>
    )
  }
}
