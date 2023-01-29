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

function App() {
  const [count, setCount] = useState(0)

  const isLoading = useSelector(state => state.isLoading)

  return (
    <div className="App">
      <HashRouter>

        <AppNavbar />
        {isLoading && <LoadingScreen />}
        <Container className='my-7'>
          <Routes>

            <Route path='/' element={<Home />} />
            <Route path='/prducts/:id' element={<ProductsDetails />} />
            <Route path='/login' element={<Login />} />
            <Route path='/purchases' element={<Purchases />} />


          </Routes>
        </Container>
      </HashRouter>
    </div>
  )
}

export default App
