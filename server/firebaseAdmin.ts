import admin from "firebase-admin";
import serviceAccount from "./serviceAccountKey.json"; // <-- Adjust path if you put JSON elsewhere

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
  });
}

export default admin;
