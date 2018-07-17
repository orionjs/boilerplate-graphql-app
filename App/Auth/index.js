import React from 'react'
import PropTypes from 'prop-types'
import Main from './Main'
import {client, getSession} from 'App/Root/client'
import autobind from 'autobind-decorator'
import SessionContext from 'App/helpers/auth/SessionContext'

export default class Auth extends React.Component {
  static propTypes = {
    app: PropTypes.any
  }

  constructor(props) {
    super(props)
    const session = getSession() || {}
    this.state = {session}
    this.initialUserId = session.userId
  }

  componentDidMount() {
    client.onResetStore(this.onResetStore)
  }

  @autobind
  onResetStore() {
    try {
      const session = getSession() || {}
      this.setState({session})
    } catch (e) {}
  }

  renderChildren() {
    if (!this.state.session.userId) return
    const App = this.props.app
    return <App key={this.state.session.publicKey || 'loggedout'} />
  }

  renderLogin() {
    if (this.state.session.userId) return
    return <Main />
  }

  render() {
    return (
      <SessionContext.Provider value={this.state.session}>
        {this.renderChildren()}
        {this.renderLogin()}
      </SessionContext.Provider>
    )
  }
}
