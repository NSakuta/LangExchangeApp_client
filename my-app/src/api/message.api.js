import client from "./api";

export const getAllMessages = async () => {
    try {
        const response = await client.get('/messages');
        return response.data;
    } catch(err) {
        console.log(err.message)
    }
};