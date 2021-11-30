import client from "./api";

export const getAllMessages = async () => {
    try {
        const response = await client.get('/messages');
        return response.data;
    } catch(err) {
        throw new Error(err.response.data.message)
    }
};

export const addNewMessage = async (newMessage) => {
    try {
        const response = await client.post('/messages', newMessage);
        console.log(response.data);
        return response.data;
    } catch(err) {
        throw new Error(err.response.data.message)
    }
};