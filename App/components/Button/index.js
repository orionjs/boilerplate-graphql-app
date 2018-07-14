import React from 'react'
import {View, TouchableWithoutFeedback, Text, Animated, ActivityIndicator} from 'react-native'
import styles from './styles.js'
import PropTypes from 'prop-types'
import autobind from 'autobind-decorator'

export default class AppButton extends React.Component {
  static propTypes = {
    title: PropTypes.string,
    backgroundColor: PropTypes.string,
    textColor: PropTypes.string,
    onPress: PropTypes.func,
    disabled: PropTypes.bool,
    loading: PropTypes.bool,
    containerStyle: PropTypes.any,
    buttonStyle: PropTypes.any,
    textStyle: PropTypes.any
  }

  static defaultProps = {
    backgroundColor: '#0069ff',
    textColor: '#ffffff',
    containerStyle: {},
    buttonStyle: {},
    textStyle: {}
  }

  state = {}

  constructor(props) {
    super(props)
    this.shadowRadius = new Animated.Value(10)
    this.shadowOpacity = new Animated.Value(this.props.loading || this.props.disabled ? 0 : 0.2)
    this.marginTop = new Animated.Value(10)
    this.marginBottom = new Animated.Value(10)
  }

  componentDidUpdate(prevProps, prevState) {
    const duration = 50
    const offset = 2
    if (prevState.active !== this.state.active) {
      Animated.timing(this.shadowRadius, {toValue: this.state.active ? 4 : 6, duration}).start()
      Animated.timing(this.marginTop, {
        toValue: this.state.active ? 10 + offset : 10,
        duration
      }).start()
      Animated.timing(this.marginBottom, {
        toValue: this.state.active ? 10 - offset : 10,
        duration
      }).start()
    }
    if (this.props.loading !== prevProps.loading || this.props.disabled !== prevProps.disabled) {
      Animated.timing(this.shadowOpacity, {
        toValue: this.props.loading || this.props.disabled ? 0 : 0.2,
        duration: 100
      }).start()
    }
  }

  @autobind
  onPressIn() {
    if (this.props.loading || this.props.disabled) return
    this.setState({active: true})
  }

  @autobind
  onPressOut() {
    if (this.props.loading || this.props.disabled) return
    this.setState({active: false})
  }

  @autobind
  onPress() {
    if (this.props.loading || this.props.disabled) return
    this.props.onPress()
  }

  getContainerStyles() {
    const backgroundColor =
      this.props.loading || this.props.disabled ? '#eeeeee' : this.props.backgroundColor
    return [
      {
        backgroundColor,
        borderRadius: 4,
        overflow: 'hidden',
        height: 50
      },
      this.props.buttonStyle
    ]
  }

  getShadowStyles() {
    const shadowOpacity = this.shadowOpacity
    return [
      {
        shadowColor: '#000',
        shadowOpacity,
        borderRadius: 4,
        marginTop: this.marginTop,
        marginBottom: this.marginBottom,
        shadowRadius: this.shadowRadius
      },
      this.props.containerStyle
    ]
  }

  getTextStyles() {
    const color = this.props.disabled ? '#ddd' : this.props.textColor
    return [
      {
        textAlign: 'center',
        padding: 14,
        fontSize: 18,
        color,
        fontWeight: '600'
      },
      this.props.textStyle
    ]
  }

  renderLoading() {
    if (!this.props.loading) return
    const style = {
      padding: 15,
      height: 50
    }
    return (
      <View style={style}>
        <ActivityIndicator />
      </View>
    )
  }

  renderText() {
    if (this.props.loading) return
    const textStyles = this.getTextStyles()
    return <Text style={textStyles}>{this.props.title}</Text>
  }

  render() {
    const shadowStyles = this.getShadowStyles()
    const containerStyles = this.getContainerStyles()
    return (
      <TouchableWithoutFeedback
        onPressIn={this.onPressIn}
        onPressOut={this.onPressOut}
        onPress={this.onPress}
        style={styles.touchable}>
        <Animated.View style={shadowStyles}>
          <View style={containerStyles}>
            {this.renderText()}
            {this.renderLoading()}
          </View>
        </Animated.View>
      </TouchableWithoutFeedback>
    )
  }
}
