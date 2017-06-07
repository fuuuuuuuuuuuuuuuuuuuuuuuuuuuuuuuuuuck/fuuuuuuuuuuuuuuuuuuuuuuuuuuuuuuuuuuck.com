import axios from 'axios'

function ajax(method ,url ,data){
    axios({
        url:url,
        method:method,
        baseURL:"http://localhost:7000/",
        data:data,
        responseType: 'json',
    }).then((response) => {
        return  response.body;
    })
}

export default ajax