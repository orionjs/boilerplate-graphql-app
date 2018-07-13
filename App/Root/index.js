import React from 'react'
import PropTypes from 'prop-types'
import {ApolloProvider} from 'react-apollo'
import {client, recoverSession} from './client'
import './decorators'

export default class Root extends React.Component {
  static propTypes = {
    children: PropTypes.node
  }

  state = {loaded: false}

  componentDidMount() {
    this.load()
  }

  async load() {
    if (this.state.loaded) return
    await recoverSession()
    this.setState({loaded: true})
  }

  renderLoading() {
    return null
  }

  render() {
    if (!this.state.loaded) return this.renderLoading()
    return <ApolloProvider client={client}>{this.props.children}</ApolloProvider>
  }
}
