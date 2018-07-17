import React from 'react'
import Home from './Home'
import {createBottomTabNavigator} from 'react-navigation'
import {Ionicons} from '@expo/vector-icons'
import More from './More'

export default createBottomTabNavigator(
  {
    Home: Home,
    More: More
  },
  {
    initialRouteName: 'Home',
    navigationOptions: ({navigation}) => ({
      // eslint-disable-next-line
      tabBarIcon: ({focused, tintColor}) => {
        const {routeName} = navigation.state
        let iconName
        if (routeName === 'Home') {
          iconName = `ios-home${focused ? '' : '-outline'}`
        } else if (routeName === 'More') {
          iconName = `ios-person${focused ? '' : '-outline'}`
        }
        return <Ionicons name={iconName} size={28} color={tintColor} />
      }
    }),
    tabBarOptions: {
      activeTintColor: '#0069ff',
      inactiveTintColor: 'gray',
      style: {
        backgroundColor: '#fff'
      }
    }
  }
)
