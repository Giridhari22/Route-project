import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import PrivateRoute from './Components/Layout/PrivateLayout';
import PublicRoute from './Components/Layout/PublicLayout';
import Login from './Components/Pages/Login';
import PageNotFound from './Components/Pages/PageNotFound';
import Product from './Components/Pages/Product';
import Signup from './Components/Pages/Signup';
import ConfirmPassword from './Components/Pages/ConfirmPassword'
import ForgotPassword  from './Components/Pages/ForgotPassword'

function App() {
  return (
    <BrowserRouter>
 
      <Routes>
        <Route path="/" element={<PublicRoute/>}>
            <Route index element={<Login/>} />
            <Route path="signup" element={<Signup/>} />
            <Route path="forgotPassword" element={<ForgotPassword/>} />
            
        </Route>
      </Routes>
      
      <Routes>
      <Route path="/home" element={<PrivateRoute/>}> 
          <Route index element={<Product/>} />
          <Route path="/home/confirmpassword" element={<ConfirmPassword/>} />

      </Route>
        <Route path="*" element={<PageNotFound />} ></Route>
      </Routes>
    

    </BrowserRouter>
  );
}

export default App;
