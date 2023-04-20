import React, {useState, useEffect} from "react";

interface IErrorAlertProps {
  message?: string | undefined;
  closeNotification: () => void;
}
const ErrorAlert: React.FC<IErrorAlertProps> = ({
  message,
  closeNotification,
}: IErrorAlertProps) => {
  const [error, setError] = useState<string | undefined>("");
  const [errorColor, setErrorColor] = useState<"yellow" | "red">("red");
  const [timeoutId, setTimeoutId] = useState<number | undefined>();

  useEffect(() => {
    setError(message);

    if (error !== "") {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }

      const newTimeoutId = setTimeout(() => {
        closeNotification();
      }, 5000);

      setTimeoutId(newTimeoutId);
    }
  }, [message, error]);

  const handleClose = (
    event?: React.MouseEvent<HTMLSpanElement> | undefined
  ): void => {
    console.log(event?.type);

    // If close is clicked, set error = ""
    if (event?.type === "click") {
      setError("");
      closeNotification();
    }
    // if event is mouse Enter, change color
    if (event?.type === "mouseenter") {
      setErrorColor("yellow");
    }

    if (event?.type === "mouseout") {
      setErrorColor("red");
    }

    if (error !== "") {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }

      const newTimeoutId = setTimeout(() => {
        setError("");
        closeNotification();
      }, 6000);

      setTimeoutId(newTimeoutId);
    }
  };

  return error ? (
    <>
      <div className={`shadow error-${errorColor}`}>
        {error}
        <span
          className="close"
          onClick={handleClose}
          onMouseEnter={handleClose}
          onMouseOut={handleClose}>
          x
        </span>
      </div>
    </>
  ) : null;
};

export default ErrorAlert;
