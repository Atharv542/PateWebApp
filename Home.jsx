import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useSearchParams } from 'react-router-dom'
import { addToPastes, updateToPastes } from '../redux/pasteSlice'

const Home = () => {
    const[title,setTitle]=useState('')
  
    const[value,setValue]=useState('')
    const [searchParams,setSearcheParams]=useSearchParams();
    const pasteId=searchParams.get('pasteId');
    const dispatch=useDispatch();
    const allPastes=useSelector((state)=>state.paste.pastes)
    function changeHandler(event){
        setTitle(event.target.value);
    }
    function changeHandler2(event){
        setValue(event.target.value);
    }
    useEffect(() => {
      if(pasteId){
        const paste=allPastes.find((p)=>
        p._id===pasteId)
        setTitle(paste.title)
        setValue(paste.content)
      }
    
      
    }, [pasteId])
    
    function createPaste(){
        const paste={
            title:title,
            content:value,
            _id:pasteId||Date.now().toString(36),
            createdAt:new Date().toISOString(),

        }
        if(pasteId){//agr pasteId h toh update krna chahte h
            dispatch(updateToPastes(paste));

        }
        else{// naya paste create krna h 
            dispatch(addToPastes(paste));
        }
        //after creation or updation
        setTitle('')
        setValue('')
        setSearcheParams({})

    }

  return (
    <div className=' bg-gray-800 h-screen'>
        <div className='flex gap-10 flex-row justify-center ml-28 '>
            <input
            className=' px-5 py-2.5 me-2 mb-2 rounded-md mt-2 w-[33%]  min-w-[500px] ml-20 bg-slate-300 '
            type='text'
            placeholder='Enter title here'
            value={title}
            onChange={changeHandler}


            />
            <button className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 mt-2 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700" onClick={createPaste}>
            {
                pasteId?"Update My Paste":"Create My Paste"
            }
            </button>
        </div>
        <div className='mt-8 flex place-items-center justify-center'>
            <textarea
                className='rounded-md bg-slate-300 min-w-[500px] p-4'
                value={value}
                onChange={changeHandler2}
                placeholder='Enter content here'
                rows={20}
            />
        </div>
    </div>
  )
}

export default Home