import React, { useEffect, useState } from 'react'
import Header from './Header'
import CheckValidData from './utils/CheckValidData'
import { auth } from './utils/firebase'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'

const Login = () => {

    const [isSignFrom,setIsSignFrom] = useState(true)

    const [email,setEmail]= useState()
    const [password,setPassword]=useState()
    const [name,setName]=useState()
    const [showError,setShowError]=useState('')
    const navigate = useNavigate();

    const handleCheckValidating = () => {
      const msg = CheckValidData(email, password, name);
      setShowError(msg);
    
      if (msg) return;
    
      if (!isSignFrom) {
        // Sign up logic
        createUserWithEmailAndPassword(auth, email, password,name)
          .then((userCredential) => {
            const user = userCredential.user;
            const displayName = name;
            const  photoURL = "https://easy-peasy.ai/cdn-cgi/image/quality=80,format=auto,width=700/https://fdczvxmwwjwpwbeeqcth.supabase.co/storage/v1/object/public/images/50dab922-5d48-4c6b-8725-7fd0755d9334/3a3f2d35-8167-4708-9ef0-bdaa980989f9.png"
            console.log("Successfully signed up:", user);
            updateProfile(user, {
              displayName: displayName,
              photoURL:photoURL
            }).then(() => {
              console.log("User profile updated with name:", displayName);
              localStorage.setItem("displayName",displayName)
              localStorage.setItem("photoURL",photoURL)
              localStorage.setItem("uid", user.uid);
              localStorage.setItem("isLoggedIn", "true");

              navigate('/brower');
            })
          })
          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            setShowError(`Error during sign up: ${errorCode} - ${errorMessage}`);
          });
      } 
      else 
      {
        // Sign in logic
        signInWithEmailAndPassword(auth, email, password)
          .then((userCredential) => {
            const user = userCredential.user;
            console.log("Successfully signed in:", user);
            
            localStorage.setItem("uid", user.uid);
            localStorage.setItem("isLoggedIn", "true");

            navigate('/brower');
          })
          .catch((error) => {
   
            const errorCode = error.code;
            const errorMessage = error.message;
            setShowError(`Error during sign in: ${errorCode} - ${errorMessage}`);
          });
      }
    };
    


    useEffect(() => {
      const isLoggedIn = localStorage.getItem('isLoggedIn');
      const uid = localStorage.getItem('uid');
      if (isLoggedIn) {
        navigate('/brower');
      }
    }, [navigate]);

    const handelSignFrom = () =>{
        setIsSignFrom(!isSignFrom)
    }


  return (
    <div>
        <Header/>
    <div className='absolute'>
    <img src='https://assets.nflxext.com/ffe/siteui/vlv3/81d64f3c-9627-4741-8f74-422bf35f9f1d/web/IN-en-20241104-TRIFECTA-perspective_55263ea2-af7f-40ed-9cf0-7029a9b9baf4_medium.jpg
            ' alt='Banner' className='' />
    </div>


    <div className="flex items-center justify-center min-h-screen">
    <form onClick={(e) => e.preventDefault()} className="relative w-full p-14 bg-black items-center bg-opacity-80 rounded-lg sm:w-3/4 lg:w-1/3">
        <h1 className="text-white text-2xl md:text-4xl font-bold mb-6">
            {isSignFrom ? "Sign In" : "Sign Up"}
        </h1>

        {showError && (
            <div className="flex items-center py-2 px-3 mb-4 bg-yellow-300 rounded-md">
                <svg className="text-red-600 w-5 h-5 mr-2" viewBox="0 0 16 16" fill="currentColor">
                    <path fillRule="evenodd" clipRule="evenodd" d="M14.5 8C14.5 11.5899 11.5899 14.5 8 14.5C4.41015 14.5 1.5 11.5899 1.5 8C1.5 4.41015 4.41015 1.5 8 1.5C11.5899 1.5 14.5 4.41015 14.5 8ZM16 8C16 12.4183 12.4183 16 8 16C3.58172 16 0 12.4183 0 8C0 3.58172 3.58172 0 8 0C12.4183 0 16 3.58172 16 8ZM4.46967 5.53033L6.93934 8L4.46967 10.4697L5.53033 11.5303L8 9.06066L10.4697 11.5303L11.5303 10.4697L9.06066 8L11.5303 5.53033L10.4697 4.46967L8 6.93934L5.53033 4.46967L4.46967 5.53033Z" />
                </svg>
                <p className="text-red-600 text-sm">{showError}</p>
            </div>
        )}

        {!isSignFrom && (
            <input type="text" onChange={(e) => setName(e.target.value)} placeholder="Full Name" className="p-3 mb-3 bg-black border border-slate-400 rounded bg-opacity-65 text-white w-full" />
        )}

        <input type="text" placeholder="Email or mobile number" onChange={(e) => setEmail(e.target.value)} className="p-3 mb-3 bg-black border border-slate-400 rounded bg-opacity-65 text-white w-full" />

        <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} className="p-3 mb-3 bg-black border border-slate-400 rounded bg-opacity-65 text-white w-full" />

        <button className="bg-red-600 w-full text-white font-bold rounded h-10 mt-3" onClick={handleCheckValidating}>
            {isSignFrom ? "Sign In" : "Sign Up"}
        </button>

        <span className="text-white text-center my-3 block">OR</span>

        <button className="bg-gray-300 bg-opacity-30 w-full h-10 font-semibold text-white rounded">Use a sign-in code</button>
        
        {isSignFrom && (
            <span className="text-white text-center mt-3 block">Forgot password?</span>
        )}
        
        <p className="text-white text-center text-base cursor-pointer mt-4" onClick={handelSignFrom}>
            {isSignFrom ? "New to Netflix? Sign up now." : "Already have an account? Sign in"}
        </p>

        <span className="text-slate-400 text-center text-sm mt-4 block">
            This page is protected by Google reCAPTCHA to ensure you're not a bot. Learn more.
        </span>
    </form>
</div>

 
    </div>
  )
}

export default Login