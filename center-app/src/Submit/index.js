import React, { Component } from 'react'
import Axios from 'axios'
import "./style.css"

export default class index extends Component {

  constructor(props) {
    super(props)
    this.state = { currentState: 1 } 
    this.states = ["error", "success"]
  }

  onClick = () => {
    const { currentState } = this.state
    currentState ? this.setState({ currentState: 0 }) : this.setState({ currentState: 1 })
	
    let button = this.refs.button
    
    if ( button.classList.contains("success") ){ button.classList.remove("success") }
    if ( button.classList.contains("error") ){ button.classList.remove("error") }

    else {
      button.classList.add("loading")
      const { city, latitude, time, date, longitude, range, strength, description } = this.props.infos
      if ( !city || !latitude || !time || !date || !longitude || !range || !strength || !description ) {
        button.classList.remove("loading")
        button.classList.add(this.states[0])

        setTimeout(() => {
          if ( button.classList.contains("success") ){ button.classList.remove("success") }
          if ( button.classList.contains("error") ){ button.classList.remove("error") }
        }, 2500)
      } else {
        Axios.post('http://localhost:3001/infos', { city, latitude, longitude, time: new Date(`${date} ${time}`), range, strength, description })
          .then(res => {
            button.classList.remove("loading")
            if (res.data.code === 200 ) button.classList.add(this.states[1])
            else button.classList.add(this.states[0])

            setTimeout(() => {
              if ( button.classList.contains("success") ){ button.classList.remove("success") }
              if ( button.classList.contains("error") ){ button.classList.remove("error") }
            }, 2500)
          })
          .catch(err => {
            button.classList.remove("loading")
            button.classList.add(this.states[0])

            setTimeout(() => {
              if ( button.classList.contains("success") ){ button.classList.remove("success") }
              if ( button.classList.contains("error") ){ button.classList.remove("error") }
            }, 2500)
          })
      }
    }
  }

  render() {
    return (
      <div className="buttonContainer">
        <div onClick={this.onClick} ref="button" className="animate-btn"><span>Publish</span></div>
      </div>
    )
  }
}
