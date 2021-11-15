import client from "./api";

export const login = async (data) => {
    try {
        const response = await client.post('/auth/signin', data);
        return response.data;
    } catch (err) {
        console.log(err.message)
    }
}