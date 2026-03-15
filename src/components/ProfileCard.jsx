function ProfileCard({ user }) {
  return (
    <section className="card">
      <div className="profile">
        <img className="avatar" src={user.avatar_url} alt={`${user.login} avatar`} width={120} height={120} />
        <div>
          <h2>{user.name || user.login}</h2>
          {user.bio && <p className="muted">{user.bio}</p>}
          <div className="meta-grid">
            {user.location && <span>📍 {user.location}</span>}
            {user.company && <span>🏢 {user.company}</span>}
            <a href={user.html_url} target="_blank" rel="noreferrer">
              View GitHub Profile ↗
            </a>
          </div>
        </div>
      </div>

      <div className="stats">
        <div>
          <p className="stat-label">Repos</p>
          <p className="stat-value">{user.public_repos}</p>
        </div>
        <div>
          <p className="stat-label">Followers</p>
          <p className="stat-value">{user.followers}</p>
        </div>
        <div>
          <p className="stat-label">Following</p>
          <p className="stat-value">{user.following}</p>
        </div>
      </div>
    </section>
  );
}

export default ProfileCard;
