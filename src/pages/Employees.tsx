import { useGetEmployees } from '@/api/UserApi'
import UserCard from '@/components/UserCard'
import { useEffect, useState } from 'react'
import { formatManager } from '@/lib/utils'

const Employees = () => {
  const [employeesList, setEmployeesList] = useState([])
  const { employees, isLoading } = useGetEmployees()

  // TODO: only admin and manager should be able to see this page

  useEffect(() => {
    if (employees) {
      setEmployeesList(employees)
    }
  }, [employees])

  if (isLoading) {
    return <div>Loading...</div> // TODO: Add a loader and remove this
  }

  return (
    <div className='h-screen w-[100%] bg-slate-200 p-3 sm:p-8'>
      <div className='flex items-center justify-between'>
        <h1 className='mb-6 text-2xl font-semibold'>Employees</h1>
        <div className='px-5'>Sort</div> {/* TODO: Add sorting functionality */}
      </div>
      <div className='grid grid-cols-1 gap-8 p-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
        {employeesList.map((employee: any) => (
          <UserCard
            key={employee.id}
            id={employee.id}
            name={employee.firstName + ' ' + employee.lastName}
            email={employee.email}
            manager={formatManager(employee.manager)}
            type='employee'
          />
        ))}
      </div>
    </div>
  )
}

export default Employees
