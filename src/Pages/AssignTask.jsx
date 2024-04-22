import { useEffect,useState } from "react"
import { MdDelete } from "react-icons/md";
import { MdAdd } from "react-icons/md";
import { Link } from "react-router-dom";
import loader from '/loader.svg'

const AssignTask = () => {

    const[user,setUser] = useState([])
    const[loading,setLoading] = useState(true)
    // console.log(user)

    const token = localStorage.getItem('token')

    useEffect(()=>{
        const getAllUsers = async()=>{
            try {
                const res = await fetch('https://task-api-vf9d.vercel.app/api/users',{
                method:'GET',
                headers:{
                    'Content-Type':'application/json',
                    'Authorization':`Bearer ${token}`
                }
            })
            const data = await res.json();
            // console.log(data)
            setUser(data)
            setLoading(false)

            } catch (error) {
                console.log(error)        
            }   
        }
     getAllUsers();   

    },[])

    const handleDeleteUser = async(id) =>{
        // console.log(id)
            try {
                const res = await fetch(`https://task-api-vf9d.vercel.app/api/deleteUser/${id}`,{
                    method:'DELETE',
                    headers:{
                        'Content-Type':'application/json'
                    }
                })
                const data = await res.json();
                // console.log(data)
                window.location.reload()
                
            } catch (error) {
                console.log(error)
            }
    }

  return (
    <div className="bg-gray-100 pt-[60px] min-h-screen">
        <div className="flex flex-col justify-center mx-auto w-full">
                <>
                    {
                        loading ? (
                            <div className="mx-auto mt-[150px]">
                                <img className="rounded-full" width='100px' src={loader} alt="" />
                            </div>
                        ):(
                            <div className="w-3/4 mx-auto">
                        <div className="w-full flex flex-row">
                            <div className="w-1/3 text-center font-semibold text-lg">Name</div>
                            <div className="w-1/3 text-center font-semibold text-lg">Email</div>
                            <div className="w-1/3 text-center">Actions</div>
                        </div>
                        <div className="mt-4">
                            {
                            user.map((user)=>(
    
                            <div key={user._id} className="w-full flex flex-row gap-9">
                                <div className="w-1/3 text-lg pl-5 font-semibold text-center">{user.username.charAt(0).toUpperCase() + user.username.slice(1)}</div>
                                <div className="w-1/3 text-lg text-blue-600 font-semibold hover:text-blue-700 cursor-pointer text-center"><Link to={`/userTasks/${user._id}/${user.username}`}>{user.email}</Link></div>
                                <div className="w-1/3 text-center">
                                    <button onClick={()=>handleDeleteUser(user._id)} className="rounded border text-[#C28A50] px-2 py-1"><MdDelete/></button>
                                    <button className="rounded border px-2 py-1">
                                        <Link to={`/userTasks/${user._id}/${user.username}`}><MdAdd/></Link>
                                    </button>
                                </div>
                            </div>
                            ))
                        }
                        </div>
                    </div>
                        )
                    }
                    
                </>
    </div>
    </div>
  )
}

export default AssignTask
