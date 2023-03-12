import React, {useState} from 'react';
import style from './ToDo.module.css';
import generateID from '../../helpers/generateID';
import List from "../List/List";
import CustomInput from "../CustomInput/CustomInput";
import {store} from "../store/store";

const {inputState} = store

const ToDo = () => {
    const initialState = {
        name: "",
        age: "",
        profession: "",
    }
    const [state, setState] = useState(initialState);
    const [tasks, setTasks] = useState([]);
    const [selectedTasks, setSelectedTasks] = useState(new Set());

    const handleChange = (e) => {
        const {name, value} = e.target
        setState(state => {
            return {
                ...state,
                [name]: value,
            }

        })
    }

    const handleClick = () => {

        const inpVal = state.name.trim();
        const ageVal = state.age.trim();
        const profVal = state.profession.trim();

        if (!inpVal) {
            return
        }

        const taskObject = {
            _id: generateID(),
            name: inpVal,
            age: ageVal,
            profession: profVal,
        }

        setTasks(tasks => [...tasks, taskObject]);
        setState(initialState)
    }

    const deleteTask = (taskId) => {
        const newTask = tasks.filter(item => taskId !== item._id);
        setTasks(newTask)
    }

    const handleCheck = (taskId) => {
        const selectTasks = new Set(selectedTasks);

        if (selectTasks.has(taskId)) {
            selectTasks.delete(taskId)
        } else {
            selectTasks.add(taskId)
        }

        setSelectedTasks(selectTasks)
    }

    const removeTasks = () => {
        const newTasks = tasks.filter(task => !selectedTasks.has(task._id))
        setTasks(newTasks)
        setSelectedTasks(new Set())
    }


    return (
        <div className={style.frame}>
            <div className={style.innerFrame}>
                {
                    inputState.map(el => {
                        return (
                            <React.Fragment key={el.id}>
                                <CustomInput
                                    title={el.title}
                                    value={state[el.name]}
                                    name={el.name}
                                    handleChange={handleChange}
                                />
                            </React.Fragment>
                        )
                    })
                }
                <button
                    onClick={handleClick}
                    disabled={selectedTasks.size}
                >
                    Add Task
                </button>
                {
                    tasks.length > 0 &&
                    <div>
                        <button
                            className={style.danger}
                            onClick={removeTasks}
                            disabled={!selectedTasks.size}
                        >
                            Remove all Tasks
                        </button>
                    </div>
                }
            </div>
            {
                tasks.length > 0 &&
                <div className={style.list}>
                    <List
                        items={tasks}
                        length={selectedTasks.size}
                        handleCheck={handleCheck}
                        handleDelete={deleteTask}
                    />
                </div>
            }
        </div>
    );
}

export default ToDo