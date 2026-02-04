import axios from "axios";

export default (repoAccessToken = process.env.GITHUB_PERSONAL_ACCESS_TOKEN) => {
  const githubApi = axios.create({
    baseURL: "https://api.github.com/",
    headers: {
      Authorization: `token ${repoAccessToken}`,
    },
  });

  const log = (...args) => {
    console.log("GitHub:", ...args);
  };

  const getUser = async ({ accessToken }) => {
    // https://docs.github.com/en/rest/reference/users#get-a-user
    const { data } = await githubApi.get(`user`, {
      headers: {
        Authorization: `token ${accessToken}`,
      },
    });

    const user = { username: data.login, avatarUrl: data.avatar_url };

    log("getUser", user);

    return user;
  };

  const getRepoAccess = async ({ username, owner, repo }) => {
    log("getRepoAccess", owner, repo, username);

    // https://docs.github.com/en/rest/reference/repos#check-if-a-user-is-a-repository-collaborator
    const { status } = await githubApi.get(`repos/${owner}/${repo}/collaborators/${username}`, {
      validateStatus: (status) => {
        // 204 means the user is a collaborator
        // 404 means the user is not a collaborator
        return [204, 404].includes(status);
      },
    });

    // TODO: Also check if invited!!

    log("status", status);

    return status === 204 ? true : false;
  };

  const addRepoAccess = async ({ username, owner, repo }) => {
    log("addRepoAccess", owner, repo, username);

    // https://docs.github.com/en/rest/reference/repos#add-a-repository-collaborator
    const { status } = await githubApi.put(`repos/${owner}/${repo}/collaborators/${username}`);

    log("status", status);

    return true;
  };

  return {
    getUser,
    getRepoAccess,
    addRepoAccess,
  };
};
