import React from "react";
import styled from 'styled-components';
import Close from './Close'

const TagBox = styled.div`
  display: inline-block;
  vertical-align: top;
  box-sizing: border-box;
  height: 20px;
  padding: 0px 2px 0 3px;
  margin: 6px 0 0 5px;
  border-radius: 2px;
  background-color: #f3f3f3;
  user-select: none;
  border: 1px solid #e8e8e8;
`

const TagLabel = styled.div`
  display: inline-block;
  vertical-align: top;
  box-sizing: border-box;
  padding: 2px 2px 0 0;
  color: #797979;
  font-family: sans-serif;
  font-size: 13px;
`

const TagClose = styled.div`
  display: inline-block;
  box-sizing: border-box;
  vertical-align: top;
  color: #adadad;
  padding-top: 4px;
  cursor: pointer;
`

const Tag = ({label, onClose}) => 
  <TagBox>
    <TagLabel>{label}</TagLabel>
    <TagClose onClick={e => onClose(e, label)}>
      <Close size="12"/>
    </TagClose>
  </TagBox>

export default Tag; 
