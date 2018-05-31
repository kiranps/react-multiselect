import expect from 'expect'
import React from 'react'
import {render, unmountComponentAtNode} from 'react-dom'

import MultiSelect from 'src/'

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

describe('MultiSelect', () => {
  let node

  beforeEach(() => {
    node = document.createElement('div')
  })

  afterEach(() => {
    unmountComponentAtNode(node)
  })

  it('displays a welcome message', () => {
    render(<MultiSelect values={DATA}/>, node, () => {
      console.log(node);
      expect(node.innerHTML).toContain('Welcome to React components')
    })
  })
})
