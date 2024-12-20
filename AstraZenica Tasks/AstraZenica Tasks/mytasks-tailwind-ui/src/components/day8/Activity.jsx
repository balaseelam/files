import React, { useState } from 'react';
import { useRecoilState } from 'recoil';
import { FaArrowAltCircleRight } from 'react-icons/fa'; // Importing right arrow icon
import { MdOutlineSelectAll } from "react-icons/md";
import { activeTasksState, inProgressTasksState, completedTasksState } from '@Components/day8/ActivityState';

function Activity() {
    const [taskName, setTaskName] = useState('');
    const [activeTasks, setActiveTasks] = useRecoilState(activeTasksState);
    const [inProgressTasks, setInProgressTasks] = useRecoilState(inProgressTasksState);
    const [completedTasks, setCompletedTasks] = useRecoilState(completedTasksState);

    const handleAddTask = () => {
        if (taskName.trim() === '') return;
        setActiveTasks([...activeTasks, { name: taskName }]);
        setTaskName('');
    };

    const handleDragStart = (e, task, column) => {
        e.dataTransfer.setData('task', JSON.stringify({ task, column }));
    };

    const handleDragOver = (e) => {
        e.preventDefault();
    };

    const handleDrop = (e, targetColumn) => {
        e.preventDefault();
        const data = e.dataTransfer.getData('task');
        const { task, column } = JSON.parse(data);

        if (column === targetColumn) return;

        // Remove the task from the source column
        let updatedActiveTasks = [...activeTasks];
        let updatedInProgressTasks = [...inProgressTasks];
        let updatedCompletedTasks = [...completedTasks];

        switch (column) {
            case 'active':
                updatedActiveTasks = activeTasks.filter((t) => t.name !== task.name);
                break;
            case 'inProgress':
                updatedInProgressTasks = inProgressTasks.filter((t) => t.name !== task.name);
                break;
            case 'completed':
                updatedCompletedTasks = completedTasks.filter((t) => t.name !== task.name);
                break;
            default:
                break;
        }

        // Add the task to the target column
        switch (targetColumn) {
            case 'active':
                updatedActiveTasks.push(task);
                break;
            case 'inProgress':
                updatedInProgressTasks.push(task);
                break;
            case 'completed':
                updatedCompletedTasks.push(task);
                break;
            default:
                break;
        }

        // Update the state with the new arrays
        setActiveTasks(updatedActiveTasks);
        setInProgressTasks(updatedInProgressTasks);
        setCompletedTasks(updatedCompletedTasks);
    };

    const moveSelectedTasks = (sourceColumn, targetColumn) => {
        // Get selected tasks from the source column
        let selectedTasks = [];
        switch (sourceColumn) {
            case 'active':
                selectedTasks = activeTasks.filter((task) => task.selected);
                break;
            case 'inProgress':
                selectedTasks = inProgressTasks.filter((task) => task.selected);
                break;
            default:
                break;
        }

        // Update the source column without the selected tasks
        switch (sourceColumn) {
            case 'active':
                setActiveTasks(activeTasks.filter((task) => !task.selected));
                break;
            case 'inProgress':
                setInProgressTasks(inProgressTasks.filter((task) => !task.selected));
                break;
            default:
                break;
        }

        // Move selected tasks to the target column
        switch (targetColumn) {
            case 'inProgress':
                setInProgressTasks([...inProgressTasks, ...selectedTasks]);
                break;
            case 'completed':
                setCompletedTasks([...completedTasks, ...selectedTasks]);
                break;
            default:
                break;
        }
    };

    const selectAllTasks = (column) => {
        let allTasks = [];
        switch (column) {
            case 'active':
                allTasks = activeTasks.map((task) => ({ ...task, selected: !task.selected }));
                setActiveTasks(allTasks);
                break;
            case 'inProgress':
                allTasks = inProgressTasks.map((task) => ({ ...task, selected: !task.selected }));
                setInProgressTasks(allTasks);
                break;
            case 'completed':
                allTasks = completedTasks.map((task) => ({ ...task, selected: !task.selected }));
                setCompletedTasks(allTasks);
                break;
            default:
                break;
        }
    };




    return (
        <div className='bg-gray-200'>
            <div className='flex justify-center items-center mt-4'>
                <input
                    className='m-1 max-h-10 p-2 max-w-64 border-2 border-black shadow-lg'
                    placeholder='Add here'  
                    value={taskName}
                    onChange={(e) => setTaskName(e.target.value)}
                />
                <button className='bg-green-500 h-10 w-16 rounded-md' onClick={handleAddTask}>Add</button>
            </div>
            <div className="m-1 grid grid-cols-3 gap-1 h-[500px] w-[100%]">
                <div className="border border-gray-300 p-4 relative" onDragOver={(e) => handleDragOver(e)} onDrop={(e) => handleDrop(e, 'active')}>
                    <h2 className="font-bold mb-2">Active:</h2>
                    <MdOutlineSelectAll className="text-xl cursor-pointer absolute top-2 right-2" onClick={() => selectAllTasks('active')} />
                    {activeTasks.map((task, index) => (
                        <div key={index} draggable onDragStart={(e) => handleDragStart(e, task, 'active')} className="flex items-center">
                            <input type="checkbox" className="mr-2" checked={task.selected} onChange={(e) => {
                                const isChecked = e.target.checked;
                                setActiveTasks(activeTasks.map((t, i) => (i === index ? { ...t, selected: isChecked } : t)));
                            }} />
                            <span className={`m-1 p-1 rounded-lg w-44 text-start font-serif ${task.selected ? 'bg-[#00FF00]' : 'bg-[#00FF00]'}`}>{task.name}</span>
                        </div>
                    ))}
                    <FaArrowAltCircleRight className="text-2xl text-gray-600 absolute top-1/2 transform -translate-y-1/2 right-0 hover:bg-green-500" onClick={() => moveSelectedTasks('active', 'inProgress')} />
                </div>

                <div className="border border-gray-300 p-4 relative" onDragOver={(e) => handleDragOver(e)} onDrop={(e) => handleDrop(e, 'inProgress')}>
                    <h2 className="font-bold mb-2">In Progress:</h2>
                    <MdOutlineSelectAll className="text-xl cursor-pointer absolute top-2 right-2" onClick={() => selectAllTasks('inProgress')} />
                    {inProgressTasks.map((task, index) => (
                        <div key={index} draggable onDragStart={(e) => handleDragStart(e, task, 'inProgress')} className="flex items-center">
                            <input type="checkbox" className="mr-2" checked={task.selected} onChange={(e) => {
                                const isChecked = e.target.checked;
                                setInProgressTasks(inProgressTasks.map((t, i) => (i === index ? { ...t, selected: isChecked } : t)));
                            }} />
                            <span className='m-1 p-1 rounded-lg w-44 text-start font-serif bg-[#FFA500]'>{task.name}</span>
                        </div>
                    ))}
                    <FaArrowAltCircleRight className="text-2xl text-gray-600 absolute top-1/2 transform -translate-y-1/2 right-0  hover:bg-green-500" onClick={() => moveSelectedTasks('inProgress', 'completed')} />
                </div>

                <div className="border border-gray-300 p-4" onDragOver={(e) => handleDragOver(e)} onDrop={(e) => handleDrop(e, 'completed')}>
                    <h2 className="font-bold mb-2">Completed:</h2>
                    <MdOutlineSelectAll className="text-xl cursor-pointer absolute mt-1 top-32 right-1" onClick={() => selectAllTasks('completed')} />
                    {completedTasks.map((task, index) => (
                        <div key={index} draggable onDragStart={(e) => handleDragStart(e, task, 'completed')} className="flex items-center">
                            <input type="checkbox" className="mr-2" checked={task.selected} onChange={(e) => {
                                const isChecked = e.target.checked;
                                setCompletedTasks(completedTasks.map((t, i) => (i === index ? { ...t, selected: isChecked } : t)));
                            }} />
                            <span className='m-1 p-1 rounded-lg w-44 text-start font-serif bg-[#1E90FF]'>{task.name}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Activity;



// import React, { useState } from 'react';
// import { useRecoilState } from 'recoil';
// import { FaArrowAltCircleRight } from 'react-icons/fa'; // Importing right arrow icon
// import { activeTasksState, inProgressTasksState, completedTasksState } from '@Components/day8/ActivityState'

// function Activity() {
//     const [taskName, setTaskName] = useState('');
//     const [activeTasks, setActiveTasks] = useRecoilState(activeTasksState);
//     const [inProgressTasks, setInProgressTasks] = useRecoilState(inProgressTasksState);
//     const [completedTasks, setCompletedTasks] = useRecoilState(completedTasksState);

//     const handleAddTask = () => {
//         if (taskName.trim() === '') return;
//         setActiveTasks([...activeTasks, { name: taskName }]);
//         setTaskName('');
//     };

//     const handleDragStart = (e, task, column) => {
//         e.dataTransfer.setData('task', JSON.stringify({ task, column }));
//     };

//     const handleDragOver = (e) => {
//         e.preventDefault();
//     };

//     const handleDrop = (e, targetColumn) => {
//         e.preventDefault();
//         const data = e.dataTransfer.getData('task');
//         const { task, column } = JSON.parse(data);
    
//         if (column === targetColumn) return;
    
//         // Remove the task from the source column
//         let updatedActiveTasks = [...activeTasks];
//         let updatedInProgressTasks = [...inProgressTasks];
//         let updatedCompletedTasks = [...completedTasks];
    
//         switch (column) {
//             case 'active':
//                 updatedActiveTasks = activeTasks.filter((t) => t.name !== task.name);
//                 break;
//             case 'inProgress':
//                 updatedInProgressTasks = inProgressTasks.filter((t) => t.name !== task.name);
//                 break;
//             case 'completed':
//                 updatedCompletedTasks = completedTasks.filter((t) => t.name !== task.name);
//                 break;
//             default:
//                 break;
//         }
    
//         // Add the task to the target column
//         switch (targetColumn) {
//             case 'active':
//                 updatedActiveTasks.push(task);
//                 break;
//             case 'inProgress':
//                 updatedInProgressTasks.push(task);
//                 break;
//             case 'completed':
//                 updatedCompletedTasks.push(task);
//                 break;
//             default:
//                 break;
//         }
    
//         // Update the state with the new arrays
//         setActiveTasks(updatedActiveTasks);
//         setInProgressTasks(updatedInProgressTasks);
//         setCompletedTasks(updatedCompletedTasks);
//     };
    
    
    

//     return (
//         <div>
//             <div className='flex justify-center items-center mt-4'>
//                 <input
//                     className='m-1 h-10 p-2 w-64 border-2 border-black shadow-lg'
//                     placeholder='Add here'
//                     value={taskName}
//                     onChange={(e) => setTaskName(e.target.value)}
//                 ></input>
//                 <button className='bg-green-500 h-10 w-16 rounded-md' onClick={handleAddTask}>Add</button>
//             </div>
//             <div className="m-1 grid grid-cols-3 gap-1 h-[500px] w-[100%]">
//                 <div className="border border-gray-300 p-4 relative" onDragOver={(e) => handleDragOver(e)} onDrop={(e) => handleDrop(e, 'active')}>
//                     <h2 className="font-bold mb-2">Active:</h2>
//                     {activeTasks.map((task, index) => (
//                         <div key={index} draggable onDragStart={(e) => handleDragStart(e, task, 'active')} className="flex items-center">
//                             <input type="checkbox" className="mr-2" />
//                             <span>{task.name}</span>
//                         </div>
//                     ))}
//                     <FaArrowAltCircleRight className="text-2xl text-gray-600 absolute top-1/2 transform -translate-y-1/2 right-0 hover:bg-green-500" />
//                 </div>
                    
//                 <div className="border border-gray-300 p-4 relative" onDragOver={(e) => handleDragOver(e)} onDrop={(e) => handleDrop(e, 'inProgress')}>
//                     <h2 className="font-bold mb-2">In Progress:</h2>
//                     {inProgressTasks.map((task, index) => (
//                         <div key={index} draggable onDragStart={(e) => handleDragStart(e, task, 'inProgress')} className="flex items-center">
//                             <input type="checkbox" className="mr-2" />
//                             <span>{task.name}</span>
//                         </div>
//                     ))}
//                     <FaArrowAltCircleRight className="text-2xl text-gray-600 absolute top-1/2 transform -translate-y-1/2 right-0  hover:bg-green-500" />
//                 </div>
                    
//                 <div className="border border-gray-300 p-4" onDragOver={(e) => handleDragOver(e)} onDrop={(e) => handleDrop(e, 'completed')}>
//                     <h2 className="font-bold mb-2">Completed:</h2>
//                     {completedTasks.map((task, index) => (
//                         <div key={index} draggable onDragStart={(e) => handleDragStart(e, task, 'completed')} className="flex items-center">
//                             <input type="checkbox" className="mr-2" />
//                             <span>{task.name}</span>
//                         </div>
//                     ))}
//                 </div>
//             </div>
//         </div>
//     );
// }

// export default Activity;
