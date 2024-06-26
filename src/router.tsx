import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from 'react-router-dom'
import Home from './pages/Home'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'
import Onboarding from './pages/Onboarding'
import Register from './pages/Register'
import AppLayout from './AppLayout'
import Invitations from './pages/Invitations'
import Managers from './pages/Managers'
import Employees from './pages/Employees'

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path='/' element={<AppLayout />}>
        <Route index element={<Home />} />
        <Route path='/invitations' element={<Invitations />} />
        <Route path='/managers' element={<Managers />} />
        <Route path='/employees' element={<Employees />} />
      </Route>
      <Route path='/onboarding' element={<Onboarding />} />
      <Route path='/register' element={<Register />} />
      <Route path='sign-up' element={<SignUp />} />
      <Route path='sign-in' element={<SignIn />} />
    </>
  )
)

export default router
