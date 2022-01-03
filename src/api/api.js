import axios from "axios";
const https = require('https');



const client = axios.create({
    baseURL: 'http://ec2-3-21-19-104.us-east-2.compute.amazonaws.com/api',
    httpsAgent: new https.Agent({  
        rejectUnauthorized: false
      })
})

export default client;

