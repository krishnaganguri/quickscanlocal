exports.handler = async (event) => {
    if (event.httpMethod !== 'POST') {
        return { statusCode: 405, body: 'Method Not Allowed' };
    }

    const data = JSON.parse(event.body);
    const email = data.email;

    // Here, you would add code to send the email to a database or email service.
    // For now, we'll just log it to the console.
    console.log('Early Access Email: ', email);

    return {
        statusCode: 200,
        body: JSON.stringify({ message: 'Success' }),
    };
};