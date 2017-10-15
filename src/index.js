import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Box from './box.js';

import trafficSections from './traffic-sections.js';
import './index.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      displaySource: trafficSections,
      displayProperty: 'displayName',
      displayType: 'categories',
      activeBoxes: []
    };
  }

  handleClick(index) {
    if (this.state.displayType === 'categories') {
      return this.categoryBoxClicked(index);
    }

    if (this.state.displayType === 'codeSections') { 
      return this.codeSectionBoxClicked(index);
    }

  }

  codeSectionBoxClicked(index) {
    console.log('codeSectionBox: ', index);

    let newBoxes = this.state.activeBoxes;
    let targetIndex = newBoxes.indexOf(index);

    if (targetIndex === -1) {
      newBoxes.push(index);
    } else { 
      newBoxes.splice(targetIndex, 1);
    }

    this.setState({activeBoxes: newBoxes});
  }

  categoryBoxClicked(index) {
    console.log('categoryBox: ', index);
    let newSource = this.state.displaySource[index].codeSections;

    this.setState({
      displaySource: newSource,
      displayProperty: 'name',
      displayType: 'codeSections',      
    });
  }

  render() {
    const displayBoxes = this.state.displaySource.map((item, index) =>{
      
      return (
        <Box
          key={item[this.state.displayProperty]}
          boxText={item[this.state.displayProperty]}    
          onClick={() => this.handleClick(index)} 
          displayType={this.state.displayType}
        />
      );
    }
    );

    return (
      <ul>{displayBoxes}</ul>
    );
  }
}
 
ReactDOM.render(
  <App/>,
  document.getElementById('root')
);

