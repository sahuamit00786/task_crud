import { useEffect, useState } from "react"
import {useSelector} from 'react-redux'
import {Link} from 'react-router-dom'
import { MdOutlineDoneOutline } from "react-icons/md";
import { FaRedhat } from "react-icons/fa";
import loader from '/loader.svg'

const Task = () => {

    const[myTasks,setTasks] = useState([]);
    const[loading,setLoading] = useState(false);
    const{currentUser} = useSelector((state)=>state.user)
    console.log(myTasks)

    useEffect(()=>{
        const tasks = async()=>{
            
            try {
                const res = await fetch(`https://task-api-vf9d.vercel.app/api/getTask/${currentUser._id}`,{
                    method:'GET',
                    headers:{
                        'Content-Type':'application/json'
                    },
                })

                const data = await res.json()
                if(res.ok)
                {
                    setTasks(data)
                    setLoading(false)
                }
                
            } catch (error) {
                console.log(error.message)
            }
        }
        tasks();
    },[])

    const convertToIST = (utcTimeString) => {
        const ISTOffset = 330; // IST is UTC+5:30
        const utcTime = new Date(utcTimeString);
        const ISTTime = new Date(utcTime.getTime() + (ISTOffset * 60000)); // Add offset in milliseconds
        return ISTTime;
    };

    const handleComplete = async(id)=>{
        try {
            const completeTime = new Date().toISOString().slice(0, 19).replace('T', ' '); // Format: YYYY-MM-DD HH:mm:ss
            // console.log(completeTime)
            const res = await fetch(`https://task-api-vf9d.vercel.app/api/completeTask/${id}`,{
                method:'PUT',
                headers:{
                    'Content-Type':'application/json',
                },
                body:JSON.stringify({completed: true, completeTime: completeTime})
            })

            const data = await res.json();
            // console.log(data);
            if(res.ok)
            {
                setTasks(prevTasks=>prevTasks.map(task=>task._id === id ? data : task))
            }

        } catch (error) {
            console.log(error)
        }
    }

  return (

    <div className="bg-gray-100 flex flex-col min-h-screen pt-6">
        <h1 className="text-center font-bold text-xl py-5 font-semibold underline">Assigned Tasks</h1>
        {   
        currentUser ? (
                <div className="flex justify-center items-center">
                    <div className="w-4/5 flex sm:flex-row flex-wrap flex-col gap-4 items-center sm:gap-8 mt-8">
                    {myTasks.length === 0 ? (
                        <div className="mx-auto mt-[150px]">
                            <h1>No tasks yet</h1>
                        </div>
                    ) : (
                        loading ?(
                            <div className="mx-auto mt-[150px]">
                                <img width='100px' src={loader} alt="" />
                            </div>
                        ):(
                            myTasks.map((task) => (
                            <div className=" sm:w-2/5" key={task._id}>
                                <div className="bg-[#101827] w-[380px] p-8 rounded-[20px] h-[220px]">
                                    <div className="flex flex-row items-center justify-between">
                                        <FaRedhat size={32} color="#CEAD76"/>
                                        {
                                            task.priority && (
                                                <span className="text-red-600 font-bold text-sm italic">
                                                    (prioritize)
                                                </span>
                                            )
                                        }
                                        {
                                             task.completed === false ? (
                                                <div className="flex gap-2 text-white italic text-[12px]">
                                                    <span>{new Date(task.deadline).toLocaleDateString()}</span>
                                                    <span>{new Date(task.deadline).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                                                </div>
                                            ) : (
                                                <span className="text-white font-bold text-sm italic">
                                                    completed
                                                </span>
                                            )
                                        }
                                    </div>
                                    
                                    <h1 className=" text-white py-2 text-lg italic pt-3">{task.title}</h1>
                                    <p className="text-gray-300 text-sm overflow-y-scroll overflow-hidden h-[50px]">{task.content}</p>
                                    <div className="py-3">
                                            {
                                             task.completed === false ? (
                                                <button onClick={() => handleComplete(task._id)} className=" border hover:border-[#CEAD76] w-[200px] mt-1 text-sm rounded-[9px] text-white px-4 py-1 mx-auto rounded">
                                                    <MdOutlineDoneOutline className="text-white-600 mx-auto cursor-pointer" />
                                                </button>
                                            ) : (
                                                <button disabled={true} className="border w-[300px] flex flex-row justify-center gap-2 items-center mt-1 text-[13px] rounded-[9px] text-white px-4 py-1 rounded">
                                                    <h1 className="text-center">Completed on : </h1>
                                                    <span>{new Date(task.completeTime).toLocaleDateString()}</span>
                                                    <span>{
                                                        convertToIST(task.completeTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                                                    }</span>
                                                    <MdOutlineDoneOutline className="text-green-500 cursor-pointer" />
                                                </button>
                                            )}
                                        </div>
                                </div>
                            </div>
                        ))
                        )
                    )}
                </div>
                </div>
            ) : (
                <div className=" flex mt-[150px]">
                  <button className="border mx-auto py-3 px-8 rounded-[10px] bg-[#C28A50] hover:bg-[#C77A50] text-white">
                    <Link to='/signin'>
                        Login to continue
                    </Link>
                  </button>
                </div>
            )
        }
    </div>
  )
}

export default Task

