function SearchHistory({ items, onSelect, onClear }) {
  if (!items.length) {
    return null;
  }

  return (
    <section className="card history">
      <div className="history-header">
        <h3>Recent Searches</h3>
        <button type="button" className="ghost-button" onClick={onClear}>
          Clear
        </button>
      </div>
      <div className="history-list">
        {items.map((username) => (
          <button key={username} type="button" onClick={() => onSelect(username)}>
            {username}
          </button>
        ))}
      </div>
    </section>
  );
}

export default SearchHistory;
