import React, { Component } from 'react'
import Particles from 'react-particles-js'
import Submit from './Submit'

export default class App extends Component {

  constructor(props) {
    super(props)
    this.state = {}
  }

  onInputChange = (e) => { 
    const name = e.currentTarget.name
    const value = e.currentTarget.value

    this.setState({ [name]: value })
  }

  render() {
    return (
      <div className="container">
        <div className="particles">
          <Particles params={{ "particles": { "number": { "value": 120 }, "size": { "value": 1 } } }} />
        </div>
        <div className="form">
          <h2>The center app `demo`</h2>
          <form onSubmit={this.onSubmit} >
            <div className="input">
              <label>city: </label>
              <input type="text" name="city" onChange={this.onInputChange} />
            </div> 
            <br />
            <div className="input">
              <label>latitude: </label>
              <input type="number" name="latitude" step="0.0001" onChange={this.onInputChange} />
            </div> 
            <br />
            <div className="input">
              <label>longitude: </label>
              <input type="number" name="longitude" step="0.0001" onChange={this.onInputChange} />
            </div> 
            <br />
            <div className="input auto">
              <label>time: </label>
              <input type="date" name="date" onChange={this.onInputChange} />
              <input type="time" name="time" onChange={this.onInputChange} />
            </div> 
            <br />
            <div className="input chill">
              <label>range - in KM -: </label>
              <input type="number" name="range" min="0" step="0.1" onChange={this.onInputChange} />
            </div> 
            <br />
            <div className="input">
              <label>strength: </label>
              <input type="number" name="strength" min="0" step="0.1" onChange={this.onInputChange} />
            </div> 
            <br />
            <div className="input textarea">
              <label>description: </label>
              <textarea name="description" onChange={this.onInputChange}></textarea>
            </div> 
            <br />
            <Submit infos={this.state} />
          </form>
        </div>
      </div>
    )
  }
}
