import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { AiOutlineDelete } from "react-icons/ai";
import { MdAutorenew } from "react-icons/md";
import { MdEdit } from "react-icons/md";

const UserTasks = () => {

    const {id,username} = useParams()

    const[editedData,seteditedData] = useState({});
    const[formData,setFormData] = useState({});
    const[tasks,setTasks] = useState([]);
    const[taskKey,settaskKey] = useState(null);
    console.log(tasks)
    console.log(tasks)
    
    useEffect(()=>{
        const getUserData = async()=>{
            try {
                const res = await fetch(`https://task-api-vf9d.vercel.app/api/getTask/${id}`,{
                method:'GET',
                headers:{
                    'Content-Type':'application/json'
                }
            })
            const data = await res.json()
            console.log(data)
            setTasks(data);
            console.log('compiling')

            } catch (error) {
                console.log(error)
            }
        }

        getUserData()
        
    },[])

  const handleChange = (e) => {
    if (e.target.type === 'checkbox') {
        setFormData({...formData, priority: e.target.checked});
    } else {
        setFormData({...formData, [e.target.id]: e.target.value});
    }
};


    const handleSubmit = async(e)=>{
        e.preventDefault()
        const completeData = {
            ...formData,
            createdFor: id
        }

        console.log(completeData)

        try {
            const res = await fetch('https://task-api-vf9d.vercel.app/api/newTask',{
                method:'POST',
                headers:{
                    'Content-Type':'application/json',
                },
                body:JSON.stringify(completeData)
            })

            const data = await res.json();
            console.log(data)
            if(res.ok)
            {
                // setTasks(tasks.filter(task => task._id !== null));
                setTasks([...tasks, data]);
                console.log(formData)
                setFormData({})
                // window.location.reload()
            }

            // console.log(data);

        } catch (error) {
            console.log(error)
        }
    }

    const handleEditChange = (e)=>{
        seteditedData({...editedData,[e.target.id]:e.target.value});
    }

    const handleReAssign = async(id)=>{

        try {
            const res = await fetch(`https://task-api-vf9d.vercel.app/api/reAssignTask/${id}`,{
                method:'PUT',
                headers:{
                    'Content-Type':'application/json',
                },
                body:JSON.stringify({completed: false})
            })
            const data = await res.json();
            if(res.ok)
            {
                // console.log(data)
                setTasks(prevTasks => prevTasks.map(task=> task._id === id ? data : task));    
                // window.location.reload()
            }
            
        } catch (error) {
            console.log(error)
        }

    }

     const handleEdit = async(id)=>{
        // e.preventDefault()
        settaskKey(id)
        try {
            const res = await fetch(`https://task-api-vf9d.vercel.app/api/editTask/${id}`,{
                method:'PUT',
                headers:{
                    'Content-Type':'application/json',
                },
                body:JSON.stringify(editedData)
            })

            const data = await res.json();
            console.log(data)
            // console.log(data);
            if(res.ok)
            {
                setTasks(prevTasks => prevTasks.map(task => task._id === id ? data : task));    
                settaskKey(null)
            }

        } catch (error) {
            console.log(error)
        }
    }

     const handleDelete = async(id)=>{
        
        try {
            const res = await fetch(`https://task-api-vf9d.vercel.app/api/deleteTask/${id}`,{
            method:'DELETE',
            headers:{
                'Content-Type':'application/json'
            },
            
        })
        const data = await res.json()
        console.log(data)
        if(res.ok)
        {
            setTasks(tasks.filter(task => task._id !== id));
            console.log('task deleted successfully')
        }

        } catch (error) {
            console.log(error.message)
        }
    }

    const convertToIST = (utcTimeString) => {
        const ISTOffset = 330; // IST is UTC+5:30
        const utcTime = new Date(utcTimeString);
        const ISTTime = new Date(utcTime.getTime() + (ISTOffset * 60000)); // Add offset in milliseconds
        return ISTTime;
    };
  
    return (
        <div className='pt-8'>
            <h1 className='text-xl underline font-semibold text-center'>{username}'s tasks</h1>
            <div className="w-5/6 mt-[60px] mb-[50px]  grid grid-cols-1 lg:grid-cols-3 lg:gap-9 md:grid-cols-2 mx-auto gap-6">
                {/* Task mapping */}
                {tasks.map((task) => (
                    <div className="w-[320px] mx-auto bg-[#101827] shadow-lg border-gray-300 rounded-[8px] h-[280px] border" key={task._id}>
                        {

                            // when we want to edit the task

                            taskKey === task._id ? (
                                <div className="w-ful h-full flex rounded-[8px] shadow-sm border-[2px]">
                                    <div className="flex flex-col justify-center p-4">
                                        <form action="">
                                            <input
                                                defaultValue={task.title}
                                                type="text"
                                                id="title"
                                                onChange={handleEditChange}
                                                placeholder="Enter task title"
                                                className="border w-full text-gray-200 bg-[#101827] w-[240px] rounded p-2 mb-2"
                                            />
                                            <textarea
                                                defaultValue={task.content}
                                                id="content"
                                                placeholder="Enter task description"
                                                onChange={handleEditChange}
                                                className="border w-full text-gray-200 bg-[#101827] w-[240px] rounded p-2 mb-2"
                                            ></textarea>
                                            {task.deadline && (
                                            <input
                                                defaultValue={new Date(task.deadline).toISOString().substring(0, 16)}
                                                type="datetime-local"
                                                id="deadline"
                                                onChange={handleEditChange}
                                                className="px-8 text-gray-200 bg-gray-600 rounded-[20px] text-center my-1 py-2"
                                            />
                                    )}
                                        </form>

                                        <button
                                            onClick={() => handleEdit(task._id)}
                                            className="bg-blue-500 hover:bg-blue-700 mt-1 rounded-[9px] text-white px-4 py-2 rounded"
                                        >
                                            Update Task
                                        </button>
                                    </div>
                                </div>
                            ) : (
                            
                                // our tasks

                                <div className=" flex flex-col p-4">
                                    <div>
                                        <div className='h-[180px]'>
                                            <h1 className="text-center italic text-[#CEAD76] text-lg font-bold pt-2 pb-2">{task.title}
                                                {
                                                    task.priority && (
                                                        <span className='text-red-600 pl-2 text-sm'>(prioritize)</span>
                                                    )
                                                }
                                            </h1>
                                            <hr/>
                                            <p className="pt-3 overflow-hidden h-[125px] overflow-y-scroll text-gray-200">{task.content}</p>
                                        </div>
                                        <hr className='w-full' />

                                     {
                                        task.completed === false ? (
                                            <div className='text-center text-gray-200 mx-auto pt-2 w-full'>
                                            Deadline :
                                            <span className='pl-2'>
                                                {new Date(task.deadline).toLocaleDateString()}
                                            </span>
                                            <span className='pl-2'>
                                                {new Date(task.deadline).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                            </span>
                                        </div>
                                        ):(
                                            <h1 className='text-center text-sm text-gray-200 pt-2'> Completed at : 
                                                {
                                                    new Date(task.completeTime).toLocaleDateString()+' '+convertToIST(task.completeTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                                                }
                                            </h1>
                                        )
                                    }

                                        
                                    </div>
                                    <div className=" mx-auto pt-[4px] w-4/5 bottom-2">
                                        <div className="flex flex-row justify-around items-center">
                                            <button
                                                onClick={() => handleReAssign(task._id)}
                                                className="bg-blue-500 hover:bg-blue-700 mt-1 text-sm rounded-[9px] text-white px-4 py-2 rounded"
                                            >
                                                <MdAutorenew />
                                            </button>
                                            <button type='button'
                                                onClick={()=>settaskKey(task._id)}
                                                className="bg-blue-500 hover:bg-blue-700 mt-1 text-sm rounded-[9px] text-white px-4 py-2 rounded"
                                            >
                                                <MdEdit />
                                            </button>
                                            <button
                                                onClick={() => handleDelete(task._id)}
                                                className="bg-blue-500 font-bold hover:bg-blue-700 mt-1 text-sm rounded-[9px] text-white px-4 py-2 rounded"
                                            >
                                                <AiOutlineDelete />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            )}
                    </div>
                ))}
                {/* Create new task form */}
               
                
            </div>
            <hr className=''/>
            <div className='mx-auto '>
                 <h1 className='text-center font-bold text-lg italic pb-4 underline'>Create a new task</h1>
                <div className="w-[320px] mx-auto text-gray-200 bg-[#101827] h-[280px] rounded-[8px] shadow-sm border-[2px]">
                    <div className=" flex flex-col justify-center p-4">
                        <form onSubmit={handleSubmit} action="">
                            <input
                                type="text"
                                id="title"
                                onChange={handleChange}
                                placeholder="Enter task title"
                                className="border text-gray-200 bg-[#101827] hover:cursor-pointer w-full rounded p-2 mb-2"
                            />
                            <textarea id="content" placeholder="Enter task description" onChange={handleChange} className="border text-gray-200 bg-[#101827] rounded w-full p-2 mb-2"></textarea>
                            <div className='flex flex-col justify-center'>
                                <div className='flex mx-auto pb-2 flex-row gap-2'>
                                    <input onClick={handleChange} type="checkbox"/>
                                    <span className='text-gray-400'>prioritize</span>
                                </div>
                                <input id='deadline' onChange={handleChange} className='bg-gray-800 rounded-[5px] text-center bg-[#101827]' type="datetime-local" />
                            </div>
                        </form>
                        <button
                            onClick={handleSubmit}
                            className="bg-blue-500 mt-4 hover:bg-blue-700 mt-1 rounded-[9px] text-white px-4 py-2 rounded"
                        >
                            Create Task
                        </button>
                    </div>
                </div>
               </div>
            
        </div>
    )
}

export default UserTasks
