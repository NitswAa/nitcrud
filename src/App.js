import React, { useEffect, useState } from "react";
import Task from './components/Task'
import PostForm from './components/PostForm'


export default function App() {
  const [list, setList] = useState([{task_id: -1, content: 'Loading', complete: false}])

  function addToList(newTask) {
    setList(prev => [...prev, newTask])
  }

  function removeFromList(oldTaskID) {
    setList(prev => prev.filter( task => ( task.task_id !== oldTaskID )) )
  }

  function updateList(curTask) {
    // Find index of element to update
    const index = list.map( task => task.task_id ).indexOf(curTask.task_id)
    setList(prev => [...prev.slice(0, index), curTask, ...prev.slice(index + 1)])
  }

  // GET data from API server
  // Why does this run like 4 times lol
  // The dependencies array is clearly set to empty...
  useEffect(() => {
    fetch('http://localhost:3001/api')
      .then(res => res.json()
      .then(data => {setList(data)}))
  }, [])

  console.log(list)

  return (
    <div className="app">

      <PostForm addFunction={addToList} />

      {list.length !== 0 && 
        <ul className='task-list'>
          {list.map((task) => (
            <li key={task.task_id}>
              <Task 
                task_id={task.task_id} 
                content={task.content} 
                complete={task.complete}
                removeFromList={removeFromList}
                updateList={updateList}
              />
            </li>
            ))}
        </ul>
    }
    </div>
  );
}
