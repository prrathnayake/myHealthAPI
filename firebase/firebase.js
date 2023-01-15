const admin = require("firebase-admin");
const serviceAccount = require("./myhealth-92372-firebase-adminsdk-5llmi-3b9ac38c9e.js");

admin.initializeApp({
  credential: admin.credential.cert(JSON.parse(serviceAccount))
});

const db = admin.firestore();

module.exports = {db};