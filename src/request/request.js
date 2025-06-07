//不用在vue原型链挂载axios然后通过this那种方式了 
//在哪里使用就import 调用request传参 request(...).then(res=>{})
import axios from 'axios'
//config={url:'',method:'post',params:{id:10}}
export default function request(config) {
    const instance = axios.create({
        baseURL: 'http://39.96.60.78:1234'
    })
    return instance(config)
    // return new Promise(resolve=>{instance(config).then(resolve(res.data))})
}