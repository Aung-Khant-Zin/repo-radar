const SORT_OPTIONS = [
  { label: "Latest", value: "latest" },
  { label: "Most Stars", value: "stars" },
];

function RepoFilters({ sortOrder, onSortChange, languages, selectedLanguage, onLanguageChange }) {
  return (
    <section className="card repo-filters">
      <div>
        <p className="muted small-label">Sort by</p>
        <div className="sort-buttons">
          {SORT_OPTIONS.map((option) => (
            <button
              key={option.value}
              type="button"
              className={sortOrder === option.value ? "pill-button pill-button--active" : "pill-button"}
              onClick={() => onSortChange(option.value)}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>

      <div>
        <p className="muted small-label">Language</p>
        <div className="language-select">
          <select value={selectedLanguage} onChange={(event) => onLanguageChange(event.target.value)}>
            <option value="all">All Languages</option>
            {languages.map((lang) => (
              <option key={lang} value={lang}>
                {lang}
              </option>
            ))}
          </select>
        </div>
      </div>
    </section>
  );
}

export default RepoFilters;
