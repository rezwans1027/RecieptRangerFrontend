import { useGetUserInfo } from '@/api/UserApi'
import { useAuth } from '@clerk/clerk-react'
import {
  PresentationChartBarIcon,
  EnvelopeOpenIcon,
  UserCircleIcon,
  UserIcon,
  CreditCardIcon,
  Cog8ToothIcon,
} from '@heroicons/react/24/outline'
import { useLocation } from 'react-router'

const AdminLinks = [
  {
    name: 'Dashboard',
    href: '/',
    icon: PresentationChartBarIcon,
  },
  {
    name: 'Invitations',
    href: '/invitations',
    icon: EnvelopeOpenIcon,
  },
  {
    name: 'Managers',
    href: '/managers',
    icon: UserCircleIcon,
  },
  {
    name: 'Employees',
    href: '/employees',
    icon: UserIcon,
  },
  {
    name: 'Transactions',
    href: '/transactions',
    icon: CreditCardIcon,
  },

  {
    name: 'Settings',
    href: '/settings',
    icon: Cog8ToothIcon,
  },
]

const ManagerLinks = [
  {
    name: 'Dashboard',
    href: '/',
    icon: PresentationChartBarIcon,
  },
  {
    name: 'Employees',
    href: '/employees',
    icon: UserIcon,
  },
  {
    name: 'Transactions',
    href: '/transactions',
    icon: CreditCardIcon,
  },
  {
    name: 'Settings',
    href: '/settings',
    icon: Cog8ToothIcon,
  },
]

const EmployeeLinks = [
  {
    name: 'Dashboard',
    href: '/',
    icon: PresentationChartBarIcon,
  },
  {
    name: 'Transactions',
    href: '/transactions',
    icon: CreditCardIcon,
  },
  {
    name: 'Settings',
    href: '/settings',
    icon: Cog8ToothIcon,
  },
]

const Sidebar = () => {
  const { userId, isSignedIn } = useAuth()
  const { userInfo, isLoading } = useGetUserInfo(userId as string)
  const location = useLocation()

  if (!isSignedIn) {
    return null
  }
  if (isLoading) {
    return <div>Loading...</div> // add a skeleton
  }

  const links =
    userInfo?.role === 'admin'
      ? AdminLinks
      : userInfo?.role === 'manager'
        ? ManagerLinks
        : EmployeeLinks

  return (
    <div className='shadow-lg'>
      <h1 className='pt-4 text-center text-lg italic max-sm:hidden lg:text-[1.6rem]'>
        RecieptRanger®
      </h1>
      <h1 className='pt-2 text-center text-lg italic sm:hidden'>RR</h1>
      <div className='mt-12 p-2'>
        {links.map(link => (
          <a
            key={link.name}
            href={link.href}
            className={`my-1 flex items-center rounded px-2 py-1 hover:bg-gray-200 max-lg:p-2 max-sm:text-xs lg:w-56 ${
              location.pathname === link.href ? 'bg-gray-200 font-semibold' : ''
            }`}
          >
            <link.icon className='inline h-4 w-4 max-sm:h-6 max-sm:w-6 sm:mr-2' />
            <div className='max-sm:hidden'>{link.name}</div>
          </a>
        ))}
      </div>
    </div>
  )
}

export default Sidebar
