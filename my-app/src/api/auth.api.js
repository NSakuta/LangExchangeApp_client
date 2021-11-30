import client from "./api";

client.interceptors.response.use(
    response => { 
        if(response.config.url.startsWith('/auth/signin')) {
            localStorage.setItem('TOKEN', response.data['accessToken'])
        }
        return response;
    }, 

    error => { // если токен устарел
        if(error.response.status === 401) {
            localStorage.removeItem('TOKEN')
        }
        return Promise.reject(error);
    }  
)

client.interceptors.request.use(
    config => { // относиться к headers
        console.log('config: ', config);
        if(!config.url.startsWith('/auth')) {
            config.headers = {
                'x-access-token': localStorage.getItem('TOKEN') || ''
            }
        }
        return config
    },
    error => {
        return Promise.reject(error)
    }
)

export const login = async (data) => {
    try {
        const response = await client.post('/auth/signin', data);
        return response.data;
    } catch (err) {
        console.log(err.message)
    }
}