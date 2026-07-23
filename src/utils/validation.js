export const MIN_PASSWORD_LENGTH = 8;

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function isEmailValid(email) {
  return EMAIL_REGEX.test(email.trim());
}

export function isPasswordValid(password) {
  return password.length >= MIN_PASSWORD_LENGTH;
}

export function getCredentialError(email, password, username = null) {
  // Collect every empty required field into one message.
  const missing = [];
  if (username !== null && !username.trim()) missing.push("a username");
  if (!email.trim()) missing.push("your email");
  if (!password) missing.push("a password");

  if (missing.length > 0) {
    return `Please enter ${formatList(missing)}.`;
  }

  if (!isEmailValid(email)) {
    return "Please enter a valid email address.";
  }
  if (!isPasswordValid(password)) {
    return `Password must be at least ${MIN_PASSWORD_LENGTH} characters.`;
  }
  return null;
}

// Example of what this function does: ["a", "b", "c"] -> "a, b and c"
function formatList(items) {
  if (items.length === 1) return items[0];
  return `${items.slice(0, -1).join(", ")} and ${items[items.length - 1]}`;
}
