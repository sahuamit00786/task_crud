import {BrowserRouter, Routes,Route} from "react-router-dom"
import Home from "./Pages/Home"
import SignIn from "./Pages/SignIn"
import Signout from "./Pages/Signout"
import Header from "./Pages/Header"
import Task from "./Pages/Task"
import Private from "./Pages/Private"
import AssignTask from "./Pages/AssignTask"
import UserTasks from "./Pages/UserTasks"

function App() {

  return (
        <BrowserRouter>
        <Header/>
          <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/signin" element={<SignIn/>}/>
            <Route path="/signout" element={<Signout/>}/>
            <Route path="/home" element={<Home/>}/>
            <Route path="/tasks" element={<Task/>}/>
            <Route element={<Private/>}>
               <Route path="/userTasks/:id/:username" element={<UserTasks/>}/>
            </Route>
            <Route element={<Private/>}>
               <Route path="/assignTasks" element={<AssignTask/>} />
            </Route>
          </Routes>
        </BrowserRouter>
      )
    }

export default App
