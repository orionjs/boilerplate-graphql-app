import React from 'react'
import Root from './Root'
import App from './App'
import Auth from './Auth'

export default class AppRoot extends React.Component {
  render() {
    return (
      <Root>
        <Auth forceLogin>
          <App />
        </Auth>
      </Root>
    )
  }
}
