import './HomeCss.css'
import './RegisterCss.css'
import './UpdateCss.css'
import './UserHomeCss.css'
import Home from './Home'
import Register from './Register';
import Login from './Login';
import UserHome from './UserHome';
import Update from './Update';
import { UserProvider } from './UserProfile'
import {BrowserRouter, Routes, Route} from "react-router-dom";

function App() {
  return (
    <UserProvider>
      <BrowserRouter>
        <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
        <Route path='/userHome' element={<UserHome />} />
        <Route path='/Update/:status' element={<Update />} /> */
      </Routes>
    </BrowserRouter>
   </UserProvider>
  );
}

export default App;