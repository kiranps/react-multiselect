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
`

const Column = styled.div`
  box-sizing: border-box;
  display: table-cell;
  vertical-align: top;
  width: ${props => props.width}px;
  padding-bottom: 6px;

  &:last-child {
    vertical-align: middle;
    padding-bottom: 0px;
  }

  &:nth-last-child(2) {
    vertical-align: middle;
    padding-bottom: 0px;
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

const List = styled.div`
  position: absolute;
  box-sizing: border-box;
  height: 200px;
  width: inherit;
  letter-spacing: 0;
  box-shadow: 0 1px 5px 0 rgba(0, 0, 0, 0.3);
  background-color: white;
  border-radius: 0 0 1px 1px;
  padding: 6px 0 6px 0;
  z-index: 1;
  margin-top: 1px;
  font-family: sans-serif;
`

const ListItem = styled.div`
  height: 28px;
  box-sizing: border-box;
  cursor: pointer;
  display: table;
  cursor: pointer;
  color: #6d6d6d;
  padding: 0 0 0 5px;
  width: 100%;
  font-size: 15px;
  line-height: 28px;

  > div {
    display: inline-block;
  }

  &:hover {
    background-color: #E9EFF3;
  }
`

const ListItemLabel = styled.div`
  display: "inline-block",
  verticalAlign: "top",
  boxSizing: "border-box",
`

List.Item = ListItem
List.Item.Label = ListItemLabel

InputBox.Column = Column

export {
  MultiSelectContainer,
  HiddenInput,
  TextInput,
  InputBox,
  List
}
