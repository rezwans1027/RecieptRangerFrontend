import { useGetInvitations } from '@/api/UserApi'
import { Button } from '@/components/ui/button'
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

const Invitations = () => {
  const [invitationsList, setInvitationsList] = useState([])
  const { invitations, isLoading } = useGetInvitations() 

  useEffect(() => {
    if (invitations) {
      setInvitationsList(invitations)
    }
  } , [invitations])

  console.log(invitationsList)

  if (isLoading) {
    return <div>Loading...</div> // TODO: Add a loader and remove this 
  }
  // TODO: only admin and manager should be able to see this page
  // TODO: Make more responsive 
  return (
    <div className='h-screen w-[100%] bg-slate-200 p-8'>
      <div className='flex items-center justify-between mb-6'>
        <h1 className='text-2xl font-semibold'>Invitations</h1>
        <Button className='px-5'>Invite</Button>
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
                <TableCell className='text-right'>{formatTimeAgo(invitation.createdAt)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

export default Invitations
