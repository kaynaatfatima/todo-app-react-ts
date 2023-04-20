import React, {useState, useEffect, FC} from 'react'
import { ITask } from '../interfaces';
import Todo from '../components/Todo';
import Modal from '../components/Modal';

const Home: FC = () => {
    const [task, setTask] = useState<string>("");
    const [hours, setHours] = useState<number>(0);
    const [todoList, setTodoList] = useState<ITask[]>([]);
    const [error, setError] = useState<string | null>();
    const [errorColor, setErrorColor] = useState<"yellow" | "red">("red");
    const [showModal, setShowModal] = useState<boolean>(false);
    const [taskNameToDelete, setShowTaskNameToDelete] = useState<string>("");

    const handlechange = (event: React.ChangeEvent<HTMLInputElement>): void => {
      setError("");
      if (event.target.name === "task") {
        setTask(event.target.value);
      } else {
        // Input text from number field is also a string.
        // Using Number function to convert string to number.
        setHours(Number(event.target.value));
      }
    };

    const addTask = (): void => {
      const newTodo = {
        taskName: task,
        hours: hours,
      };
      if (newTodo.taskName === "") {
        setError("Task name cannot be empty");
        return;
      }
      if (todoList.some((task: ITask) => task.taskName === newTodo.taskName)) {
        setError("This task already exists.");
        return;
      }
      if (newTodo.hours <= 0) {
        setError("Hours cannot be zero or a negative value.");
        return;
      }
      setTodoList([...todoList, newTodo]);

      // resetting fields
      setTask("");
      setHours(0);
    };

    const showDeleteModal = (taskNameToDelete: string): void => {
      setShowModal(true)
      setShowTaskNameToDelete(taskNameToDelete);
    }

    const completeTask = (): void => {
      setTodoList(
        todoList.filter((task) => {
          return task.taskName != taskNameToDelete;
        })
      );
      setShowModal(false)
    };

    const [timeoutId, setTimeoutId] = useState<number | undefined>();

    const handleClose = (
      event?: React.MouseEvent<HTMLSpanElement> | undefined
    ): void => {
      console.log(event?.type);

      // If close is clicked, set error = ""
      if (event?.type === "click") {
        console.log("e - click");
        setError("");
      }
      // if event is mouse Enter, change color
      if (event?.type === "mouseenter") {
        setErrorColor("yellow");
        console.log("e - mouseenter");
      }

      if (event?.type === "mouseout") {
        setErrorColor("red");
        console.log("e - mouseout");
      }

      if (error !== "") {
        if (timeoutId) {
          clearTimeout(timeoutId);
        }

        const newTimeoutId = setTimeout(() => {
          setError("");
        }, 5000);

        setTimeoutId(newTimeoutId);
      }
    };

    useEffect(() => {
      handleClose();
    }, [error]);

  return (
    <div className="App">
      <div className="header">
        <div className="inputContainer">
          <input
            type="text"
            name="task"
            id=""
            placeholder="Task"
            value={task}
            onChange={handlechange}
            required
          />
          <input
            type="number"
            name="hours"
            id=""
            value={hours}
            placeholder="Required hours"
            onChange={handlechange}
            required
          />
        </div>
        <button onClick={addTask}>Create Task</button>
      </div>
      <div className="todoList">
        {todoList.map((task: ITask, key: number) => {
          return <Todo key={key} task={task} completeTask={showDeleteModal} />;
        })}
      </div>
      {error && (
        <div className={`error-${errorColor}`}>
          {error}{" "}
          <span
            className="close"
            onClick={handleClose}
            onMouseEnter={handleClose}
            onMouseOut={handleClose}>
            x
          </span>
        </div>
      )}
      {showModal && (
        <Modal
          open={showModal}
          onClose={() => setShowModal(false)}
          title={`Delete task: ${taskNameToDelete}`}
          action={() => completeTask()}
          actionName="Delete"
          actionClass="btn-primary"
          size="md">
          Are you sure you want to delete this task? ❌
        </Modal>
      )}
    </div>
  );
}

export default Home