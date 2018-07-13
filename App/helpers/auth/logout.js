import gql from 'graphql-tag'
import setSession from './setSession'

const logout = async function() {
  await global.apolloClient.mutate({
    mutation: gql`
      mutation logout {
        logout
      }
    `
  })
  await setSession(null)
}

global.logout = logout

export default logout
