import './App.css'
import { Button } from "@/components/ui/button"
import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/clerk-react';

function App() {
  return (
    <>
      <header>
        <SignedOut>
          <SignInButton>
            <Button variant={'outline'}>Sign In</Button>
          </SignInButton>
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>
      </header>
      <h1 className='text-3xl text-center text-blue-500'>Hello World</h1>
      <Button variant={'outline'}>This is a Button</Button>
    </>
  )
}

export default App
