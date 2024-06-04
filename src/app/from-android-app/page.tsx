'use client'
import { useEffect, useState } from "react";
import userVerify from "../../../db/from-android-app-email-verification.auth";



export default function Home() {
  const [error, setError] = useState('')
  const [secret, setSecret] = useState('')
  const [userId, setUserId] = useState('')
  const verifyUserEmail = () => {

    try {

      if (!secret || !userId) {
        setError('secret and userId are required')
        return
      }
      const verifyUser = userVerify.verifyUserEmail({ userId, secret })
      console.log('verifyUser: ', verifyUser);



    } catch (error: any) {
      console.log('verifyUserEmail error: ', error);
      setError(error?.message)
    }
  };
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const secret = String(urlParams.get('secret'));
    const userId = String(urlParams.get('userId'));
    setSecret(secret)
    setUserId(userId)
  }, [])
  return (
    <>
      {error && <p>{error}</p>}
      <button onClick={verifyUserEmail}>Verify User Email</button>
    </>
  );
}
