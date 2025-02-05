/**
 * 环境配置文件
 * 三个环境:
 * 开发
 * 测试
 * 生产
 */

const env = import.meta.env.MODE || 'prod'

const EnvConfig = {
    development: {
        baseApi: '/api',
        mockApi: '/api'
    },
    test: {
        baseApi: '/test.future.com/api',
        mockApi: ''
    },
    prod: {
        baseApi: '/future.com/api',
        mockApi: ''
    }

}

export default {
    env,
    mock: true,
    ...EnvConfig[env]
}