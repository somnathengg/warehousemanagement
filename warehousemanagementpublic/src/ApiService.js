import axios from 'axios';
import {BASE_URL} from './common/constant';
export const getAxios=(axiosConfig)=>
{
    let config={
        baseURL: BASE_URL,
        url:axiosConfig.url,
        method:axiosConfig.method
        }
        if(axiosConfig.headers)
        {
            config['headers']={...axiosConfig.headers};
        }
        if(axiosConfig.method==='POST')
        {
            return axios({
            method:'POST',
            data:axiosConfig.data,
            url:BASE_URL+axiosConfig.url
            })
        }
        return axios(config);
}
