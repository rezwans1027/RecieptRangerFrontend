import { useGetInvitations, useGetUserInfo } from '@/api/UserApi'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { useEffect, useState } from 'react'
import { formatRole, formatManager, formatTimeAgo } from '@/lib/utils'
import AdminInvite from '@/components/AdminInvite'
import { useAuth } from '@clerk/clerk-react'
import ManagerInvite from '@/components/ManagerInvite'

const Invitations = () => {
  const [invitationsList, setInvitationsList] = useState([])
  const { invitations, invitationsLoading } = useGetInvitations()
  const { userId } = useAuth()
  const { userInfo, isLoading } = useGetUserInfo(userId as string)

  useEffect(() => {
    if (invitations) {
      setInvitationsList(invitations)
    }
  }, [invitations])

  if (invitationsLoading || isLoading) {
    return <div>Loading...</div> // TODO: Add a loader and remove this
  }

  return (
    <div className='h-screen w-[100%] bg-slate-200 p-8'>
      <div className='mb-6 flex items-center justify-between'>
        <h1 className='text-2xl font-semibold'>Invitations</h1>
        {userInfo.role === 'admin' ? <AdminInvite /> : <ManagerInvite />}
      </div>
      <div className='overflow-x-auto rounded-xl bg-white'>
        <Table className='min-w-full max-md:text-xs'>
          <TableHeader>
            <TableRow>
              <TableHead>Email</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Manager</TableHead>
              <TableHead className='text-right'>Sent</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className='text-nowrap'>
            {invitationsList.map((invitation: any) => (
              <TableRow key={invitation.invitationId}>
                <TableCell>{invitation.email}</TableCell>
                <TableCell>{formatRole(invitation.role)}</TableCell>
                <TableCell>{formatManager(invitation.manager)}</TableCell>
                {/* TODO: Add link to manager */}
                <TableCell className='text-right'>
                  {formatTimeAgo(invitation.createdAt)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

export default Invitations
