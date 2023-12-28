import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './redux/store.js'
import Login from './pages/Auth/Login.jsx'
import Registration from './pages/Auth/Registration.jsx'
import PrivateRoute from './components/PrivateRoute.jsx'
import Profile from './pages/User/Profile.jsx'
import AdminRoute from './pages/Admin/AdminRoute.jsx'
import UserList from './pages/Admin/UserList.jsx'
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App />}>
      <Route path='/login' element={<Login />} />
      {/* Auth User Route */}
      <Route path='/register' element={<Registration />} />
      <Route path='' element={<PrivateRoute />}>
        <Route path='/profile' element={<Profile />} />
      </Route>
      {/* Admin Route */}
      <Route path='/admin' element={<AdminRoute />}>
        <Route path='user-list' element={<UserList />} />
      </Route>
    </Route>
  )
)
ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
)
