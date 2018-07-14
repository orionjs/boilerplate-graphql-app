import React from 'react'
import {Text, View} from 'react-native'
import styles from './styles'
import withGraphQL from 'react-apollo-decorators/lib/withGraphQL'
import gql from 'graphql-tag'
import forceLogin from 'App/helpers/auth/forceLogin'
import logout from 'App/helpers/auth/logout'
import PropTypes from 'prop-types'
import LightButton from 'App/components/LightButton'

@forceLogin
@withGraphQL(gql`
  query getMe {
    me {
      _id
      email
    }
  }
`)
export default class App extends React.Component {
  static propTypes = {
    me: PropTypes.object
  }

  render() {
    if (!this.props.me) return null
    return (
      <View style={styles.container}>
        <Text style={styles.text}>{this.props.me.email}, Welcome to Orionjs app</Text>
        <LightButton onPress={() => logout()} title="Logout" />
      </View>
    )
  }
}
