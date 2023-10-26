import React, { useEffect, useState } from "react";
import Task from './components/Task'
import PostForm from './components/PostForm'


export default function App() {
  const [list, setList] = useState([{id: -1, content: 'Loading', isChecked: false}])

  function addToList(newTask) {
    setList(prev => [...prev, newTask])
  }

  function removeFromList(oldTaskID) {
    setList(prev => prev.filter( task => ( task.id !== oldTaskID )) )
  }

  function updateList(curTask) {
    // Find index of element to update
    const index = list.map( task => task.id ).indexOf(curTask.id)
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
            <li key={task.id}>
              <Task 
                id={task.id} 
                content={task.content} 
                isChecked={task.isChecked}
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
