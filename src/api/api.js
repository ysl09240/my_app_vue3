/**
 * 整个项目的api管理
 *
 */

import request from './request';

export default {
    getTableData(params) {
        return request({
            url: '/home/getTableData',
            method: 'get',
            data: params,
            mock: true
        });
    },
    getCountData() {
        return request({
            url: '/home/getCountData',
            method: 'get',
            mock: true
        });
    },
    getEchartData() {
        return request({
            url: '/home/getEchartData',
            method: 'get',
            mock: true
        });
    },
    getUser(params) {
        //返回用户数据
        return request({
            url: '/user/getUser',
            method: 'get',
            data:params,
            mock: true
        });
    },
    addUser(params) {
        return request({
            url: '/user/add',
            method: 'post',
            data: params,
            mock: true
        });
    },
    editUser(params) {
        return request({
            url: '/user/edit',
            method: 'post',
            data: params,
            mock: true
        });
    },
    delUser(params) {
        return request({
            url: '/user/del',
            method: 'post',
            data: params,
            mock: true
        });
    },
    getMenu(params) {
        return request({
            url: '/permission/getMenu',
            method: 'post',
            data: params,
            mock: true
        });
    }
}