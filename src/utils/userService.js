import {
  doc,
  setDoc,
  updateDoc,
  onSnapshot,
  increment,
  arrayUnion
} from "firebase/firestore";

import { db } from "../firebase";


// ✅ CREATE USER (if not exists)
export const createUserIfNotExists = async (user) => {
  if (!user) return;

  const ref = doc(db, "users", user.uid);

  await setDoc(
    ref,
    {
      email: user.email,
      points: 0,
      challenges: [],
      clubs: [],
    },
    { merge: true }
  );
};


// ✅ REAL-TIME LISTENER
export const listenUser = (uid, callback) => {
  if (!uid) return;

  const ref = doc(db, "users", uid);

  return onSnapshot(ref, (snap) => {
    if (snap.exists()) {
      callback(snap.data());
    }
  });
};


// ✅ ADD POINTS
export const addPoints = async (uid, pts) => {
  if (!uid) return;

  const ref = doc(db, "users", uid);

  await updateDoc(ref, {
    points: increment(pts),
  });
};


// ✅ COMPLETE CHALLENGE
export const completeChallenge = async (uid, challengeId) => {
  if (!uid) return;

  const ref = doc(db, "users", uid);

  await updateDoc(ref, {
    challenges: arrayUnion(challengeId),
  });
};


// ✅ JOIN CLUB
export const joinClub = async (uid, club) => {
  if (!uid || !club) return;

  const ref = doc(db, "users", uid);

  await updateDoc(ref, {
    clubs: arrayUnion(club),
  });
};