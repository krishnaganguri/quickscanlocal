const admin = require('firebase-admin');

const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

async function saveToDB(collection, document) {
   try {
           console.log('Firebase document:', document);
           await admin.firestore().collection(collection).add(document);
           return { message: 'Success' };
       } catch (error) {
           console.error('Firebase Error:', error);
           throw error;
       }
}

module.exports = saveToDB;