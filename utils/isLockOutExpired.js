const isLockoutExpired = (lastFailedLoginTimestamp) => {
  // Define the lockout duration in milliseconds (e.g., 24 hours)
  const lockoutDurationMs = 4 * 60 * 60 * 1000; // 4 hours in milliseconds
  const currentTime = new Date().getTime();
  const lastFailedLoginTime = new Date(lastFailedLoginTimestamp).getTime();

  // Check if enough time has passed since the last failed login attempt
  return currentTime - lastFailedLoginTime >= lockoutDurationMs; //true -false
};
export default isLockoutExpired;
