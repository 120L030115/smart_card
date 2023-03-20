import request from '@/plugins/request';

export function company_infoList (data) {
    return request({
        url: '/company_info/list',
        method: 'get',
        params: data
    });
}

export function company_infoGet () {
    return request({
        url: '/company_info/get'
    });
}

export function company_infoAdd (data) {
    return request({
        url: '/company_info/add',
        method: 'post',
        data: data
    });
}

export function company_infoDelete (data) {
    return request({
        url: '/company_info/delete',
        method: 'get',
        params: data
    });
}

export function company_infoUpdate (data) {
    return request({
        url: '/company_info/update',
        method: 'post',
        data: data
    });
}

