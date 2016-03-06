import React, { Component } from 'react';
import Parse from 'parse';
import './contact.css';

var Example = React.createClass ({

  getInitialState: function() {
    return {
      color: "darkred",
      fontsize: 14
    };
  },

  handleColorChange: function(e) {
    this.setState({
      color: e.target.value
    })
  },

  handleSizeChange: function(e) {
    this.setState({
      fontSize: e.target.value
    })
  },

  render: function() {
    return (
        <div>
        <input> onChange={this.handleColorChange} />
        <input> onChange={this.handleSizeChange} />
        <p
          style={{
            color: this.state.color,
            fontSize: this.state.fontSize
          }}
        >
        This paragraph is {this.state.color} and {this.state.fontSize} px
        </>
        </div>
    )
  }
});
