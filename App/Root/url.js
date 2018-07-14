const urls = {
  local: `http://10.0.1.4:3000`,
  dev: '',
  prod: ''
}

const env = 'local'

export default urls[env]
