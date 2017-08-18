import fetch from 'utils/fetch';

export function getMyTopic(token) {
    return fetch({
        url: '/mytopic',
        method: 'get',
        params: { token }
    });
}


