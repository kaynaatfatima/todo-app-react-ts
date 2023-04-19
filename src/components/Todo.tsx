import React, {FC, useState} from 'react'
import { ITask } from '../interfaces'
import Modal from './Modal';

interface ITodoProps {
  task: ITask;
  completeTask: (taskNameToDelete: string) => void;
}

const Todo: FC<ITodoProps> = ({task, completeTask}) => {
  const [showModal, setShowModal] = useState<boolean>(false);
  return (
    <div className="task">
      <div className="content">
        <span>{task?.taskName}</span>
        <span>{task?.hours}</span>
      </div>
      <button
        onClick={() => {
          setShowModal(true)
        }}>
        x
      </button>
      {showModal && (
        <Modal
          open={showModal}
          onClose={() => setShowModal(false)}
          title={task.taskName}
          action={()=>completeTask(task.taskName)}
          actionName="Delete"
          actionClass="btn-primary"
          size="sm">
          Do you want to delete this task? 💀
        </Modal>
      )}
    </div>
  );
};

export default Todo