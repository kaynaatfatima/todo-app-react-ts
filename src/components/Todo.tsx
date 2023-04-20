import React, {FC, useState} from 'react'
import { ITask } from '../interfaces'
import Modal from './Modal';

interface ITodoProps {
  task: ITask;
  completeTask: (taskNameToDelete: string) => void;
}

const Todo: FC<ITodoProps> = ({task, completeTask}) => {
  
  return (
    <div className="task">
      <div className="content">
        <span>{task?.taskName}</span>
        <span>{task?.hours}</span>
      </div>
      <button
        onClick={() => {
          completeTask(task.taskName)
        }}>
        x
      </button>
      
    </div>
  );
};

export default Todo