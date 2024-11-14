import { signOut } from 'firebase/auth';
import React from 'react'
import { useNavigate } from 'react-router-dom';
import { auth } from './utils/firebase';

const Header = () => {

  const navigate = useNavigate()

  const isLoggedIn = localStorage.getItem('isLoggedIn');
  const profileUrl = localStorage.getItem('photoURL')

console.log(profileUrl)

  const handleSignOut = () => {
    localStorage.removeItem('uid');
    localStorage.removeItem('isLoggedIn');

    signOut(auth)
      .then(() => {
        console.log("Successfully signed out");
        navigate('/');
      })
      .catch((error) => {
        console.error("Sign-out error: ", error);
      });
  };

  console.log(isLoggedIn)
  return (
    <div className="absolute w-full px-16 py-8 bg-gradient-to-b from-black z-10 ">
      <div className="flex justify-between items-center ">
        <img
          className="w-48 md:w-72"
          src="https://cdn.cookielaw.org/logos/dd6b162f-1a32-456a-9cfe-897231c7763c/4345ea78-053c-46d2-b11e-09adaef973dc/Netflix_Logo_PMS.png"
          alt="Netflix Logo"
        />
        {isLoggedIn && (
          <div className='flex gap-2 items-center'>
          <img src={profileUrl}
          alt='profile_image'
          className='w-10 h-10 rounded-full'>
          </img>
          <button
         className="z-30 my-2 text-white font-bold p-2 bg-red-500 rounded hover:bg-red-600 transition-colors"
         onClick={handleSignOut}
         >
        Sign Out
        </button>
          </div>
        )}

      </div>
    </div>

  )
}

export default Header