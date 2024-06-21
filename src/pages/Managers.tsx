import { useGetManagers } from '@/api/UserApi'
import UserCard from '@/components/UserCard'
import { useEffect, useState } from 'react'

const Managers = () => {
  const [managersList, setManagersList] = useState([])
  const { managers, isLoading } = useGetManagers()

  // TODO: only admin should be able to see this page

  useEffect(() => {
    if (managers) {
      setManagersList(managers)
    }
  }, [managers])

  if (isLoading) {
    return <div>Loading...</div> // TODO: Add a loader and remove this
  }

  return (
    <div className='h-screen w-[100%] bg-slate-200 p-2 sm:p-8'>
      <div className='flex items-center justify-between'>
        <h1 className='mb-6 text-2xl font-semibold'>Managers</h1>
        <div className='px-5'>Sort</div> {/* TODO: Add sorting functionality */}
      </div>
      <div className='grid grid-cols-1 gap-8 p-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
        {managersList.map((manager: any) => (
          <UserCard
            key={manager.id}
            type='manager'
            id={manager.id}
            name={manager.firstName + ' ' + manager.lastName}
            email={manager.email}
            employees={manager.employee_count}
          />
        ))}
      </div>
    </div>
  )
}

export default Managers
