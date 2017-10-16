import React, { Component } from 'react';
import 'whatwg-fetch';
export default class Box extends Component {

  constructor(props) {
    super(props);
    this.state = {
      boxContent : this.props.boxText,
      className : `box closedBox`,
      
    };
  } 

  getText(lawObj) {
    var lawNumber = lawObj.match(/\[.*?\]/)[0].replace(/\[|\]/g, ``); //pulls Code Section Number from brackets in description
    var lawUrl = `https://law.lis.virginia.gov/LawPortalWebService/json/CodeofVAGetSectionDetails/` + lawNumber;  //website for that Code Section
  
    fetch(lawUrl)
        .then(function(response) {
          console.log('responded', response);
        }).catch(function(ex) {
          console.log('it broke', ex);
        });
  }

  codeSectionClicked(input) {
    if ( this.state.className.indexOf('closedBox') !== -1 
        && this.state.className.indexOf('openBox') === -1) {
      /**
       * A 2 stage conditional is used to prevent errors from someone clicking
       * the box twice while waiting for the ajax to return
       */
      let classNameBuffer = this.state.className;
      
      classNameBuffer += ' openBox';
      this.setState({className : classNameBuffer});
      this.appendLoader(this.props.id);
      this.getText(this.props.boxText);
    }

  }

  appendLoader(id) {
    let loader = document.createElement('i');
    loader.className = 'fa fa-spinner fa-spin fa-lg fa-fw';
    document.getElementById(id).appendChild(loader);
  }

  render() {
    return (
      <div 
        className={this.state.className}
        id={this.props.id}
        onClick={
          this.props.displayType === 'codeSections' 
            ? () => this.codeSectionClicked()
            : this.props.onClick 
        }
      >
        {this.state.boxContent}
      </div>
    );
  }
}