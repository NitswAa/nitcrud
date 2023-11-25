import React, { useEffect, useState } from "react";
import Task from './components/Task'
import PostForm from './components/PostForm'

// const apiURL = 'http://localhost:3001/api';
const apiURL = 'http://172.17.0.3:3001/api';

export default function App() {
  const [tasks, setTasks] = useState([{task_id: -1, content: 'Loading', complete: false}])

  function addTask(newTask) {
    setTasks(prev => [...prev, newTask])
  }

  function removeTask(oldTaskID) {
    setTasks(prev => prev.filter( task => ( task.task_id !== oldTaskID )) )
  }

  function updateTask(curTask) {
    const index = tasks.map( task => task.task_id ).indexOf(curTask.task_id)
    setTasks(prev => [...prev.slice(0, index), curTask, ...prev.slice(index + 1)])
  }

  useEffect(() => {
    fetch(apiURL)
      .then(res => res.json()
      .then(db_tasks => {setTasks(db_tasks)}))
  }, [])

  console.log(tasks)

  return (
    <div className="app">

      <PostForm addTask={addTask} />

      {tasks.length !== 0 && 
        <ul className='task-list'>
          {tasks.map((task) => (
            <li key={task.task_id}>
              <Task 
                task_id={task.task_id} 
                content={task.content} 
                complete={task.complete}
                removeTask={removeTask}
                updateTask={updateTask}
              />
            </li>
            ))}
        </ul>
    }
    </div>
  );
}
