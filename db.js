
const admin = require("firebase-admin");

const serviceAccount = require("./petsas-8da7d-firebase-adminsdk-g6645-6f4b8e289f.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

module.exports = { db };