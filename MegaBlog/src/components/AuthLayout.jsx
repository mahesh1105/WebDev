import React, {useEffect, useState} from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

// Component to Render or Display Conditionally
const Protected = ({children, authentication=true}) => {
  const navigate = useNavigate();
  const [loader, setLoader] = useState(true);
  const authStatus = useSelector(state => state.auth.status);
  const userData = useSelector(state => state.auth.userData);

  // Note: If user is authenticated then go to home page else go to login page

  useEffect(() => {
    // Easy Logic
    // if(authStatus === true) {
    //   navigate('/'); // Home
    // } else if(authStatus === false) {
    //   navigate('/login'); // Login
    // }

    // If user is not authenticated then navigate him to login page
    if(authentication && authStatus !== authentication) {
      // ✅ useNavigate lets programmatically send users to another page
      // ➡️ Boom. The user is now at the login page. No click needed. No button. No link. Just smart logic.
      navigate('/login')
    } else if(!authentication && authStatus !== authentication) {
      navigate('/')
    }
    setLoader(false);
  }, [authStatus, navigate, authentication])

  return (
    loader ? <h1>Loading...</h1> : <>{children}</>
  )
}

export default Protected;

/*
  
*/