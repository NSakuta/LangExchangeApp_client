import axios from "axios";

const client = axios.create({
    baseURL: 'http://ec2-3-21-19-104.us-east-2.compute.amazonaws.com/api'
})

export default client;

