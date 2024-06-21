import { SignOutButton } from "@clerk/clerk-react"

const Header = () => {
  return (
    <>
      <div className='flex items-center justify-between gap-8 p-2 px-4'>
        search bar
        <div className='my-1 flex items-center rounded bg-red-500 text-sm hover:bg-gray-200'>
          <SignOutButton />
        </div>
      </div>
    </>
  )
}

export default Header
