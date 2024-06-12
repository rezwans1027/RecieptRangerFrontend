import { SignUp as SignUpComponent } from '@clerk/clerk-react'
import { useLocation } from 'react-router'

const SignUp = () => {
  const location = useLocation()
  const queryParams = new URLSearchParams(location.search)
  const redirect = queryParams.get('redirect')

  return (
    <div className='flex h-screen items-center justify-center'>
      <SignUpComponent
        forceRedirectUrl={redirect ? `${redirect}` : '/onboarding'}
        signInUrl={redirect ? `/sign-in?redirect=${redirect}`: '/sign-in'}
      />
    </div>
  )
}

export default SignUp
