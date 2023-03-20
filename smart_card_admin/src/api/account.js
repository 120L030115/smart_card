import request from '@/plugins/request';

export function accountLogin (data) {
    return request({
        url: '/account/login',
        method: 'post',
        data
    });
}

export function accountList (data) {
    return request({
        url: '/account/list',
        method: 'get',
        params: data
    });
}

export function accountGet () {
    return request({
        url: '/account/get'
    });
}

export function accountAdd (data) {
    return request({
        url: '/account/add',
        method: 'post',
        data: data
    });
}

export function accountDelete (data) {
    return request({
        url: '/account/delete',
        method: 'get',
        params: data
    });
}

export function accountUpdate (data) {
    return request({
        url: '/account/update',
        method: 'post',
        data: data
    });
}

