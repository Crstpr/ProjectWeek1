import React, { useEffect, useRef, useState } from 'react';
import todo from '../assets/calendar.png';
import Items from './Items';


const ToDo = () => {
  const [TaskList, setTaskList] = useState([]);
  const inputRef = useRef();

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await fetch("http://localhost:5000/todo");
        const data = await response.json();
        setTaskList(data);
      } catch (err) {
        console.error(err.message);
      }
    };

    fetchTasks();
  }, []);

  const add = async () => {
    const inputText = inputRef.current.value.trim();
    if (inputText === "") return;

    const newTask = { description: inputText, isComplete: false };

    try {
      const response = await fetch("http://localhost:5000/todo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newTask),
      });

      const savedTask = await response.json();
      setTaskList((prev) => [...prev, savedTask]);
      inputRef.current.value = "";
    } catch (err) {
      console.error(err.message);
    }
  };

  const deleteTask = async (id) => {
    try {
      await fetch(`http://localhost:5000/todo/${id}`, { method: "DELETE" });
      setTaskList((prev) => prev.filter((task) => task.todo_id !== id));
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  const toggle = async (id) => {
    const task = TaskList.find((task) => task.todo_id === id);
    if (!task) return;

    const updatedTask = { ...task, isComplete: !task.isComplete };

    try {
      await fetch(`http://localhost:5000/todo/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ description: updatedTask.description }),
      });

      setTaskList((prev) =>
        prev.map((task) => (task.todo_id === id ? updatedTask : task))
      );
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <div className='bg-white place-self-center w-11/12 max-w-md flex flex-col p-7 min-h-[550px] rounded-xl'>
      <div className='flex items-center mt-7 gap-2'>
        <img className='w-7' src={todo} alt="" />
        <h1 className='text-2xl font-bold'>To-Do List</h1>
      </div>

      <div className='flex items-center my-7 bg-gray-100 rounded-full'>
        <input ref={inputRef} className='bg-transparent border-none outline-none flex-1 h-14 pl-6 pr-2 placeholder:text-slate-600' type="text" placeholder='Add new task' />
        <button onClick={add} className='border-none rounded-full bg-neutral-400 w-24 h-14 text-white text-lg font-mono cursor-pointer'>Add +</button>
      </div>

      <div>
        {TaskList.map((item) => (
          <Items key={item.todo_id} text={item.description} id={item.todo_id} isComplete={item.isComplete} deleteTask={deleteTask} toggle={toggle} />
        ))}
      </div>
    </div>
  );
};

export default ToDo;

