import client from "./api";

export const getAllUsers = async () => {
    try {
        const response = await client.get('/users');
        return response.data;
    } catch(err) {
        console.log(err.message);
    }
};

export const addNewUser = async (newUser) => {
    try {
        const response = await client.post('/auth/signup', newUser);
        return response.data;
    } catch(err) {
        console.log(err.message);
    }
};

export const getUserByid = async (id) => {
    try {
        const response = await client.get(`/users/${id}`);
        return response.data;
    }catch(err) {
        console.log(err.message);
    }
};

export const updateUser = async (id, newValue) => {
    try {
        const response = await client.put(`/users/${id}`, newValue);
        return response.data;
    } catch(err) {
        console.log(err.message);
    }
};