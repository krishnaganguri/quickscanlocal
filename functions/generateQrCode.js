const QRCode = require('qrcode');
const saveToDB = require('./util/saveDB');

exports.handler = async (event) => {
    if (event.httpMethod !== 'POST') {
        return { statusCode: 405, body: 'Method Not Allowed' };
    }

    try {
        const { businessName } = JSON.parse(event.body);

        if (!businessName) {
            return { statusCode: 400, body: JSON.stringify({ error: 'Business name is required' }) };
        }

        const qrCodeData = `https://quickscanlocal.com/checkin?business=${encodeURIComponent(businessName)}`;

        const qrCodeImage = await QRCode.toDataURL(qrCodeData);

        await saveToDB('qrCodes', { businessName, qrCodeData: qrCodeImage });

        return {
            statusCode: 200,
            body: JSON.stringify({ qrCodeImage }),
        };
    } catch (error) {
        console.error('Error generating QR code:', error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Failed to generate QR code' }),
        };
    }
};