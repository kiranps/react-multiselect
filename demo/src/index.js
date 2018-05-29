import React, {Component} from 'react'
import {render} from 'react-dom'

import Example from '../../src'

const DATA = [
  "one",
  "two",
  "three",
  "four",
  "five",
  "six",
  "seven",
  "eight",
]


class Demo extends Component {
  render() {
    return <div>
      <h1>react-multiselect Demo</h1>
      <Example values={DATA} />
    </div>
  }
}

render(<Demo/>, document.querySelector('#demo'))
