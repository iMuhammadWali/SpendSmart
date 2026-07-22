const REQUEST_TIMEOUT_MS = 10000;

async function postRequest(path, body) {
  const apiEndpoint = `${process.env.EXPO_PUBLIC_BASE_URL}${path}`;
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

  try {
    const response = await fetch(apiEndpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
      signal: controller.signal,
    });
    const data = await response.json();
    return { ok: response.ok, data };
  } catch (err) {
    if (err.name === "AbortError") {
      return { ok: false, data: { message: "Request timed out. Is the server running?" } };
    }
    throw err;
  } finally {
    clearTimeout(timeout);
  }
}

export async function loginRequest(email, password) {
  console.log(`${process.env.EXPO_PUBLIC_BASE_URL}/api/auth/login`);
  return await postRequest("/api/auth/login", { email, password });
}

export async function registerRequest(username, email, password) {
  return await postRequest("/api/auth/register", { username, email, password });
}

export async function registerAndLogin(username, email, password) {
  const { ok: registerOk, data: registerData } = await registerRequest(username, email, password);
  if (!registerOk) {
    return { ok: false, data: registerData };
  }
  return await loginRequest(email, password);
}
