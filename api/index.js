require('dotenv').config();
const axios = require('axios');

const encoded = Buffer.from(process.env.USERNAME + ':' + process.env.PASSWORD).toString('base64');
const ROLE_ID = process.env.ROLE_ID;
const CENTRAL_URL = process.env.CENTRAL_URL;
const PROJECT_ID = process.env.PROJECT_ID;

const createUser = async (email, password) => {
    try {
        const res = await axios.post(`${CENTRAL_URL}/v1/users`, {
            email,
            password
        }, {
            headers: {
                'Authorization': 'Basic ' + encoded
            },
        });
        return res.data;
    } catch (err) {
        console.log(err);
        return null;
    }
}


const assignRole = async (id) => {
    try {
        const res = await axios.post(`${CENTRAL_URL}/v1/projects/${PROJECT_ID}/assignments/${ROLE_ID}/${id}`, {}, {
            headers: {
                'Authorization': 'Basic ' + encoded
            },
        });
        return res.data;
    } catch (err) {
        console.log(err);
        return null;
    }
}
module.exports = {
    createUser,
    assignRole
}