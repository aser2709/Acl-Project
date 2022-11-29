import { BrowserRouter, Routes, Route } from 'react-router-dom'

//pages & components
import Home from './pages/Home'
import Navbar from './components/Navbar'
import AddCourse from './pages/AddCourse';
import SignupForm from './pages/Signup';
import LoginForm from './pages/Login';




function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Navbar />
      <div className='pages'>
        <Routes>
          <Route
            path="/"
            element={<Home/>}
          />
          <Route
            path="/addcourse"
            element={<AddCourse/>}
          />
          <Route
            path="/signup"
            element={<SignupForm/>}
          />
          <Route
            path="/login"
            element={<LoginForm/>}
          />
        </Routes>
      </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
