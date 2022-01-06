import axios from "axios";

const client = axios.create({
    baseURL: 'https://cors-everywhere.herokuapp.com/http://ec2-3-21-19-104.us-east-2.compute.amazonaws.com/api',
})

export default client;

