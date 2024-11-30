import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { removeFromPastes } from '../redux/pasteSlice'
import { useEffect,useState} from 'react'
import toast from 'react-hot-toast'
import { FormatDate } from "../utlis/formatDate";


const Pastes = () => {
    const pastes= useSelector((state=>state.paste.pastes))//in order to fetch data from state of all paste 
    const dispatch=useDispatch()
    const [searchTerm,setSearchTerm]=useState('') // for data that is to be stored
    const filterData=pastes.filter((paste)=>
    paste.title.toLowerCase().includes(searchTerm.toLowerCase())); // in order to filter that the search paste is available or not
    function changeHandler(event){
        setSearchTerm(event.target.value)
    }
    function handleDelete(pasteId){
          dispatch(removeFromPastes(pasteId))
    }
  return (
    <div className='bg-slate-800 h-screen flex flex-col gap-y-3'>
        <div className="w-full flex gap-3 px-4 py-2  rounded-[0.3rem]   mt-6">
        <input
            className='p-2 rounded-xl min-w-[700px] mt-5 mx-auto'
            type="search"
            placeholder='Search Here'
            value={searchTerm}
            onChange={changeHandler}
        />
        </div>
      
        <div className="flex flex-col border border-[rgba(128,121,121,0.3)] py-4 rounded-[0.4rem]">
            <h2 className="px-4 text-white text-4xl font-bold  pb-4">
                 All Pastes
            </h2>
            <div className="w-full px-4 pt-4 flex  flex-col gap-y-5">
            {
                filterData.length>0? (
                    filterData.map(
                    (paste)=>{
                        return(
                            <div className="border border-[rgba(128,121,121,0.3)] w-full gap-y-6 justify-between flex flex-col sm:flex-row p-4 rounded-[0.3rem]" key={paste?._id}>
                                <div className="w-[50%] flex flex-col space-y-3" >
                                    <p className="text-4xl font-semibold text-white" >{paste.title}</p>
                                    <p className="text-md text-white font-normal line-clamp-3 max-w-[80%] bold">{paste.content}</p>
                                </div>
                                <div className="flex flex-col gap-y-10 sm:items-end">
                                <div  className="flex gap-4 flex-wrap sm:flex-nowrap">
                                    <button className="p-2 rounded-[0.2rem] bg-slate-grey-800 text-white border border-orange-500  hover:bg-transparent group hover:border-blue-500">
                                     <a href={`/?pasteId=${paste?._id}`}>Edit</a>
                                     

                                     </button>
                                    <button className="p-2 rounded-[0.2rem] text-white bg-slate-grey-800 border border-orange-500  hover:bg-transparent group hover:border-blue-500">
                                     <a href={`/pastes/${paste?._id}`}>View</a>
                                     
                                    </button>
                                    <button className="p-2 rounded-[0.2rem] bg-slate-grey-800 border border-orange-500 text-white hover:bg-transparent group hover:border-blue-500" onClick={()=>handleDelete(paste?._id)}>Delete</button>
                                    <button className="p-2 rounded-[0.2rem] bg-slate-grey-800 border border-orange-500 text-white hover:bg-transparent group hover:border-blue-500" onClick={()=>{
                                        navigator.clipboard.writeText(paste?.content)
                                        toast.success("Copied to clipboard successfully")
                                        
                                    }}>Copy</button>
                                    {/*<button className="p-2 rounded-[0.2rem] bg-slate-grey-800 text-white border border-orange-500  hover:bg-transparent group hover:border-blue-500">
                                        <a href="https">Share</a>
                                    </button>*/}
                                    
                                </div>
                                </div>
                                
                                
                                <div className="text-white" size={20} >
                                    {FormatDate(paste.createdAt)}
                                </div>
                            </div>
                        )
                    }
                )
                ):(
                    <div className="text-2xl text-white text-center w-full text-chileanFire-500">
                        No Data Found
                    </div>
                )
                
             }
            </div>
             
        </div>
    </div>
  )
}

export default Pastes