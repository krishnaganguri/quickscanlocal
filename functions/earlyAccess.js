const faunadb = require('faunadb');

const q = faunadb.query;
const client = new faunadb.Client({
    secret: process.env.FAUNA_SECRET_KEY, // Use environment variable
});

exports.handler = async (event) => {
    if (event.httpMethod !== 'POST') {
        return { statusCode: 405, body: 'Method Not Allowed' };
    }

    try {
        const data = JSON.parse(event.body);
        const email = data.email;

        await client.query(
            q.Create(q.Collection('EarlyAccess'), {
                data: { email: email },
            })
        );

        return {
            statusCode: 200,
            body: JSON.stringify({ message: 'Success' }),
        };
    } catch (error) {
        console.error('FaunaDB Error:', error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Internal Server Error' }),
        };
    }
};