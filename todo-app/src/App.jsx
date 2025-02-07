import React from 'react'
import ToDo from './components/ToDo'
import Clock from './components/Clock'

const App = () => {
  return (
    <div className='bg-slate-800 grid py-2 min-h-screen'>
      <Clock/>

      <ToDo/>

    </div>
  )
}

export default App
