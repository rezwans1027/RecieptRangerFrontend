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

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/'>
      <Route index element={<Home />} />
      <Route path='sign-up' element={<SignUp />} />
      <Route path='sign-in' element={<SignIn />} />
      <Route path='/onboarding' element={<Onboarding />} />
      <Route path='/register' element={<Register />} />
    </Route>
  )
)

export default router
