import React, { Component } from 'react';

import { backPage } from '../actions/app-action-creators';


export default class PageBackButton extends Component {
  render() {
    return <div className="page-back-button" onClick={ backPage }>←</div>;
  }
}
