
  
  // Firebase Configuration
  const firebaseConfig = {
    apiKey: "AIzaSyD3y0Hfc45drabfiq5hBYbwMYccQrLYsUA",
    authDomain: "petshop-databasecn6035.firebaseapp.com",
    projectId: "petshop-databasecn6035",
    storageBucket: "petshop-databasecn6035.firebasestorage.app",
    messagingSenderId: "1031137912003",
    appId: "1:1031137912003:web:d59b949df3371889e3ae76",
    measurementId: "G-XKCR83NT8X"
  };
  
  // Initialize Firebase
  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  }
  const auth = firebase.auth();
  const db = firebase.firestore();
  
  // Authentication Functions
  async function authenticateUser(email, password) {
    try {
      const userCredential = await auth.signInWithEmailAndPassword(email, password);
      const user = userCredential.user;
      
      // Update last login
      await db.collection('users').doc(user.uid).update({
        lastLogin: firebase.firestore.FieldValue.serverTimestamp()
      });
      
      // Store user data
      localStorage.setItem('userToken', await user.getIdToken());
      localStorage.setItem('userEmail', user.email);
      
      return { success: true, user };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }
  
  async function registerUser(name, email, password) {
    try {
      const userCredential = await auth.createUserWithEmailAndPassword(email, password);
      const user = userCredential.user;
      
      // Save additional user data
      await db.collection('users').doc(user.uid).set({
        name: name,
        email: email,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        lastLogin: firebase.firestore.FieldValue.serverTimestamp()
      });
      
      // Store user data
      localStorage.setItem('userToken', await user.getIdToken());
      localStorage.setItem('userEmail', user.email);
      localStorage.setItem('userName', name);
      
      return { success: true, user };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }
  
  // Make functions available globally
  window.authFunctions = {
    authenticateUser,
    registerUser
  };