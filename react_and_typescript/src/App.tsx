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
      <div>
        <h1>Typescript with Rect</h1>
        <h2>To do list</h2>
        <form onSubmit={e => this.handleTaskSumbit(e)}>
          <input
            type="text"
            placeholder="New task"
            value={this.state.actualTask}
            onChange={e => this.setState({ actualTask: e.target.value })}
          />
          <button type="submit">➕ New task</button>
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
      return (
        <div key={task.id}>
          {task.value}
        </div>
      );
    });
  }
}

export default ToDo;
