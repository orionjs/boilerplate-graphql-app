import React from 'react'
import {Text, View} from 'react-native'
import styles from './styles'
import withGraphQL from 'react-apollo-decorators/lib/withGraphQL'
import gql from 'graphql-tag'
import forceLogin from 'App/helpers/auth/forceLogin'

@forceLogin
@withGraphQL(gql`
  query {
    organizations {
      items {
        name
      }
    }
  }
`)
export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Welcome to Orionjs app</Text>
      </View>
    )
  }
}
