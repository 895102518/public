import axios from 'axios'
import { MessageBox, Message } from 'element-ui'
import store from '@/store'
import { getToken } from '@/utils/auth'

// 创建axios实例
const service = axios.create({
  //本地接口跨域    后台解决后取消注释
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 5000 // request timeout
})

// 创建axios实例
service.interceptors.request.use(
  config => {
    config.headers.post['Content-Type'] = 'multipart/form-data'
    // if (config.params) {
    //   config.params['login_token'] = getToken()
    // } else {
    //   config['params'] = { login_token: getToken() }
    // }
    // if(config.method == 'post'){
    //   // post的时候 formData格式提交
    //   let from_data = new FormData()
    //   let post_data = config.data
    //   for(let item in post_data){
    //     from_data.append(item, post_data[item])
    //   }
    //   config.data = from_data
    // }

    let url = '/login'
    if (config.url == url) {
      delete config.params
    }
    // do something before request is sent
    // if (store.getters.token) {
    //   config.headers['X-Token'] = getToken()
    // }
    return config
  },
  error => {
    // do something with request error
    console.log(error,"mmmmm") // for debug
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  response => {
    const res = response.data
    if (res.ret != 0) {
      if (res.ret == -1) {
        Message({
          message: '请填写完整',
          type: 'warning',
          duration: 3 * 1000
        })
      }
      //  else {
      //   Message({
      //     message: '未知错误,请联系管理员',
      //     type: 'error',
      //     duration: 3 * 1000
      //   })
      // }
      return res
      // return Promise.reject('error')
    }
    return res
  },
  error => {
    console.log('err' + error) // for debug
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

export default service
