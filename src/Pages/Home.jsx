import { useSelector } from "react-redux"
import { Link } from "react-router-dom"

const Home = () => {

  const{currentUser} = useSelector((state)=>state.user)

  return (
    <div className="flex flex-row  mt-[70px] justify-between">
      <div className="md:mt-6 w-1/2 px-[40px] md:px-[100px] lg:px-[153px]">
        <h1 className="sm:text-[40px] w-full text-[27px] md:text-[32px] sm:text-[20px] text-[#C28A50] pt-[30px] font-semibold">Let's map the tasks</h1>
        <p className="text-md sm:text-[18px] md:text-[20px] w-full mt-6">Focus, from work to play with the best to <br /> do list app.</p>
        {
          currentUser? <button className="hover:text-[#E28A50] duration-100 text-orange-200 text-sm sm:text-[15px] md:text-[18px] bg-[#101827] py-2 px-6 hover:bg-[#060C5B] rounded-[10px] mt-7"><Link to='/tasks'>Review your tasks</Link></button> : <button className="py-2 bg-[#C28A50] text-[14px] sm:text-[18px] mt-7 font-bold text-white hover:bg-blue-600 rounded-[10px] px-4 border"><Link to='/signin'>Login to continue</Link></button>
        }
      </div>
      <div className="w-1/2 flex justify-center items-center object-contain">
         <img src="https://www.cflowapps.com/wp-content/uploads/2018/07/task-management-process.png" alt="heroImg" />
      </div>
    </div>
  )
}

export default Home