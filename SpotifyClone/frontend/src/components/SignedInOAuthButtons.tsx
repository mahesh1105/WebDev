import { useSignIn } from "@clerk/clerk-react"
import { Button } from "./ui/button";

const SignedInOAuthButtons = () => {
  const {signIn, isLoaded} = useSignIn();

  if(!isLoaded) {
    return null;
  }

  // When we click on the google account, it will take to "/sso-callback", provide token and authenticate user then will go to final url
  const signInWithGoogle = () => {
    signIn.authenticateWithRedirect({
      strategy: "oauth_google",
      redirectUrl: "/sso-callback",
      redirectUrlComplete: "/auth-callback",
    })
  }

  return (
    <Button onClick={signInWithGoogle} variant={"secondary"} className="w-full text-white border-zinc-200 h-11 cursor-pointer">
      Continue with Google
    </Button>
  )
}

export default SignedInOAuthButtons
