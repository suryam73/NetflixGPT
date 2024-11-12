import React from 'react'
import { useNavigate } from 'react-router-dom'
import { auth } from './utils/firebase';
import { signOut } from 'firebase/auth';
import Header from './Header';

const Bower = () => {



  return (
    <div >
      <div className='flex justify-between '>
      <div>
      <Header/>
      </div>


      </div>
 

    </div>
  )
}

export default Bower