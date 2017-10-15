import React, { Component } from 'react';

export default class Box extends Component {

  constructor(props) {
    super(props);
    this.state = {
      boxContent : this.props.boxText,
      className : `box closedBox`
    };
  } 

  openBox(input) {
    let newText = `Oh man is it workin?`;
    this.setState({
      boxContent: newText,
      className: `box openBox`
    });
  }

  render() {
    return (
      <div 
        className={this.state.className}
        onClick={
          this.props.displayType === 'categories' 
            ? this.props.onClick 
            : () => this.openBox(this.props.boxText)
        }
        
      >
        {this.state.boxContent}
      </div>
    );
  }
}