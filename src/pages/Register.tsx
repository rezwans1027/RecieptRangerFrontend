import { useAcceptInvitation, useGetInvitation } from '@/api/UserApi'
import { Button } from '@/components/ui/button'
import { useAuth } from '@clerk/clerk-react'
import { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router'

const Register = () => {
  const { isSignedIn, isLoaded } = useAuth()
  const location = useLocation()
  const navigate = useNavigate()

  // TODO: if a user is already in an organization then sign them out and/or redirect to sign up page

  useEffect(() => {
    if (!isSignedIn && isLoaded) {
      navigate(`/sign-up?redirect=${location.pathname}${location.search}`, {
        replace: true,
      })
    }
  }, [isSignedIn, location.pathname, location.search, navigate, isLoaded])

  const queryParams = new URLSearchParams(location.search)
  const token = queryParams.get('token')
  const { invitation, isLoading } = useGetInvitation(token!)
  const { acceptInvitation } = useAcceptInvitation(token!)

  if (isLoading) {
    return (
      <h1 className='flex h-screen flex-col items-center justify-center gap-4'>
        Loading...
      </h1>
    )
  }

  if (!invitation) {
    return (
      <h1 className='flex h-screen flex-col items-center justify-center gap-4'>
        Invitation not found
      </h1>
    )
  }

  const clickHandler = async () => {
    acceptInvitation()
    navigate('/')
  }

  return (
    <div className='flex h-screen flex-col items-center justify-center gap-4'>
      <div className='flex flex-col gap-16 rounded-xl border-2 px-16 pb-12 pt-16 shadow-xl'>
        <div className='flex flex-col items-center gap-8'>
          <h1 className='text-5xl italic'>Reciept Ranger</h1>
          <h1 className='text-xl'>
            You have been invited to join {invitation.organizationName} as a{' '}
            {invitation.roleName}
          </h1>
        </div>
        <Button onClick={clickHandler}>Accept Invitation</Button>
      </div>
    </div>
  )
}

export default Register
