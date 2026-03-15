function RepoCard({ repo }) {
  return (
    <article className="repo">
      <div className="repo-header">
        <a href={repo.html_url} target="_blank" rel="noreferrer" className="repo-name">
          {repo.name}
        </a>
        {repo.language && <span className="repo-language">{repo.language}</span>}
      </div>
      {repo.description && <p className="repo-description">{repo.description}</p>}
      <div className="repo-stats">
        <span>⭐ {repo.stargazers_count}</span>
        <span>🍴 {repo.forks_count}</span>
        <span>🕒 Updated {new Date(repo.updated_at).toLocaleDateString()}</span>
      </div>
    </article>
  );
}

export default RepoCard;
