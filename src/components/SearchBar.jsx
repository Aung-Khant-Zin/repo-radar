import { useEffect, useState } from "react";

function SearchBar({ onSearch, isLoading, presetUsername = "" }) {
  const [username, setUsername] = useState(presetUsername);

  useEffect(() => {
    setUsername(presetUsername);
  }, [presetUsername]);

  const handleSubmit = (event) => {
    event.preventDefault();
    onSearch(username);
  };

  return (
    <form className="search-box" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Enter GitHub username"
        value={username}
        onChange={(event) => setUsername(event.target.value)}
        disabled={isLoading}
        aria-label="GitHub username"
      />
      <button type="submit" disabled={isLoading}>
        {isLoading ? "Searching..." : "Search"}
      </button>
    </form>
  );
}

export default SearchBar;
