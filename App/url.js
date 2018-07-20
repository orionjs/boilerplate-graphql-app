const urls = {
  local: `http://192.168.0.27:3000`,
  dev: '',
  prod: ''
}

const env = 'local'

export default urls[env]
