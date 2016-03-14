import React, { Component } from 'react';
import Parse from 'parse';

export default class Example extends Component {

  constructor() {
    super();
    this.render = this.render.bind(this);
    this.state = {
      color: "darkred",
      fontSize: 14
    }
  }

  handleColorChange(e) {
    this.setState({
      color: e.target.value
    })
  }

  handleSizeChange(e) {
    this.setState({
      fontSize: e.target.value
    })
  }

  render(){
    return(
        <div>
        <input onChange={this.handleColorChange.bind(this)} />
        <input onChange={this.handleSizeChange.bind(this)} />
        <p
          style={{
            color: this.state.color,
            fontSize: this.state.fontSize
          }}
        >This paragraph is {this.state.color} and {this.state.fontSize} px
        </p>
        </div>
    )
  }
}
