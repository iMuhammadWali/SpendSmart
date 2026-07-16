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

export async function registerRequest(username, email, password) {
  const apiEndpoint = `${process.env.EXPO_PUBLIC_BASE_URL}/api/auth/register`;
  const response = await fetch(apiEndpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username,
      email,
      password,
    }),
  });
  const data = await response.json();
  return { ok: response.ok, data };
}

export async function registerAndLogin(username, email, password) {
  const { ok: registerOk, data: registerData } = await registerRequest(username, email, password);
  if (!registerOk) {
    return { ok: false, data: registerData };
  }
  return await loginRequest(email, password);
}
