import { initializeApp } from 'firebase/app';
import { getFirestore, doc, setDoc, getDoc, deleteDoc } from 'firebase/firestore';
import { firebaseTestConfig } from './firebase.test.config';

describe('Firestore Integration (Test Project)', () => {
  let app, db;

  beforeAll(() => {
    app = initializeApp(firebaseTestConfig, 'test-app');
    db = getFirestore(app);
  }, 20000); // 20 seconds

  afterEach(async () => {
    // Clean up test doc
    await deleteDoc(doc(db, 'testCollection', 'testDoc'));
  }, 20000); // 20 seconds

  it('should save and retrieve data from Firestore', async () => {
    const ref = doc(db, 'testCollection', 'testDoc');
    await setDoc(ref, { foo: 'bar' });
    const snap = await getDoc(ref);
    expect(snap.exists()).toBe(true);
    expect(snap.data().foo).toBe('bar');
  }, 20000); // 20 seconds
});
