import { Outlet } from 'react-router'
import Header from './components/Header'
import Sidebar from './components/Sidebar'
import { SignedIn, SignedOut } from '@clerk/clerk-react'
import { Link } from 'react-router-dom'

const AppLayout = () => {
  return (
    <>
      <SignedIn>
        <div className='flex h-screen'>
          <Sidebar />
          <div className='flex flex-col w-full bg-slate-200 overflow-x-auto'>
            <Header />
            <div className='flex-1'>
              <Outlet />
            </div>
          </div>
        </div>
      </SignedIn>
      <SignedOut>
        <div className='flex justify-end gap-8 border-b-2 p-4'>
          <Link to='/sign-in'>Sign in</Link>
          <Link to='/sign-up'>Sign up</Link>
        </div>
        add landing page here
      </SignedOut>
    </>
  )
}

export default AppLayout
