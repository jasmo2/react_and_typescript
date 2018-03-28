import * as React from 'react';
import './App.css';

const logo = require('./logo.svg');

interface IState { // this Interphase prevent any value in the constructor
  actualTask: string;
  tasks: Array<ITask>;
}

interface ITask { // It take cares for what types could be acepted in the Array
  id: number;
  value: string;
  completed: boolean;
}

class ToDo extends React.Component<{}, IState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      actualTask: '',
      tasks:[]
    }
  }

  public render(): JSX.Element | null {
    return (
      <div>
        <h1>Typescript with Rect</h1>
        <h2>To do list</h2>
        <form >
          <input
            type='text'
            placeholder='New task'
            value={this.state.actualTask}
            onChange={e => this.setState({ actualTask: e.target.value })}
          />
          <button type="submit">➕ New task</button>
        </form>
      </div>
    );
  }
}

export default ToDo;
