import {createClient} from '@orion-js/graphql-client'
import url from './url'
import {AsyncStorage} from 'react-native'

let session = null

export const recoverSession = async () => {
  try {
    const json = await AsyncStorage.getItem('@orionjsapp:session')
    session = JSON.parse(json)
  } catch (e) {
    session = null
  }
}

export const getSession = () => {
  return session
}

export const client = createClient({
  endpointURL: url,
  useSubscriptions: false,
  async saveSession(newSession) {
    session = newSession
    await AsyncStorage.setItem('@orionjsapp:session', JSON.stringify(session, null, 2))
  },
  getSession
})
