import React, { Component } from 'react'

export default class Botones extends Component {
  render() {
    return (
      <div>
        <button onClick={() => window.alert(this.props.alerts.m1)}>Módulo 1</button>
        <button onClick={() => window.alert(this.props.alerts.m2)}>Módulo 2</button>
      </div>
    )
  }
}
