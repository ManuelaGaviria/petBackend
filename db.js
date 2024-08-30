
const admin = require("firebase-admin");

const serviceAccount = require("./petsas-8da7d-firebase-adminsdk-g6645-f5bf334eca.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

module.exports = { db };