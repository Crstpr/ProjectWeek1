import React, { useEffect, useState } from 'react'

const Clock = () => {
    const [time, setTime] = useState(new Date());


    useEffect(() => {
      const intervalId = setInterval(() => {
        setTime(new Date());
      }, 1000);
  
      return () => clearInterval(intervalId);
    }, []);
  
    return (
      <div>
        <br />
        <p className='text-slate-400 indent-8 font-mono'>{time.toLocaleTimeString()}</p>
        <p className='text-slate-400 indent-8 font-mono'>{time.toLocaleDateString()}</p>
      </div>
    );
}

export default Clock
