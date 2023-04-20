import React, {FC} from "react";
import ReactDOM from "react-dom";

interface IModalProps {
  size?: "sm" | "md" | "lg" | "xl";
  open: boolean;
  title: string;
  onClose: () => void;
  children?: React.ReactNode;
  action?: () => void;
  actionName?: string;
  actionClass?: string;
}

const Modal: FC<IModalProps> = ({
  open,
  size,
  title,
  onClose,
  children,
  action,
  actionName,
  actionClass,
}) => {
  if (!open) return null;
  return ReactDOM.createPortal(
    <>
      <div className="modal-overlay" onClick={onClose}>
        <div
          className={`modal-dialog modal-${size || "xl"}`}
          role="document"
          onClick={(e) => e.stopPropagation()}>
          <div className="modal-content">
            <div className="modal-header ">
              <b className="modal-title">🟧 {title}</b>
              <button
                type="button"
                className="btn-sm btn-hover-shine"
                onClick={onClose}
                aria-label="Close">
                X
              </button>
            </div>
            <div className="modal-body">{children}</div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn shadow btn-hover-shine btn-secondary"
                onClick={onClose}>
                Close
              </button>
              {action !== undefined && (
                <button
                  onClick={action}
                  type="button"
                  className={`btn btn-wide text-white btn-hover-shine ${actionClass}`}>
                  {actionName}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </>,
    document.getElementById("portal")!
  );
};

export default Modal;
