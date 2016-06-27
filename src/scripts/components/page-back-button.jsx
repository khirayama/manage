import React from 'react';

import { backPage } from '../actions/app-action-creators';


export default function PageBackButton() {
  return <div className="page-back-button" onClick={backPage}>←</div>;
}
