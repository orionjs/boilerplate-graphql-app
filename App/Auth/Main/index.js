import React from 'react'
import {View, StatusBar, Dimensions} from 'react-native'
import styles from './styles.js'
import Main from './Main'
import Modal from 'react-native-modalbox'
import Password from './Password'
import autobind from 'autobind-decorator'

export default class Auth extends React.Component {
  static propTypes = {}

  state = {}

  getModalStyle() {
    const marginTop = 50
    const height = Dimensions.get('window').height - marginTop
    return {
      height,
      borderTopRightRadius: 30,
      borderTopLeftRadius: 30,
      overflow: 'hidden'
    }
  }

  @autobind
  open(opened) {
    this.setState({opened})
  }

  render() {
    return (
      <View style={styles.container}>
        <StatusBar backgroundColor="#0069ff" barStyle="light-content" />
        <Main open={this.open} />
        <Modal
          backButtonClose
          swipeToClose={false}
          keyboardTopOffset={0}
          style={this.getModalStyle()}
          isOpen={this.state.opened === 'password'}
          onClosed={() => this.setState({opened: null})}
          position="bottom">
          <Password open={this.open} />
        </Modal>
      </View>
    )
  }
}
