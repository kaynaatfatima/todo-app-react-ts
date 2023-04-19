import {useState, ReactElement} from "react";
import {FaEyeSlash, FaEye} from "react-icons/fa";

type ReturnType = [string, ReactElement];

const useTogglePassword = (): ReturnType => {
  const [visible, setVisible] = useState(false);
  const Icon = visible ? (
    <FaEyeSlash onClick={() => setVisible(!visible)} />
  ) : (
    <FaEye onClick={() => setVisible(!visible)} />
  );
  const InputType = visible ? "text" : "password";
  return [InputType, Icon];
};

export default useTogglePassword;
