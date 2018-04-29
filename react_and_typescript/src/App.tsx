// tslint:disable:no-console
import * as React from 'react';
import './App.css';

interface State { // this Interphase prevent any value in the constructor
  actualTask: string;
  tasks: Array<Task>;
}

interface Task { // It take cares for what types could be acepted in the Array
  id: number;
  value: string;
  completed: boolean;
}

class ToDo extends React.Component<{}, State> {
  constructor(props: {}) {
    super(props);
    this.state = {
      actualTask: '',
      tasks: [ ]
    };
  }

  public handleTaskSumbit (e: React.FormEvent<HTMLFormElement>): void {
    e.preventDefault();
    const { tasks, actualTask } = this.state;
    this.setState({
      actualTask: '',
      tasks: [
        ...tasks,
        {
          id: this._setId(),
          value: actualTask,
          completed: false
        }
      ]
    });
  }

  public render(): JSX.Element | null {
    return (
      <div className="todo">
        <h1>Typescript with Rect</h1>
        <h2>To do list</h2>
        <form onSubmit={e => this.handleTaskSumbit(e)}>
          <input
            className="todo__input"
            onChange={e => this.setState({ actualTask: e.target.value })}
            placeholder="New task"
            type="text"
            value={this.state.actualTask}
          />
          <button type="submit" className="todo__button">➕ New task</button>
        </form>
        <section>{this.renderTasks()}</section>
      </div>
    );
  }

  private _setId(): number {
    const date: Date = new Date();
    return date.getTime();
  }

  private renderTasks(): JSX.Element[] {
    return this.state.tasks.map((task: Task, index: number) => {
      const {id, completed, value} = task;
      return (
        <div key={id} className="todo__task">
          <span className={completed ? 'todo--task-is-completed' : ''}>{value}</span>
          <button
            className="todo__button"
            onClick={() => this.archiveTask(index)}
          >{!completed ? 'Archive' : 'Unarchive'}
          </button>
          <button
            className="todo__button"
            onClick={() => this.deleteTask(id)}
          >Delete
          </button>
        </div>
      );
    });
  }

  private archiveTask(index: number): void {
    const task: Task[] = this.state.tasks.splice(index, 1);
    task[0].completed = !task[0].completed;
    const tasks: Array<Task> = [...this.state.tasks, ...task];
    console.log(`task ${task[0].id} has been ${ task[0].completed ? 'archive' : 'unarchive' }.`);
    this.setState({ tasks });
  }

  private deleteTask(id: number): void {
    const tasks: Array<Task> = this.state.tasks.filter(
      (task: Task) => task.id !== id
    );
    this.setState({ tasks });
  }
}

export default ToDo;
