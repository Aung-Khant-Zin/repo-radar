const BASE_URL = "https://api.github.com";
const COMMON_HEADERS = {
  Accept: "application/vnd.github+json",
  "User-Agent": "github-profile-analyzer",
};

async function handleResponse(response) {
  if (response.status === 404) {
    throw new Error("GitHub user not found.");
  }

  if (response.status === 403) {
    throw new Error("GitHub API limit reached. Please try again soon.");
  }

  if (!response.ok) {
    throw new Error("Unable to reach GitHub at the moment.");
  }

  return response.json();
}

export async function fetchUser(username) {
  const response = await fetch(`${BASE_URL}/users/${username}`, {
    headers: COMMON_HEADERS,
  });

  return handleResponse(response);
}

export async function fetchRepos(username) {
  const response = await fetch(`${BASE_URL}/users/${username}/repos?per_page=20&sort=updated`, {
    headers: COMMON_HEADERS,
  });

  const repos = await handleResponse(response);

  return repos
    .slice()
    .sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at));
}
