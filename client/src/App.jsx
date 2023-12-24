import react from 'react'
import { Outlet } from 'react-router-dom'
import Navigation from './pages/Auth/Navigation';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const notify = () => toast("Wow so easy !");
  return (
    <>
      <ToastContainer />
      <Navigation />
      <main className="py-3">
        <Outlet />
      </main>
    </>
  )
}

export default App
