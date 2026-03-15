function Loader({ message = "Loading..." }) {
  return (
    <div className="loader" role="status" aria-live="polite">
      <span className="spinner" />
      <span>{message}</span>
    </div>
  );
}

export default Loader;
