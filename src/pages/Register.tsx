import { useGetInvitation } from '@/api/UserApi'
import { Button } from '@/components/ui/button'
import { useAuth } from '@clerk/clerk-react'
import { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router'

const Register = () => {
  const { isSignedIn, isLoaded } = useAuth()
  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    if (!isSignedIn && isLoaded) {
      navigate(`/sign-up?redirect=${location.pathname}${location.search}`, {
        replace: true,
      })
    }
  }, [isSignedIn, location.pathname, location.search, navigate, isLoaded])

  const queryParams = new URLSearchParams(location.search)
  const token = queryParams.get('token')
  const { invitation } = useGetInvitation(token!)

  if (!invitation) {
    return null
  }

  return (
    <div className='flex h-screen flex-col items-center justify-center gap-4'>
      <div className='flex flex-col gap-16 rounded-xl border-2 px-16 pb-12 pt-16 shadow-xl'>
        <div className='flex flex-col items-center gap-8'>
          <h1 className='text-5xl italic'>Reciept Ranger</h1>
          <h1 className='text-xl'>
            You have been invited to join {invitation.organizationName} as a {invitation.roleName}
          </h1>
        </div>
        <Button>Accept Invitation</Button>
      </div>
    </div>
  )
}

export default Register
