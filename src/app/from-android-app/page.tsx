import { useState } from "react";
import userVerify from "../../../db/from-android-app-email-verification.auth";


export default function Home() {
  const [error, setError] = useState('')
  const urlParams = new URLSearchParams(window.location.search);
  const secret = urlParams.get('secret');
  const userId = urlParams.get('userId');
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
  return (
    <>
      {error && <p>{error}</p>}
      <button onClick={verifyUserEmail}>Verify User Email</button>
    </>
  );
}
