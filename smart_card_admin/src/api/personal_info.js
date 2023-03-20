import request from '@/plugins/request';

export function personal_infoList (data) {
    return request({
        url: '/personal_info/list',
        method: 'get',
        params: data
    });
}

export function personal_infoAdd (data) {
    return request({
        url: '/personal_info/add',
        method: 'post',
        data: data
    });
}

export function personal_infoDelete (data) {
    return request({
        url: '/personal_info/delete',
        method: 'get',
        params: data
    });
}

export function personal_infoUpdate (data) {
    return request({
        url: '/personal_info/update',
        method: 'post',
        data: data
    });
}

export function personal_infoGet () {
    return request({
        url: '/personal_info/get'
    });
}

