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
  TextInput
} from './Helper'

const pxToNum = x => Number(x.replace("px", ""))

const styles = {
  box: {
    padding: "0 0 5px 0",
    borderRadius: "2px",
    border: "solid 1px rgba(157, 180, 207, 0.7)",
    backgroundColor: "#fff",
    boxSizing: "border-box"
  },
  input: {
    border: 'none',
    boxSizing: "border-box",
    outline: 'none',
    margin: '5px 0 0 5px',
    width: '36px',
  },
  hiddenInput: {
    position: "absolute",
    boxSizing: "border-box",
    visibility: "hidden",
    height: "auto",
    width: "auto",
    whiteSpace: "nowrap"
  },
  dropdown: {
    position: "absolute",
    boxSizing: "border-box",
    height: "200px",
    width: "inherit",
    letterSpacing: "0",
    boxShadow: "0 1px 5px 0 rgba(0, 0, 0, 0.3)",
    backgroundColor: "white",
    borderRadius: "0 0 1px 1px",
    padding: "6px 0 6px 0",
    zIndex: "1",
    marginTop: "1px",
    fontFamily: "sans-serif"
  },
  chip: {
    display: "inline-block",
    boxSizing: "border-box",
    height: "20px",
    padding: "0px 2px 0 3px",
    margin: "5px 0 0 5px",
    borderRadius: "2px",
    backgroundColor: "#f3f3f3",
    userSelect: "none",
    border: "1px solid #e8e8e8"
  },
  chipLabel: {
    display: "inline-block",
    verticalAlign: "top",
    padding: "1px 2px 0 0",
    color: "#797979",
    fontFamily: "sans-serif",
    fontSize: "13px"
  },
  chipClose: {
    display: "inline-block",
    verticalAlign: "top",
    color: "#adadad",
    paddingTop: "3px",
    cursor: "pointer",
    ":hover": {
      color: "#7d7d7d"
    }
  },
  list: {
    height: "28px",
    boxSizing: "border-box",
    cursor: "pointer",
    display: "table",
    cursor: "pointer",
    color: "#6d6d6d",
    padding: "0 0 0 5px",
    width: "100%",
    fontSize: "15px",
    lineHeight: "28px",
  },
  listHover: {
    backgroundColor: "#E9EFF3"
  },
  listLabel: {
    display: "inline-block",
    verticalAlign: "top",
    boxSizing: "border-box",
  },
  listTick: {
    display: "inline-block",
    verticalAlign: "top",
    padding: "6px 6px 0 0",
    float: "right",
    color: "#adadad",
  }
};

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
    this.handleMouseOver = this.handleMouseOver.bind(this)
    this.handleMouseOut = this.handleMouseOut.bind(this)
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

  handleMouseOver(hoveredListIndex) {
    this.setState({hoveredListIndex})
  }

  handleMouseOut() {
    this.setState({hoveredListIndex: null})
  } 

  render() {
    const {width, height, values} = this.props;
    const {isOpen, currentText, activeValues, value, hoveredListIndex} = this.state;
    const filteredValues = values.filter(v => v.includes(currentText) || currentText === '')
    const inputWidth = 10 + this.inputWidth + "px"
    console.log(this.inputWidth)

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
            <div style={{...styles.dropdown, width}}>
              <Scrollbars autoHide autoHideTimeout={300}>
                {
                  filteredValues.map((x, i) =>
                    <div
                      data-type="value"
                      style={Object.assign({},styles.list, hoveredListIndex === i && styles.listHover)}
                      onMouseOver={() => this.handleMouseOver(i)}
                      onMouseOut={() => this.handleMouseOut(i)}
                      onClick={(e) => this.addToSelection(x, e)}
                      key={i}>
                      <div style={styles.listLabel}>{x}</div>
                      {
                        activeValues.includes(x) && 
                          <Tick
                            height="16"
                            width="16"
                            color={styles.listTick.color}
                            style={styles.listTick}
                          />
                      }
                    </div>
                  )
                }
              </Scrollbars>
            </div>
        }
      </MultiSelectContainer>
    )
  }
}

