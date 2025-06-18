import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/clerk-react';
import './App.css';
import { Button } from './components/ui/button';
import './index.css';

export default function App() {
  return (
    <>
    <h1 className="text-3xl font-bold underline">
      Hello world!
    </h1>
    <Button >This is Button</Button>
    <header>
      <SignedOut>
        <SignInButton />
      </SignedOut>
      <SignedIn>
        <UserButton />
      </SignedIn>
    </header>
    </>
  )
}