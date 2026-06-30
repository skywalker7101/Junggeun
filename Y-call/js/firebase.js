// ===== FIREBASE CONFIG =====
const firebaseConfig = {
  apiKey: "AIzaSyByWKGxgyvIur7grpo4SR7hZX5UXY5Xy0Y",
  authDomain: "y-call-42ed1.firebaseapp.com",
  databaseURL: "https://y-call-42ed1-default-rtdb.firebaseio.com",
  projectId: "y-call-42ed1",
  storageBucket: "y-call-42ed1.firebasestorage.app",
  messagingSenderId: "821114302392",
  appId: "1:821114302392:web:38d40b09c32e56b040a94d",
  measurementId: "G-XKFENT546V"
};

firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db   = firebase.firestore();

// ===== AUTH =====
async function fbSignUp(email, password, name, phone) {
  const cred = await auth.createUserWithEmailAndPassword(email, password);
  await cred.user.updateProfile({ displayName: name });
  await db.collection('users').doc(cred.user.uid).set({
    name, email, phone,
    role: 'user',
    freeMinutes: 10,
    createdAt: firebase.firestore.FieldValue.serverTimestamp()
  });
  return cred.user;
}

async function fbSignIn(email, password) {
  const cred = await auth.signInWithEmailAndPassword(email, password);
  return cred.user;
}

async function fbGoogleSignIn() {
  const provider = new firebase.auth.GoogleAuthProvider();
  const cred = await auth.signInWithPopup(provider);
  const isNew = cred.additionalUserInfo?.isNewUser;
  if (isNew) {
    await db.collection('users').doc(cred.user.uid).set({
      name: cred.user.displayName || '',
      email: cred.user.email || '',
      phone: '',
      role: 'user',
      freeMinutes: 10,
      createdAt: firebase.firestore.FieldValue.serverTimestamp()
    });
  }
  return cred.user;
}

async function fbSignOut() {
  await auth.signOut();
}

async function getUserProfile(uid) {
  const doc = await db.collection('users').doc(uid).get();
  return doc.exists ? { uid, ...doc.data() } : null;
}

// ===== BOOKINGS =====
async function saveBooking(data) {
  return await db.collection('bookings').add({
    ...data,
    createdAt: firebase.firestore.FieldValue.serverTimestamp()
  });
}

async function getUserBookings(uid) {
  const snap = await db.collection('bookings')
    .where('userId', '==', uid)
    .orderBy('createdAt', 'desc')
    .get();
  return snap.docs.map(d => ({ id: d.id, ...d.data() }));
}

async function getExpertBookings(expertId) {
  const snap = await db.collection('bookings')
    .where('expertId', '==', expertId)
    .orderBy('createdAt', 'desc')
    .get();
  return snap.docs.map(d => ({ id: d.id, ...d.data() }));
}

// ===== APPROVED EXPERTS =====
async function getApprovedExperts() {
  const snap = await db.collection('expertApplications')
    .where('status', '==', 'approved').get();
  return snap.docs.map(doc => {
    const d = doc.data();
    return {
      id:             'fs_' + doc.id,
      uid:            doc.id,
      name:           d.name || '전문가',
      initials:       (d.name || '전')[0],
      title:          d.title || '',
      category:       d.category || 'other',
      tags:           Array.isArray(d.keywords) ? d.keywords : [],
      rating:         5.0,
      reviewCount:    0,
      callCount:      0,
      pricePerMin:    d.pricePerMin || 1000,
      isOnline:       true,
      isCertified:    true,
      bio:            d.bio || '',
      career:         typeof d.career === 'string' ? d.career.split('\n').filter(Boolean) : [],
      education:      [],
      responseTime:   '평균 5분',
      availableSlots: ['09:00', '10:00', '14:00', '15:00', '16:00'],
    };
  });
}

// ===== EXPERT REGISTRATION =====
async function saveExpertApplication(uid, data) {
  await db.collection('expertApplications').doc(uid).set({
    ...data,
    status: 'pending',
    createdAt: firebase.firestore.FieldValue.serverTimestamp()
  });
  await db.collection('users').doc(uid).set({ role: 'expert_pending' }, { merge: true });
}
