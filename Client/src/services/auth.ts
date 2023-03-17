export const login = async (username: string, password: string) => {
    const response = await fetch("http://localhost:5087/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });
    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      throw new Error("Invalid username or password");
    }
  };
  