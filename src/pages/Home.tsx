import React, {useState, useEffect, FC} from "react";
import {ITask} from "../interfaces";
import Todo from "../components/Todo";
import Modal from "../components/Modal";
import ErrorAlert from "../components/ErrorAlert";

const Home: FC = () => {
  const [task, setTask] = useState<string>("");
  const [hours, setHours] = useState<number>(0);
  const [todoList, setTodoList] = useState<ITask[]>([]);
  const [error, setError] = useState<string | null>();
  const [showModal, setShowModal] = useState<boolean>(false);
  const [taskNameToDelete, setShowTaskNameToDelete] = useState<string>("");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
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
    setShowModal(true);
    setShowTaskNameToDelete(taskNameToDelete);
  };

  const completeTask = (): void => {
    setTodoList(
      todoList.filter((task) => {
        return task.taskName != taskNameToDelete;
      })
    );
    setShowModal(false);
  };

  return (
    <div className="App">
      <div className="header shadow">
        <div className="inputContainer">
          <input
            type="text"
            name="task"
            id=""
            placeholder="Task"
            value={task}
            onChange={handleChange}
            required
          />
          <input
            type="number"
            name="hours"
            value={hours}
            placeholder="Required hours"
            onChange={handleChange}
            required
          />
        </div>
        <button className="btn-focus btn-hover-shine" onClick={addTask}>
          Create Task
        </button>
      </div>
      <div className="todoList">
        {todoList.map((task: ITask, key: number) => {
          return <Todo key={key} task={task} completeTask={showDeleteModal} />;
        })}
      </div>
      {error && (
        <ErrorAlert message={error} closeNotification={() => setError("")} />
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
};

export default Home;
