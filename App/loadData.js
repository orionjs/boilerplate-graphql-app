import {Asset} from 'expo'

export default async function() {
  const images = [require('App/assets/background.jpg'), require('App/assets/logo.png')]

  const cacheImages = images.map(image => {
    return Asset.fromModule(image).downloadAsync()
  })
  return Promise.all(cacheImages)
}
