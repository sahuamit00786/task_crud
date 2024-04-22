import { useSelector, useDispatch } from "react-redux"
import { Link, useNavigate } from "react-router-dom"
import { setDeleteUser } from "../store/UserSlice"

const Header = () => {

  const{currentUser} = useSelector((state)=>state.user) 
  const navigate = useNavigate();
  const dispatch = useDispatch()

  const token = localStorage.getItem('token');

  const handleSignOut = async()=>{
    try {
        const res = await fetch('https://task-api-9cyg.onrender.com/api/signout',{
        method:'POST',
        headers:{
            'Content-Type':'application/json',
            'Authorization':`Bearer ${token}`
        }
    })
    const data = await res.json();
    
    // console.log(data)
    if(!res.ok)
    {
        console.log('not able to sign out')
    }
    else{
        dispatch(setDeleteUser())
        localStorage.removeItem('token')
        navigate('/')
    }
    } catch (error) {
        console.log(error)
    }
  }

  return (
    <div>
        <div className="flex items-center justify-between">
            <div className="flex items-center">
                <Link to="/">
                    <img src='https://images.pexels.com/photos/313690/pexels-photo-313690.jpeg?auto=compress&cs=tinysrgb&w=800' alt="logo" className="w-35 m-3 h-20" />
                </Link>
            </div>
            <div className="flex text-[#A18A30] hover:text-[#B28A50] font-semibold text-[15px] sm:text-s gap-5 sm:gap-9 sm:gap-12 pr-[40px] md:pr-[80px] items-center">
                <Link to="/">
                    <button className="hover:text-[#E28A50]">Home</button>
                </Link>
                {
                    currentUser?
                    <Link>
                        <button onClick={handleSignOut} className="hover:text-[#E28A50]">Sign out</button>
                    </Link>
                    :
                    <Link to="/signin">
                        <button className="hover:text-[#E28A50]">Sign in</button>
                    </Link>
                }
                {
                    currentUser?
                    (''):(
                    <>
                        <Link to="/signout">
                        <button className="hover:text-[#E28A50]">Sign up</button>
                    </Link>
                    </>
                    )
                }
                {
                    currentUser && currentUser.isAdmin?(
                        <Link to="/assignTasks">
                            <button className="hover:text-[#E28A50] text-orange-300 bg-[#101827] py-1 px-5 rounded-[10px]">Assign Task</button>
                        </Link>
                    ):(
                        <Link to="/tasks">
                          <button className="hover:text-[#E28A50] text-orange-300 bg-[#101827] py-1 px-5 rounded-[10px]">Your Task</button>
                        </Link>
                    )
                }
                
            </div>
        </div>
    </div>
  )
}

export default Header
