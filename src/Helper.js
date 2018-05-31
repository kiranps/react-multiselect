import React from "react";
import styled from 'styled-components';
import Close from './Close'
import Tick from './Tick'
import Arrow from './Arrow'

const MultiSelectContainer = styled.div`
  box-sizing: border-box

  > div {
    box-sizing: border-box
    width: ${props => props.width};
  }
`

const InputBox = styled.div`
  border-radius: 2px;
  border: solid 1px rgba(157, 180, 207, 0.7);
  background-color: #fff;
  box-sizing: border-box
  padding-bottom: 6px;
`

const Column = styled.div`
  box-sizing: border-box;
  display: table-cell;
  vertical-align: top;
  width: ${props => props.width}px;

  &:last-child {
    vertical-align: middle;
  }
`

const HiddenInput = styled.div`
  position: absolute;
  box-sizing: border-box;
  visibility: hidden;
  height: auto;
  width: auto;
  vertical-align: top;
  white-space: nowrap;
`

const TextInput = styled.input`
  vertical-align: top;
  border: 1px solid transparent;
  box-sizing: border-box;
  outline: none;
  height: 21px;
  padding: 0;
  margin: 5px 0 0 5px;
  width: ${props => props.width};
`

TextInput.defaultProps = {
  width: "36px"
}

const DropDownList = styled.div`
`

const DropDownListItem = styled.div`
`

DropDownList.Item = DropDownListItem
InputBox.Column = Column

export {
  MultiSelectContainer,
  HiddenInput,
  TextInput,
  InputBox,
}
