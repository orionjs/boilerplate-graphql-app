import React from 'react'
import {View, Modal} from 'react-native'
import styles from './styles.js'
import PropTypes from 'prop-types'
import withUserId from 'App/helpers/auth/withUserId'
import Main from './Main'

@withUserId
export default class Auth extends React.Component {
  static propTypes = {
    children: PropTypes.object,
    userId: PropTypes.string
  }

  render() {
    return (
      <View style={styles.container}>
        {this.props.children}
        <Modal
          animationType={this.props.userId ? 'slide' : 'none'}
          visible={!this.props.userId}
          onRequestClose={() => {}}>
          <Main />
        </Modal>
      </View>
    )
  }
}
