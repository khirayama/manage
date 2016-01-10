import React, { Component } from 'react';

import { pages } from '../constants/constants';
import { changePage, backPage } from '../actions/app-action-creators';
import Header from './header';


export default class Launcher extends Component {
  render() {
    return (
      <div>Launcher</div>
    );
  }
}

Launcher.propTypes = {
};
