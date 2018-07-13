import React from 'react'
import {View} from 'react-native'
import styles from './styles.js'
import PropTypes from 'prop-types'
import withUserId from 'App/helpers/auth/withUserId'
import Modal from 'react-native-modalbox'
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
          swipeToClose={false}
          startOpen={!this.props.userId}
          isOpen={!this.props.userId}
          position="bottom">
          <Main />
        </Modal>
      </View>
    )
  }
}
