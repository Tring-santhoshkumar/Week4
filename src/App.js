import './HomeCss.css'
import './RegisterCss.css'
import './UpdateCss.css'
import './UserHomeCss.css'
import Home from './Home'
import Register from './Register';
import Login from './Login';
import UserHome from './UserHome';
import Update from './Update';

import {BrowserRouter, Routes, Route} from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/register' element={<Register />} />
      <Route path='/login' element={<Login />} />
      <Route path='/userHome' element={<UserHome />} />
      <Route path='/update' element={<Update />} /> */
     </Routes>
   </BrowserRouter>
  );
}

export default App;