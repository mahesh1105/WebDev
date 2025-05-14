import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import authService from './appwrite/auth';
import { login, logout } from './features/authSlice';
import { Header, Footer } from './components'
import { Outlet } from 'react-router-dom';
import './App.css'

function App() {
  // Accessing the env data
  // console.log(import.meta.env.VITE_APPWRITE_URL);

  // Create a state to represent the loading state - whether its still loading or we got the data
  const [loading, setLoading] = useState(true);

  // Take the reference of dispatch - so that methods can be dispatched using it
  const dispatch = useDispatch();

  // userData will be fetched from the getCurrentUser function
  useEffect(() => {
    authService.getCurrentUser()
    .then((userData) => {
      if(userData) {
        dispatch(login({userData}));
      } else {
        dispatch(logout());
      }
    })
    .catch((error) => {
      throw new Error('Error: ' + error);
    })
    .finally(() => setLoading(false));
  }, [])

  // Conditional Rendering
  return !loading ? (
    <div className='min-h-screen flex flex-wrap content-between bg-gray-400'>
      <div className='w-full block'>
        <Header />
        <main>
          <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  ) : (null);
}

export default App

/*
  Dependencies that need to be installed separately after creating the project:
  -----------------------------------------------------------------------------
  1. React Redux
  2. Redux Toolkit (RTK)
  3. React Router DOM
  4. AppWrite
  5. TinyMCE React Component
  6. HTML React Parser
  7. React Hook Form

  Command:
  --------
  --> npm i @reduxjs/toolkit react-redux react-router-dom appwrite @tinymce/tinymce-react html-react-parser react-hook-form

  ** Dependencies can be seen in "package.json" file under dependencies part

  TinyMCE:
  ========
  TinyMCE is a rich text editor — basically, it’s a tool that you can embed into your website or application 
  to let users edit text content with formatting, kind of like they would in Microsoft Word or Google Docs, but right inside the browser.

  📦 What’s a .env file in a React (Vite) project?
  ------------------------------------------------
  --> In a project using Vite (the cool, super-fast frontend build tool), you can create a .env file to store environment variables — 
      basically, special settings or secret values that your app needs to know about, without hardcoding them into your codebase.

  Example:
  --------
  VITE_API_URL=https://api.example.com
  VITE_GOOGLE_MAPS_KEY=your-google-maps-api-key-here

  🌟 Why use environment variables?
  ---------------------------------
  Here's the magic behind it:

  1. Configuration without Code Changes
  ➔ Instead of changing your code every time you switch from development to production (or staging), you just change the env file.

  2. Keep Secrets Secret (ish)
  ➔ Environment variables help keep API keys, base URLs, and config data out of your visible code — although, 
    note: in frontend apps like React, anything sent to the browser can be seen by users. So don't put super sensitive secrets here (more on that below 👀).

  3. Easier Deployments
  ➔ When deploying, you can set environment variables differently for different environments. 
    Example: different API URLs for development, staging, production, etc.

  4. Cleaner, More Flexible Code
  ➔ Your app can behave differently based on where it's running, without you needing to rewrite anything. Smart, right?

  ## (You must do this when using .env files)
  -------------------------------------------
  ✋ Never Ever Push .env to GitHub or Any Codebase!
  
  Because:
  - Your .env file contains sensitive information (API keys, server URLs, config values).
  - If you push it to GitHub (especially in public repos), anyone can see it and abuse your keys.
  - Even in private repos — it’s just a best practice to not trust uploading secrets unnecessarily.

  🛡️ Best Practice Checklist:
  ---------------------------
  ✅ Add .env to .gitignore so Git doesn’t track it.
  ✅ Create a .env.sample file with only the variable names (no real values) for developers to know what variables they need.

  Note:
  -----
  - Appwrite is using localStorage for session management. 
    Increase your security by adding a custom domain as your API endpoint.
*/