import request from '@/plugins/request';

export function adviceList (data) {
    return request({
        url: '/advice/list',
        method: 'get',
        params: data
    });
}

export function adviceAdd (data) {
    return request({
        url: '/advice/add',
        method: 'post',
        data: data
    });
}

export function adviceDelete (data) {
    return request({
        url: '/advice/delete',
        method: 'get',
        params: data
    });
}

export function adviceUpdate (data) {
    return request({
        url: '/advice/update',
        method: 'post',
        data: data
    });
}

