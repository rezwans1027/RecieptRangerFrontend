import { SignUp as SignUpComponent } from '@clerk/clerk-react'

const SignUp = () => {
  return (
    <div className='flex justify-center items-center h-screen'>
      <SignUpComponent forceRedirectUrl={'/onboarding'} />
    </div>
  )
}

export default SignUp