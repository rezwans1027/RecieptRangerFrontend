import { SignIn as SignInComponent } from '@clerk/clerk-react'

const SignIn = () => {
  return (
    <div className='flex justify-center items-center h-screen'>
      <SignInComponent />
    </div>
  )
}

export default SignIn