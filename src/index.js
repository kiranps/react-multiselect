import React, {Component, Children} from 'react';
import {Scrollbars} from 'react-custom-scrollbars';
import Tag from './Tag'
import Tick from './Tick'
import Close from './Close'
import Arrow from './Arrow'
import {
  MultiSelectContainer,
  InputBox,
  HiddenInput,
  TextInput,
  List
} from './Helper'

const pxToNum = x => Number(x.replace("px", ""))

export default class extends Component {
  constructor(props) {
    super(props);
    const {activeValues} = this.props;
    this.state = {isOpen: false, currentText: '', activeValues, hoveredListIndex: null};
    this.inputWidth = 5;
    this.input = React.createRef();
    this.textInput = React.createRef();
    this.hide = this.hide.bind(this)
    this.addToSelection = this.addToSelection.bind(this)
    this.removeFromSelection = this.removeFromSelection.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleClick = this.handleClick.bind(this)
    this.handleFocus = this.handleFocus.bind(this)
    this.keyDown = this.keyDown.bind(this)
    this.focusTextBox = this.focusTextBox.bind(this)
  }

  static defaultProps = {
    width: '280px',
    height: '33px',
    radius: '2px',
    placeholder: 'select',
    listHeight: '200px',
    activeValues: [],
    onChange: (v) => console.log(v)
  }

  componentDidUpdate() {
    this.inputWidth = this.input.current.offsetWidth
  }

  handleFocus() {
    this.setState({isOpen: true});
    document.addEventListener('click', this.hide);
  }

  handleClick(e) {
    const {currentText} = this.state;
    this.setState({isOpen: true});
  }

  handleChange(e) {
    this.setState({currentText: e.target.value, isOpen: true});
  }

  keyDown(e) {
    if(e.keyCode === 8 && this.state.currentText === "") {
      this.setState({activeValues: this.state.activeValues.slice(0, -1)});
    }
  }

  hide(e) {
    const {type} = e.target.dataset;
    if(type !== 'value') {
      this.setState({isOpen: false});
      document.removeEventListener('click', this.hide);
    }
  }

  focusTextBox(e) { 
    this.textInput.current.focus()
  }

  addToSelection(value, e) {
    const {activeValues} = this.state;
    const tmpActiveValues = new Set(activeValues);
    if (tmpActiveValues.has(value)) {
      tmpActiveValues.delete(value);
    } else {
      tmpActiveValues.add(value);
    }
    const newActiveValues = Array.from(tmpActiveValues);
    this.props.onChange(newActiveValues)
    this.setState({activeValues: newActiveValues, currentText: ''});
  };

  removeFromSelection(e, value) {
    e.stopPropagation()
    const {activeValues} = this.state;
    const tmpActiveValues = new Set(activeValues);
    tmpActiveValues.delete(value);
    const newActiveValues = Array.from(tmpActiveValues);
    this.props.onChange(newActiveValues)
    this.setState({activeValues: newActiveValues, currentText: ''});
  }

  render() {
    const {width, height, values} = this.props;
    const {isOpen, currentText, activeValues, value, hoveredListIndex} = this.state;
    const filteredValues = values.filter(v => v.includes(currentText) || currentText === '')
    const inputWidth = 10 + this.inputWidth + "px"

    return (
      <MultiSelectContainer width={width} onClick={this.focusTextBox}>
        <InputBox height={height}>
          <InputBox.Column width={pxToNum(width)-27}>
            { activeValues.map((v, i) => <Tag key={i} label={v} onClose={this.removeFromSelection}/>) }
            <HiddenInput innerRef={this.input}>{currentText}</HiddenInput>
            <TextInput
              width={inputWidth}
              onFocus={this.handleFocus}
              value={currentText}
              onChange={this.handleChange}
              onKeyDown={this.keyDown}
              placeholder=""
              innerRef={this.textInput}
            />
          </InputBox.Column>
          <InputBox.Column width={25}>
            <Arrow isOpen={isOpen}/>
          </InputBox.Column>
        </InputBox>
        {
          isOpen && filteredValues.length > 0 &&
            <List width={width}>
              <Scrollbars autoHide autoHideTimeout={300}>
                {
                  filteredValues.map((x, i) =>
                    <List.Item
                      data-type="value"
                      onClick={(e) => this.addToSelection(x, e)}
                      key={i}>
                      <List.Item.Label>{x}</List.Item.Label>
                      {
                        activeValues.includes(x) && 
                          <Tick height="16" width="16"/>
                      }
                    </List.Item>
                  )
                }
              </Scrollbars>
            </List>
        }
      </MultiSelectContainer>
    )
  }
}
