import RepoCard from "./RepoCard.jsx";

function RepoList({ repos, emptyMessage = "No repositories match your filters." }) {
  return (
    <section className="card">
      <div className="repo-list-header">
        <h3>Recent Repositories</h3>
        <p className="muted">Showing up to 5 repositories based on your filters</p>
      </div>
      {repos.length === 0 ? (
        <p className="empty-copy">{emptyMessage}</p>
      ) : (
        <div className="repo-list">
          {repos.slice(0, 5).map((repo) => (
            <RepoCard key={repo.id} repo={repo} />
          ))}
        </div>
      )}
    </section>
  );
}

export default RepoList;
