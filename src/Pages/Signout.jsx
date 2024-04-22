import { Link, useNavigate } from "react-router-dom"
import { useState } from "react";
const Signout = () => {

    const[formData,setformData] = useState({});
    const navigate = useNavigate();
    // console.log(formData)

    const handleSubmit = async(e)=>{
    e.preventDefault()
    try {
      const res = await fetch('https://https://task-api-9cyg.onrender.com/api/signup',{
        method:'POST',
        headers:{
          'Content-Type':'application/json'
        },
        body:JSON.stringify(formData)
      })
      const data = await res.json()
      // console.log(data)
      if(res.ok)
      {
        navigate('/')
      }
    } catch (error) {
        console.log(error)
    }
  }

   const handleChange = (e) => {
    setformData({...formData, [e.target.id]: e.target.value})
  }

  return (
    
    <>
        <div className="flex min-h-screen mt-[-70px] justify-center items-center">
       <div className=" mx-auto w-[350px] sm:w-[400px] mt-[10px] border shadow-lg p-8">
        <h1 className="font-bold text-xl mb-4 text-center">Sign up</h1>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col py-2">
           <label className="py-1 font-medium" >Username</label>
           <input onChange={handleChange} id="username" type="text" placeholder="Enter your username" className="py-1 px-2 border rounded-[5px]" />
          </div>
        <div className="flex flex-col pb-4">
          <label className="py-1 font-medium">Email</label>
          <input onChange={handleChange} id="email" type="email" placeholder="Enter your email" className="py-1 px-2 border rounded-[5px]" />
        </div>
        <div className="flex flex-col pb-4">
          <label className="py-1 font-medium">Password</label>
          <input onChange={handleChange} id="password" type="password" placeholder="Enter your password" className="py-1 px-2 border rounded-[5px]" />
        </div>
        </form>

        <div className="flex items-center justify-between">
            <button onClick={handleSubmit} className="bg-[#C28A50] hover:bg-blue-700 text-white px-4 py-2 rounded-[10px]">Sign up</button>
            <span className="text-[#C28A50] hover:text-blue-700"><Link to='/signin'>Already have account</Link> </span>
        </div>
        </div>
      </div>
    </>
  )
}

export default Signout
