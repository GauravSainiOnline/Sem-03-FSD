import React, { useState } from 'react'
import './Todo.css';
function Todo() {
    const [tasks, setTasks] = useState([]);
    const [currTask, setCurrTask] = useState('');
    const handleChange = (e) => {
        setCurrTask(e.target.value);
    }
    const handleSubmit = () => {
        if (currTask.trim() == '') {
            setCurrTask('');
            return;
        }
        setTasks([...tasks, { task: currTask, id: tasks.length + 1 }]);
        setCurrTask('');
    }
    const handleDelete = (id) => {
        let narr = tasks.filter((taskObj) => {
            return taskObj.id != id
        })
        setTasks([...narr]);
    }
    return (
        <div id="container">
            <h1>Todo App</h1>

            <div id="inputBox_taskContainer_wrapper">

                <div id="inputField_addButton">
                    <input type="text" value={currTask} name="" id="task" placeholder='Add task' onChange={handleChange} />
                    <button onClick={handleSubmit}>Add</button>
                </div>

                <ul id="tasks_container">

                    {tasks.length == 0 ? (
                        <p style={{textAlign: 'center', color: '#888', marginTop: '30px'}}>No tasks yet. Add a task to start!</p>
                    )
                        : (tasks.map((taskObj) => (
                            <li key={taskObj.id} className="task">
                                <p>{taskObj.task}</p>
                                <button onClick={() => handleDelete(taskObj.id)}>Delete</button>
                            </li>
                        ))
                        )
                    }
                </ul>

            </div>
        </div>
    )
}

export default Todo