const urls = {
  local: `http://192.168.1.101:3000`,
  dev: '',
  prod: ''
}

const env = 'local'

export default urls[env]
