export async function loginRequest(email, password) {
  const apiEndpoint = `${process.env.EXPO_PUBLIC_BASE_URL}/api/auth/login`;
  const response = await fetch(apiEndpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      password,
    }),
  });
  const data = await response.json();
  return { ok: response.ok, data };
}
