import React from 'react';

import { backPage } from '../actions/app-action-creators';


const PageBackButtonPropTypes = {
  icon: React.PropTypes.bool,
  text: React.PropTypes.string,
};

export default function PageBackButton(props) {
  let contentElement = <i className="icon">arrow_back</i>;
  if (props.icon && props.text) {
    contentElement = <i className="icon">{ props.text }</i>;
  } else if (props.text) {
    contentElement = props.text;
  }
  return (
    <div
      className="page-back-button"
      onClick={backPage}
    >
      { contentElement }
    </div>
  );
}

PageBackButton.propTypes = PageBackButtonPropTypes;
