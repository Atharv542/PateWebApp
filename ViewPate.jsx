import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams, useSearchParams } from 'react-router-dom'
import { addToPastes, updateToPastes } from '../redux/pasteSlice'



const ViewPate = () => {
  const {id}=useParams();
  const allPastes=useSelector((state)=>state.paste.pastes);
  const paste=allPastes.filter((p)=>p._id===id)[0];
  return (
    <div className=' bg-gray-800 h-screen'>
        <div className='flex gap-7 flex-row justify-center'>
            <input
            className=' px-5 py-2.5 me-2 mb-2 rounded-md mt-2 w-[33%]  min-w-[500px] ml-2 bg-slate-300 '
            type='text'
            placeholder='Enter title here'
            value={paste.title}
            disabled
            //onChange={changeHandler}


            />
            {/*<button className='p-2 rounded-md  mt-2 ' onClick={createPaste}>
            {
                pasteId?"Update My Paste":"Create My Paste"
            }
            </button>*/}
        </div>
        <div className='mt-8 flex place-items-center justify-center'>
            <textarea
                className='rounded-md bg-slate-300 min-w-[500px] p-4'
                value={paste.content}
                disabled
                //onChange={changeHandler2}
                placeholder='Enter content here'
                rows={20}
            />
        </div>
    </div>
  )
}

export default ViewPate