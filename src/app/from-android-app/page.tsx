'use client'
import { useEffect, useState } from "react";
import userVerify from "../../../db/from-android-app-email-verification.auth";
import service from "../../../db/from-android-app-user-config-update";



export default function Home() {
  const [error, setError] = useState('')
  const [secret, setSecret] = useState('')
  const [userId, setUserId] = useState('')
  const [isUserVerified, setIsUserVerified] = useState(false)
  const verifyUserEmail = async () => {
    try {
      if (secret === null && userId === null) {
        setError('secret and userId are required')
        return
      }
      const verifyUser = await userVerify.verifyUserEmail({ userId, secret })
      console.log('verifyUser: ', verifyUser);
      if (verifyUser) {
        const userVerifyConfig = await service.updateUserConfig({ userId, isUserVerified: true })
        console.log('userVerifyConfig: ', userVerifyConfig);
        setIsUserVerified(true)

      }



    } catch (error: any) {
      console.log('verifyUserEmail error: ', error);
      setError(error?.message)
    }
  };
  useEffect(() => {
    console.log('window.location.search: ', window.location.search);

    const urlParams = new URLSearchParams(window.location.search);
    const secret = String(urlParams.get('secret'));
    const userId = String(urlParams.get('userId'));
    console.log('secret: ', secret, 'userId: ', userId);

    if (urlParams.get('secret') === null && urlParams.get('userId') === null) {
      console.log('secret and userId are required');

      setError('secret and userId are required')


    }
    setSecret(secret)
    setUserId(userId)
  }, [])
  if (error !== '') {
    return <div className="text-red-500">{error}</div>

  }
  if (isUserVerified) {
    return (
      <div className="text-green-500 text-center text-5xl">User Verified</div>
    )
  }
  return (
    <>
      <div className="text-red-500">{error}</div>

      <button
        onClick={verifyUserEmail}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >Verify User Email</button>
    </>
  );
}
