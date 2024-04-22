import { Link,useNavigate } from "react-router-dom"
import { useState } from "react"
import { useDispatch} from "react-redux"
import { setCurrentUser } from "../store/UserSlice"
const SignIn = () => {

  const[formData,setformData] = useState({})
  // console.log(formData)

  const dispatch = useDispatch()
  const navigate = useNavigate()
  // console.log(currentUser)

  const[error,setError] = useState(null)

  const handleChange = (e) => {
    setformData({...formData, [e.target.id]: e.target.value})
  }

  const handleSubmit = async(e)=>{
    e.preventDefault()
    try {
      const response = await fetch('http://localhost:3000/api/signin',{
        method:'POST',
        headers:{
          'Content-Type':'application/json'
        },
        body:JSON.stringify(formData)
      })
      const data = await response.json()
      const{token,user} = data;
      console.log(user,token)
      dispatch(setCurrentUser(user))
      // console.log(data)
      if(response.ok)
      {
        localStorage.setItem('token',data.token)
        navigate('/')
      }else{
        setError(data.message)
      }
    } catch (error) {

      setError(error.message)
        // console.log(error.message)
    }
  }

  return (
    <>
    <div className="flex mt-[-70px] min-h-screen justify-center items-center">
       <div className=" mx-auto w-[350px] sm:w-[400px] mt-[10px] border shadow-lg p-8">
        <h1 className="font-bold text-center text-xl mb-4">Sign in</h1>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col py-2">
           <label className="py-1 font-medium" >Username</label>
           <input onChange={handleChange} id="username" type="text" placeholder="Enter your username" className="py-1 px-2 border rounded-[5px]" />
          </div>
        <div className="flex flex-col pb-4">
          <label className="py-1 font-medium">Password</label>
          <input onChange={handleChange} id="password" type="password" placeholder="Enter your password" className="py-1 px-2 border rounded-[5px]" />
        </div>
        </form>

        <div className="flex items-center justify-between">
            <button onClick={handleSubmit} className="bg-[#C28A50] hover:bg-bluse-700 text-white px-4 py-2 rounded-[10px]">Sign in</button>
            <span className="text-[#C28A50] hover:text-blue-700"><Link to='/signout'>dont have account</Link> </span>
        </div>
        <div className="flex justify-center mt-3">
          <span className="text-red-500 mx-auto">{error}</span>
        </div>
        </div>
      </div>
    </>
  )
}

export default SignIn