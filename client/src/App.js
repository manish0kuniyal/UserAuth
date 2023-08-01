import React from 'react'
import { BrowserRouter as Router ,Route,Routes } from 'react-router-dom';
import Username from './components/username';
import Password from './components/password';
import Reset from './components/reset';
import Register from './components/register'
import Profile from './components/profile'
import Recovery from './components/recovery'
import Pagenotfound from './components/pagenotfound'
import AuthContext from './components/authContext'

const App = () => {
  return (
    <div className='bg-[#f2f2f2]'>
      <AuthContext>
    <Router>
          {/* <div>
      okok
    </div> */}

<Routes >

  <Route path='/' element={<Username/>} />
  <Route path='/register' element={<Register/>} />
  <Route path='/password' element={<Password/>} />
  <Route path='/recovery' element={<Recovery/>} />
  <Route path='/reset' element={<Reset/>} />
  <Route path='/profile' element={<Profile/>} />
  <Route path='*' element={<Pagenotfound/>} />

  
  <Route/>
  
</Routes>

    </Router>
    </AuthContext>
    </div>
  )
}

export default App
