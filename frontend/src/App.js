import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { useAuthContext } from './hooks/useAuthContext'

// pages & components
import Home from './pages/Home'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Navbar from './components/Navbar'
import AddCourse from './pages/AddCourse'
import SingleCourse from './pages/SingleCourse'
import Profile from './pages/Profile'
import AdminHome from './pages/AdminHome'
import Quiz from './pages/Quiz'
import Post from './components/Certification'
import YoutubeNotes from './components/YoutubeNotes'
import Support from './pages/Support'
import YourCourses from './pages/YourCourses'
import Forgot from './pages/forgot'
import Reset from './pages/reset'
import Guest from './pages/guest'
import Tos from './pages/tos'


function App() {
  const { user } = useAuthContext()


  return (
    <div className="App">
      <BrowserRouter>
        <Navbar/>
        <div className="pages">
          <Routes>
            <Route 
              path="/" 
              element={<YourCourses/>} 
            /> 
            <Route 
              path="/guest" 
              element={<Guest/>} 
            />                                                                
            <Route 
              path="/login" 
              element={!user ? <Login /> : <Navigate to="/" />} 
            />
            <Route 
              path="/admin" 
              element={<AdminHome/>} 
            /> 
            <Route 
              path="/Quiz" 
              element={<Quiz />} 
            /> 
            <Route 
              path="/signup" 
              element={!user ? <Signup /> : <Navigate to="/" />} 
            />
            <Route
              path="/addcourse"
              element={<AddCourse/>}
            />
            <Route
              path="/course"
              element={<SingleCourse/>}
            /><Route
            path="/yourCourses"
            element={<Home/>}
          />
            <Route
              path="/profile"
              element={<Profile/>}
            />
            <Route
              path="/profile/youtube"
              element={<YoutubeNotes/>}
            />
            <Route
              path="/profile/cert"
              element={<Post/>}
            />
            <Route
              path="/support"
              element={<Support/>}
            />
            <Route
              path="/tos"
              element={<Tos/>}
            />
            <Route
              path="/tos"
              element={<Tos/>}
            />
            <Route
              path="/forgotpassword"
              element={<Forgot/>}
            />
            <Route
              path="/resetpassword/:id"
              element={<Reset/>}
            />
              
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
  
}

export default App;
