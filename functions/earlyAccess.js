exports.handler = async (event) => {
    if (event.httpMethod !== 'POST') {
        return { statusCode: 405, body: 'Method Not Allowed' };
    }

    try {
        const data = JSON.parse(event.body);
        const email = data.email;
        console.error('email: ', email);

        const response = await fetch('https://db.us.fauna.com/QuickScanLocal/collections/EarlyAccess/documents', {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${process.env.FAUNA_SECRET_KEY}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ data: { email: email } }),
        });

        if (!response.ok) {
            const errorData = await response.json();
            console.error('FaunaDB API Error:', errorData);
            return { statusCode: response.status, body: JSON.stringify({ error: errorData }) };
        }

        return {
            statusCode: 200,
            body: JSON.stringify({ message: 'Success' }),
        };
    } catch (error) {
        console.error('Error:', error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Internal Server Error' }),
        };
    }
};