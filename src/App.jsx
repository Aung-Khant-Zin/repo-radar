import { useEffect, useMemo, useState } from "react";
import SearchBar from "./components/SearchBar.jsx";
import ProfileCard from "./components/ProfileCard.jsx";
import RepoList from "./components/RepoList.jsx";
import Loader from "./components/Loader.jsx";
import RepoFilters from "./components/RepoFilters.jsx";
import LanguageChart from "./components/LanguageChart.jsx";
import SearchHistory from "./components/SearchHistory.jsx";
import { fetchRepos, fetchUser } from "./services/githubApi.js";
import "./styles/App.css";

const HISTORY_KEY = "github-profile-analyzer:history";

function App() {
  const [user, setUser] = useState(null);
  const [repos, setRepos] = useState([]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [theme, setTheme] = useState("light");
  const [sortOrder, setSortOrder] = useState("latest");
  const [languageFilter, setLanguageFilter] = useState("all");
  const [presetUsername, setPresetUsername] = useState("");
  const [searchHistory, setSearchHistory] = useState(() => {
    if (typeof window === "undefined") {
      return [];
    }
    try {
      const stored = window.localStorage.getItem(HISTORY_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch (err) {
      console.error("Unable to read search history", err);
      return [];
    }
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.localStorage.setItem(HISTORY_KEY, JSON.stringify(searchHistory));
    }
  }, [searchHistory]);

  const languages = useMemo(() => {
    const uniqueLanguages = new Set(
      repos
        .map((repo) => repo.language)
        .filter(Boolean)
        .sort((a, b) => a.localeCompare(b))
    );
    return Array.from(uniqueLanguages);
  }, [repos]);

  const sortedRepos = useMemo(() => {
    const data = repos.slice();
    if (sortOrder === "stars") {
      return data.sort((a, b) => b.stargazers_count - a.stargazers_count);
    }
    return data.sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at));
  }, [repos, sortOrder]);

  const visibleRepos = useMemo(() => {
    if (languageFilter === "all") {
      return sortedRepos;
    }
    return sortedRepos.filter((repo) => repo.language === languageFilter);
  }, [sortedRepos, languageFilter]);

  const handleSearch = async (rawUsername) => {
    const username = rawUsername.trim();
    setPresetUsername(username);

    if (!username) {
      setError("Please enter a GitHub username.");
      setUser(null);
      setRepos([]);
      return;
    }

    setIsLoading(true);
    setError("");
    setUser(null);
    setRepos([]);

    try {
      const [userData, repoData] = await Promise.all([
        fetchUser(username),
        fetchRepos(username),
      ]);

      setUser(userData);
      setRepos(repoData);
      setSortOrder("latest");
      setLanguageFilter("all");
      setSearchHistory((prev) => {
        const normalized = userData.login;
        const updated = [normalized, ...prev.filter((name) => name !== normalized)].slice(0, 8);
        return updated;
      });
    } catch (err) {
      setError(err.message || "Something went wrong while fetching the profile.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleThemeToggle = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  return (
    <div className={`app ${theme === "dark" ? "app--dark" : ""}`}>
      <div className="container">
        <header className="header">
          <div>
            <p className="tagline">Search. Inspect. Discover.</p>
            <h1>GitHub Profile Analyzer</h1>
          </div>
          <button type="button" className="theme-toggle" onClick={handleThemeToggle}>
            {theme === "dark" ? "Light Mode" : "Dark Mode"}
          </button>
        </header>

        <p className="subtitle">
          Look up any public GitHub account to review their profile snapshot, latest
          repositories, and primary languages. Powered by the GitHub REST API.
        </p>

        <SearchBar isLoading={isLoading} onSearch={handleSearch} presetUsername={presetUsername} />

        {error && <p className="status status--error">{error}</p>}
        {isLoading && <Loader message="Loading GitHub profile..." />}

        {!isLoading && (user || repos.length > 0 || searchHistory.length > 0) && (
          <div className="dashboard">
            <div className="dashboard__panel dashboard__panel--profile">
              {user ? (
                <ProfileCard user={user} />
              ) : (
                <section className="card placeholder-card">
                  <p className="muted small-label">Welcome</p>
                  <h3>Search any GitHub developer</h3>
                  <p className="muted">
                    Results will appear here on desktop, while mobile users see a scroll-friendly stack.
                  </p>
                </section>
              )}
              <SearchHistory
                items={searchHistory}
                onSelect={handleSearch}
                onClear={() => setSearchHistory([])}
              />
            </div>
            <div className="dashboard__panel dashboard__panel--insights">
              {repos.length > 0 ? (
                <>
                  <RepoFilters
                    sortOrder={sortOrder}
                    onSortChange={setSortOrder}
                    languages={languages}
                    selectedLanguage={languageFilter}
                    onLanguageChange={setLanguageFilter}
                  />
                  <LanguageChart repos={repos} />
                  <RepoList
                    repos={visibleRepos}
                    emptyMessage="No repositories match your current filter selection."
                  />
                </>
              ) : user ? (
                <section className="card placeholder-card">
                  <h3>No public repositories yet</h3>
                  <p className="muted">When this developer publishes repos they will appear here automatically.</p>
                </section>
              ) : (
                <section className="card placeholder-card">
                  <h3>Try a search</h3>
                  <p className="muted">Look up “torvalds” or “vercel” to see how the desktop/mobile layouts adapt.</p>
                </section>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
