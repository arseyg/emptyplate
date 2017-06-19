import React, { Component } from 'react';
import { render } from 'react-dom'

import App from './containers/App'

render(
    <App/>,
  	document.getElementById('root')
)

// Hot Module Replacement API
if (module.hot) {
  module.hot.accept('./containers/App', () => {
    const NextApp = require('./containers/App').default;
    render(
      <NextApp/>,
      document.getElementById('root')
    );
  });
}