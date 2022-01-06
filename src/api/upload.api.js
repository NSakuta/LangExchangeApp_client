import client from "./api";

export const sendFile = async (newImg) => {
    try {
        const data = new FormData()
        data.append('image', newImg);

        const response = await client.post('/upload', data, {
            headers: {
                'content-type': 'multipart/form-data'
            }
        })
        return response.data.location
    } catch (err) {
        throw new Error(err.response.data.message)    
    }

}





    
