import React from 'react';

import { backPage } from '../actions/app-action-creators';


export default function PageBackButton(props) {
  return <div className="page-back-button" onClick={backPage}>{(props.text) ? props.text : "←"}</div>;
}
