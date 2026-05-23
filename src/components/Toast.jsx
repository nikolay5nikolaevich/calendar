export default function Toast({ toast }) {
  if (!toast) return null;
  return (
    <div className="toast" role="status">
      <span>{toast.message}</span>
      <button className="toast_undo" onClick={toast.undoFn}>
        отменить
      </button>
    </div>
  );
}
