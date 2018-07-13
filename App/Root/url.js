const urls = {
  local: `http://192.168.0.16:3000`,
  dev: '',
  prod: ''
}

const env = 'local'

export default urls[env]
