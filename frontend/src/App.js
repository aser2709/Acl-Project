import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { useAuthContext } from './hooks/useAuthContext'

/** Redux Store */
import store from './redux/store'
import { Provider } from 'react-redux'

// pages & components
import Home from './pages/Home'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Navbar from './components/Navbar'
import AddCourse from './pages/AddCourse'
import SingleCourse from './pages/SingleCourse'
import Profile from './pages/Profile'
import AdminHome from './pages/AdminHome'
import AddUser from './pages/AddUser'
import AddAdmin from './pages/AddAdmin'
import Post from './components/Certification'
import YoutubeNotes from './components/YoutubeNotes'
import Support from './pages/Support'
import YourCourses from './pages/YourCourses'
import Forgot from './pages/forgot'
import Reset from './pages/reset'
import Main from './components/Quiz/Main'
import Quiz from './components/Quiz/Quiz'
import Result from './components/Quiz/Result'
import { UnAuthorized } from './pages/UnAuthorized'
import CreateQuiz from './components/Quiz/CreateQuiz'
import { RegisteredSubtitles } from './pages/RegisteredSubtitles'
import { InstructorCourses } from './pages/InstructorCourses'
import Adminlogin from './pages/AdminLogin'
import Addreport from './pages/AddReport'
import Search from './components/Search'
import UserReports from './pages/userReports'
import SubtitleMain from './components/Quiz/SubtitleMain'
import SubtitleQuiz from './components/Quiz/SubtitleQuiz'
import InstructorSubtitles from './pages/InstructorSubtitles'
import CreateSubtitleQuiz from './components/Quiz/CreateSubtitleQuiz'import Guest from './pages/guest'
import Tos from './pages/tos'


function App() {
  const { user } = useAuthContext()


  return (
    <div className="App">
      <Provider store={store}>
      <BrowserRouter>
        <Navbar/>
        <div className="pages">
          <Routes>
            <Route 
              path="/" 
              element={<YourCourses/>} 
            />      
            <Route 
              path="/Search" 
              element={<Search/>} 
            />                                                           
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
              element={<Adminlogin/>} 
            /> 
            <Route 
              path="/adminHome" 
              element={<AdminHome/>} 
            />
            <Route 
              path="/payments" 
              element={<Payments/>} 
            />
            <Route 
              path="/addadmin" 
              element={<AddAdmin/>} 
            /> 
            <Route 
            path="/reportadmin" 
            element={<AdminReports/>} 
          /> <Route 
          path="/requestadmin" 
          element={<AdminRequest/>} 
        /> 
            
            <Route 
              path="/adduser" 
              element={<AddUser/>} 
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
            />
            <Route
            path="/yourCourses"
            element={<Home/>}
            />
            <Route
            path="/yourInCourses"
            element={<InstructorCourses/>}
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
            <Route
              path="/adding"
              element={<Addreport/>}
            />
            <Route
              path="/myreports"
              element={<UserReports/>}
            />
            <Route
              path="/quiz"
              element={<Main/>}
            />
            <Route
              path="/quiz/:id"
              element={<Quiz/>}
            />
            <Route
              path="/subtitlequiz"
              element={<SubtitleMain/>}
            />
            <Route
              path="/subtitlequiz/:id"
              element={<SubtitleQuiz/>}
            />
            <Route
              path="/result/:id"
              element={<Result/>}
            />
            <Route
              path="/unauthorized"
              element={<UnAuthorized/>}
            />
            <Route
              path="/createQuizcourse/:id"
              element={<CreateQuiz/>}
            />
            <Route
              path="/createQuizsubtitle/:id"
              element={<CreateSubtitleQuiz/>}
            />
            <Route
              path="/subtitles/:id"
              element={<RegisteredSubtitles/>}
            />
            <Route
              path="/instructorsubtitles/:id"
              element={<InstructorSubtitles/>}
            />


          </Routes>
        </div>
      </BrowserRouter>
      </Provider>
    </div>
  );
  
}

export default App;
