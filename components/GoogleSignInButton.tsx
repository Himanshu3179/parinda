
import { FC, ReactNode } from 'react';
import { Button } from './ui/button';
import { useToast } from '@/components/ui/use-toast';
import { signIn } from 'next-auth/react';

interface GoogleSignInButtonProps {
    children: ReactNode;
}
const GoogleSignInButton: FC<GoogleSignInButtonProps> = ({ children }) => {
    const loginWithGoogle = async () => {
        await signIn('google', { callbackUrl: '/' })
        // toast({
        //     title: "Sorry",
        //     description: "Sign in with Google is not available yet!",
        // })
    }
    const { toast } = useToast()
    return (
        <Button onClick={loginWithGoogle} className='w-full'>
            {children}
        </Button>
    );
};

export default GoogleSignInButton;