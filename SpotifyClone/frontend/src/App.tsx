import './App.css'
import { Routes, Route } from 'react-router-dom'
import HomePage from './pages/home/HomePage.tsx'
import ChatPage from './pages/chat/ChatPage.tsx'
import MainLayout from './layout/MainLayout.tsx'
import AuthCallbackPage from './pages/auth-callback/AuthCallbackPage.tsx'
import { AuthenticateWithRedirectCallback } from '@clerk/clerk-react'
import AlbumPage from './pages/album/AlbumPage.tsx'

function App() {
  return (
    <>
      <Routes>
        <Route 
          path="/sso-callback" 
          element={<AuthenticateWithRedirectCallback signInForceRedirectUrl={'/auth-callback'} />} 
        />

        <Route path="/auth-callback" element={<AuthCallbackPage />} />
        
        <Route element={<MainLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/chat" element={<ChatPage />} />
          <Route path="/albums/:albumId" element={<AlbumPage />} />
        </Route>
      </Routes>
    </>
  )
}

export default App
