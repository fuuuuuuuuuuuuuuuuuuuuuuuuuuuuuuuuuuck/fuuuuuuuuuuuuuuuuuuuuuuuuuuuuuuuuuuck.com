import fetch from 'utils/fetch';

export function gethome() {
    return fetch({
        url: '/home',
        method: 'get',
    });
}


