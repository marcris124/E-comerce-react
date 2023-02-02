import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import { HashRouter, Route, Routes } from 'react-router-dom'
import Home from './Pages/Home'
import ProductsDetails from './Pages/ProductsDetails'
import Login from './Pages/Login'
import Favorites from './Pages/Favorites'
import Purchases from './Pages/Purchases'
import AppNavbar from './Components/AppNavbar'
import LoadingScreen from './Components/LoadingScreen'
import { useSelector } from 'react-redux'
import { Container } from 'react-bootstrap'
import ProtectedRoutes from './Components/ProtectedRoutes'

function App() {
  const [count, setCount] = useState(0)

  const isLoading = useSelector(state => state.isLoading)

  return (
    <div className="App">
      <HashRouter>

        <AppNavbar />
        {isLoading && <LoadingScreen />}
        <Container className='my-1' fluid="true">
          <Routes>

            <Route path='/' element={<Home />} />
            <Route path='/prducts/:id' element={<ProductsDetails />} />
            <Route path='/login' element={<Login />} />
            

            <Route element={<ProtectedRoutes/>}>

              <Route path='/purchases' element={<Purchases />} />

            </Route>


          </Routes>
        </Container>
      </HashRouter>
    </div>
  )
}

export default App
