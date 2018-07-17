import React from 'react'
import {View, Text} from 'react-native'
import styles from './styles.js'
import {Form, Field} from 'simple-react-form'
import TextInput from '../../TextInput'
import autobind from 'autobind-decorator'
import PropTypes from 'prop-types'
import Button from 'App/components/Button'
import withMutation from 'react-apollo-decorators/lib/withMutation'
import gql from 'graphql-tag'

@withMutation(gql`
  mutation createUser($email: String, $password: String, $profile: UserProfileInput) {
    createUser(email: $email, password: $password, profile: $profile) {
      _id
      publicKey
      secretKey
      userId
      locale
      roles
      emailVerified
    }
  }
`)
export default class Register extends React.Component {
  static propTypes = {
    createUser: PropTypes.func,
    open: PropTypes.func
  }

  state = {}

  @autobind
  focusPassword() {
    this.refs.password.refs.input.focus()
  }

  @autobind
  focusConfirm() {
    this.refs.confirm.refs.input.focus()
  }

  isFormReady() {
    return this.state.email && this.state.password && this.state.confirm
  }

  @autobind
  async submit() {
    this.setState({loading: true, errorMessage: null})
    try {
      const {email, password, confirm} = this.state
      if (password !== confirm) {
        throw new Error("Passwords doesn't match")
      }
      await this.props.createUser({email, password})
    } catch (error) {
      const errorMessage = error.message.replace('GraphQL error: ', '')
      this.setState({errorMessage})
      console.log('Error:', error)
      this.setState({loading: false})
    }
  }

  renderErrorMessage() {
    if (!this.state.errorMessage) return
    return <Text style={styles.errorMessage}>{this.state.errorMessage}</Text>
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Register</Text>
        <Form state={this.state} onChange={changes => this.setState(changes)}>
          <View>
            <Field
              enablesReturnKeyAutomatically
              returnKeyType="next"
              keyboardType="email-address"
              fieldName="email"
              label="Email"
              onSubmitEditing={this.focusPassword}
              type={TextInput}
            />
            <Field
              enablesReturnKeyAutomatically
              ref="password"
              secureTextEntry
              fieldName="password"
              label="Password"
              returnKeyType="next"
              onSubmitEditing={this.focusConfirm}
              type={TextInput}
            />
            <Field
              enablesReturnKeyAutomatically
              ref="confirm"
              secureTextEntry
              fieldName="confirm"
              label="Confirm password"
              returnKeyType="done"
              onSubmitEditing={this.submit}
              type={TextInput}
            />
          </View>
        </Form>
        {this.renderErrorMessage()}
        <Button
          disabled={!this.isFormReady()}
          loading={this.state.loading}
          onPress={this.submit}
          title="Create account"
        />
      </View>
    )
  }
}
