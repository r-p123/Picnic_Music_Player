import { useSignIn } from "@clerk/clerk-react";
import { Button } from "./ui/button";
import googleLogo from './google.png';
import githubLogo from './github-mark-white.png';

const SignInOAuthButtons = () => {
	const { signIn, isLoaded } = useSignIn();

	if (!isLoaded) {
		return null;
	}

	const signInWithGoogle = () => {
		signIn.authenticateWithRedirect({
			strategy: "oauth_google",
			redirectUrl: "/sso-callback",
			redirectUrlComplete: "/auth-callback",
		});
	};

	const signInOther = () => {
		signIn.authenticateWithRedirect({
			strategy: "oauth_github",
			redirectUrl: "/sso-callback",
			redirectUrlComplete: "/auth-callback",
		});
	};


	return (
		<div className="flex">
			<Button onClick={signInWithGoogle} variant={"secondary"} className='w-full text-white border-zinc-200 h-11'>
				<img src={googleLogo} alt='Google' className='size-5' />
				Use Google
			</Button>

			<Button onClick={signInOther} variant={"secondary"} className='w-full text-white border-zinc-200 h-11'>
				<img src={githubLogo} alt='Other' className='size-5' />
				Use Github
			</Button>
		</div>
		
	);
};
export default SignInOAuthButtons;
