import Role from '@/components/Role'
import { SignOutButton, SignedIn, SignedOut } from '@clerk/clerk-react'
import { Link } from 'react-router-dom'

const Home = () => {

  return (
    <>
      <SignedOut>
        <div className='flex justify-end gap-8 border-b-2 p-8'>
          <Link to='/sign-in'>Sign in</Link>
          <Link to='/sign-up'>Sign up</Link>
        </div>
      </SignedOut>
      <SignedIn>
        <div className='flex justify-end gap-8 p-8'>
          <SignOutButton />
        </div>
        <div className='flex flex-col items-center justify-center p-16'>
          <Role />
        </div>
      </SignedIn>
    </>
  )
}

export default Home
