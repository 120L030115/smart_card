import request from '@/plugins/request';

export function GetUserList (data) {
    return request({
        url: '/api/system-item/user/list',
        method: 'post',
        data
    });
}

export function DeleteUser (data) {
    return request({
        url: '/api/system-item/user/delete',
        method: 'post',
        data
    });
}

export function DeleteUserMultiple (data) {
    return request({
        url: '/api/system-item/user/delete/multiple',
        method: 'post',
        data
    });
}

export function UpdateUser (data) {
    return request({
        url: '/api/system-item/user/update',
        method: 'post',
        data
    });
}

export function CreateUser (data) {
    return request({
        url: '/api/system-item/user/create',
        method: 'post',
        data
    });
}

export function GetRoleList (data) {
    return request({
        url: '/api/system-item/role/list',
        method: 'post',
        data
    });
}

export function DeleteRole (data) {
    return request({
        url: '/api/system-item/role/delete',
        method: 'post',
        data
    });
}

export function DeleteRoleMultiple (data) {
    return request({
        url: '/api/system-item/role/delete/multiple',
        method: 'post',
        data
    });
}

export function UpdateRole (data) {
    return request({
        url: '/api/system-item/role/update',
        method: 'post',
        data
    });
}

export function CreateRole (data) {
    return request({
        url: '/api/system-item/role/create',
        method: 'post',
        data
    });
}

export function GetMenuList (data) {
    return request({
        url: '/api/system-item/menu/list',
        method: 'post',
        data
    });
}

export function UpdateRoleMenu (data) {
    return request({
        url: '/api/system-item/role/menu/update',
        method: 'post',
        data
    });
}

export function CreateHeaderMenu (data) {
    return request({
        url: '/api/system-item/menu/header/create',
        method: 'post',
        data
    });
}

export function CreateSiderMenu (data) {
    return request({
        url: '/api/system-item/menu/sider/create',
        method: 'post',
        data
    });
}

export function DeleteMenu (data) {
    return request({
        url: '/api/system-item/menu/delete',
        method: 'post',
        data
    });
}

export function DeleteMenuMultiple (data) {
    return request({
        url: '/api/system-item/menu/delete/multiple',
        method: 'post',
        data
    });
}

export function UpdateMenu (data) {
    return request({
        url: '/api/system-item/menu/update',
        method: 'post',
        data
    });
}
