import React from 'react'
import check from '../assets/non-tick.png'
import none from '../assets/tick-mark.png'
import delete_logo from '../assets/delete.png'

const Items = ({text, id, isComplete, deleteTask, toggle}) => {
  return (
    <div className='flex items-center my-3 gap-2'>
      <div onClick={()=>{toggle(id)}} className='flex flex-1 items-center cursor-pointer'>
        <img src={isComplete ? none : check} alt="" className='w-3.5'/>
        <p className={`text-slate-600 ml-4 text-[15px] decoration-black ${isComplete ? "line-through" : ""}`}>{text}</p>
      </div>
      <img onClick={()=>{deleteTask(id)}}src={delete_logo} alt="" className='w-3.5 cursor-pointer'/>
    </div>
  )
}

export default Items
