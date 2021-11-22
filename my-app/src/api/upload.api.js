import client from "./api";

export const sendFile = async (img) => {
    try {
        const data = new FormData()
        data.append('avatar', img)
        console.log('sendFile img: ', img)
        const response = await client.post('/upload', data, {
            'content-type': 'multipart/form-data'
            }
        )
        return response.data.path;
    } catch(err) {
        console.log(err.message)
    }
}

export const addNewMessage = async (newMessage) => {
    try {
        const response = await client.post('/messages', newMessage);
        console.log(response.data);
        return response.data;
    } catch(err) {
        console.log(err.message)
    }
};




    
