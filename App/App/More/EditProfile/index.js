import React from 'react'
import {View, ScrollView} from 'react-native'
import styles from './styles.js'
import headerStyle from 'App/styles/headerStyle'
import {Form, Field} from 'simple-react-form'
import TableTextInput from 'App/components/fields/TableTextInput'
import TableButton from 'App/components/TableButton'
import withMutation from 'react-apollo-decorators/lib/withMutation'
import gql from 'graphql-tag'
import withGraphQL from 'react-apollo-decorators/lib/withGraphQL'
import PropTypes from 'prop-types'
import autobind from 'autobind-decorator'

const fragment = gql`
  fragment editProfile on User {
    _id
    name
    profile {
      firstName
      lastName
    }
  }
`

@withGraphQL(gql`
  query getMyProfile {
    me {
      ...editProfile
    }
  }
  ${fragment}
`)
@withMutation(gql`
  mutation setUserProfile($userId: ID, $profile: UserProfileInput) {
    setUserProfile(userId: $userId, profile: $profile) {
      ...editProfile
    }
  }
  ${fragment}
`)
class Profile extends React.Component {
  static propTypes = {
    setUserProfile: PropTypes.func,
    me: PropTypes.object,
    navigation: PropTypes.object,
    investmentRanges: PropTypes.array,
    genders: PropTypes.array,
    userTypes: PropTypes.array
  }

  state = {}

  @autobind
  async save(profile) {
    this.setState({loading: true, errorMessages: null})
    try {
      await this.props.setUserProfile({
        userId: this.props.me._id,
        profile
      })
      this.props.navigation.goBack()
    } catch (error) {
      // setGraphQLErrors(this, error)
    }
    this.setState({loading: false})
  }

  render() {
    return (
      <ScrollView style={styles.container}>
        <Form
          state={this.props.me.profile}
          errorMessages={this.state.errorMessages}
          onSubmit={this.save}
          ref="form">
          <View>
            <Field bottom fieldName="firstName" label="Nombre" type={TableTextInput} />
            <Field bottom fieldName="lastName" label="Apellido" type={TableTextInput} />
            <View style={styles.separation} />
            <TableButton
              loading={this.state.loading}
              onPress={() => this.refs.form.submit()}
              title="Guardar perfil"
            />
          </View>
        </Form>
      </ScrollView>
    )
  }
}

Profile.navigationOptions = {
  title: 'Editar perfil',
  headerStyle
}

export default Profile
