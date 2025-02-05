import axios from 'axios'
import config from '../config'
import {ElMessage} from 'element-plus'

const NETWORK_ERROR = '网络异常,请稍后再试...';

//创建axios 实例对象

const service = axios.create({
    baseURL: config.baseApi
});

//在请求之前

service.interceptors.request.use((req) =>{
    //可以自定议header
    //jwt-token认证在这里处理
    return req;
});

service.interceptors.response.use((res)=>{
    const {code,data,msg} = res.data;
    if(code == 200){
        return data;
    }else {
        //网络请求错误
        ElMessage.error(msg || NETWORK_ERROR);
        return Promise.reject(msg || NETWORK_ERROR);
    }

});

function request(options){
    options.method  = options.method || 'get';
    if(options.method.toLowerCase() == 'get'){
        options.params = options.data;
    }

    //对mock处理
    let isMock = config.mock ;
    if(typeof options.mock !== 'undefined'){
        isMock = options.mock;
    } 
    //对线上环境做处理
    if(config.env == 'prod'){
        service.defaults.baseURL = config.baseApi;
    }else {
        service.defaults.baseURL = isMock ? config.mockApi : config.baseApi;
    }
    return service(options);
}

export default request;