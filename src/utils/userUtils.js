// userUtils.js

export const getUserData = () => {
  let userId =
    localStorage.getItem("vibe_userId");

  let userName =
    localStorage.getItem("vibe_username");

  if (!userId) {
    userId = crypto.randomUUID();

    localStorage.setItem(
      "vibe_userId",
      userId
    );
  }

  if (!userName) {
    userName =
      "User-" +
      Math.random()
        .toString(36)
        .substring(2, 6);

    localStorage.setItem(
      "vibe_username",
      userName
    );
  }

  return {
    userId,
    userName,
  };
};