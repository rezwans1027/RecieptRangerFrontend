import { SignIn as SignInComponent } from '@clerk/clerk-react'
import { useLocation } from 'react-router'

const SignIn = () => {
  const location = useLocation()
  const queryParams = new URLSearchParams(location.search)
  const redirect = queryParams.get('redirect')

  return (
    <div className='flex h-screen items-center justify-center'>
      <SignInComponent
        forceRedirectUrl={redirect ? `${redirect}` : '/'}
        signUpUrl={redirect ? `/sign-up?redirect=${redirect}`: '/sign-up'}
      />
    </div>
  )
}

export default SignIn
