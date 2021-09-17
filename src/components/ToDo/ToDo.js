import React from 'react';
import style from './ToDo.module.css';
import generateID from '../../helpers/generateID';
import image from '../../assets/images/avatar.png'


class ToDo extends React.Component {

  state = {
    inpVal: "",
    ageVal: "",
    profVal: "",
    tasks: [],
    selectedTasks: new Set(),
  }

  handleChange = (e) => {
    this.setState({
      inpVal: e.target.value,
    })
  }

  handleChange1 = (e) => {
    this.setState({
      ageVal: e.target.value,
    })
  }

  handleChange2 = (e) => {
    this.setState({
      profVal: e.target.value,
    })
  }

  handleClick = (e) => {
    let { tasks } = this.state
    let inpVal = this.state.inpVal.trim();
    let ageVal = this.state.ageVal.trim();
    let profVal = this.state.profVal.trim();

    if (!inpVal) {
      return
    }

    const taskObject = {
      _id: generateID(),
      title: inpVal,
      age: ageVal,
      profession: profVal,
    }

    this.setState({
      tasks: [...tasks, taskObject],
      inpVal: "",
      ageVal: "",
      profVal: "",

    })
  }

  deleteTask = (taskId) => {
    const newTask = this.state.tasks.filter(item => taskId !== item._id);

    this.setState({
      tasks: newTask
    })
  }

  handleCheck = (taskId) => {
    const selectedTasks = new Set(this.state.selectedTasks);

    if (selectedTasks.has(taskId)) {
      selectedTasks.delete(taskId)
    } else {
      selectedTasks.add(taskId)
    }

    this.setState({
      selectedTasks
    })

    // console.log(selectedTasks)
  }

  removeTasks = () => {
    const { selectedTasks, tasks } = this.state;


    const newTasks = tasks.filter(task => {
      if (selectedTasks.has(task._id)) {
        return false;
      }

      return true;
    })


    this.setState({
      tasks: newTasks,
      selectedTasks: new Set()
    })
  }

  render() {
    const { tasks } = this.state;
    const list = tasks.map((item) => {
      return (
        <div key={item._id} className={style.listItem}>
          <input type="checkbox" className={style.check} onChange={() => this.handleCheck(item._id)} />
          <div>
            <img src={image} alt="" />
          </div>
          <div>
            <span>Name:</span>
            {item.title}
          </div>
          <div>
            <span>Age:</span>
            {item.age}
          </div>
          <div>
            <span>Profession: </span>
            {item.profession}
          </div>
          <button onClick={() => this.deleteTask(item._id)} disabled={this.state.selectedTasks.size}>Delete</button>
        </div>
      )
    })

    return (
      <div className={style.frame}>
        <div className={style.innerFrame}>
          <div className={style.inpBlocks}>
            <h2>Add Name</h2>
            <input value={this.state.inpVal} onChange={this.handleChange} />
          </div>
          <div className={style.inpBlocks}>
            <h2>Add Age</h2>
            <input value={this.state.ageVal} onChange={this.handleChange1} />
          </div>
          <div className={style.inpBlocks}>
            <h2>Add Profession</h2>
            <input value={this.state.profVal} onChange={this.handleChange2} />
          </div>
          <button onClick={this.handleClick} disabled={this.state.selectedTasks.size}>Add Task</button>
          <div>
            <button className={style.danger} onClick={this.removeTasks} disabled={!this.state.selectedTasks.size}>Remove all Tasks</button>
          </div>
        </div>
        <div className={style.list}>
          {list}
        </div>
      </div>
    );
  }
}

export default ToDo