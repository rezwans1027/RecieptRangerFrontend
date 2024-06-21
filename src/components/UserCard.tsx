import { UserCircle } from 'lucide-react'

interface UserCardProps {
  id: string
  name: string
  email: string
  employees?: number
  manager?: string
  type?: string
}

// TODO: Wrap a link to the manager's profile

const UserCard = ({
  id,
  name,
  email,
  employees,
  manager,
  type,
}: UserCardProps) => {
  return (
    <div className='flex min-w-48 flex-col items-center rounded-lg bg-white p-2 shadow-lg'>
      <UserCircle size={64} className='my-3' />
      <div className='overflow-x-scroll text-sm font-bold'>{name}</div>
      <div className='overflow-x-scroll text-xs'>{email}</div>
      {type === 'manager' && (
        <div className='my-2 text-xs text-slate-500'>
          Employees: {employees}
        </div>
      )}
      {type === 'employee' && (
        <div className='my-2 text-center text-xs text-slate-500'>
          Manager: {manager}
        </div>
      )}
    </div>
  )
}

export default UserCard
