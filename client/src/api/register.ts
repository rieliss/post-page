const API_BASE_URL = "http://localhost:3001";

const registerUser = async (user: any): Promise<any> => {
  const url = `${API_BASE_URL}/register`;

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });

    if (!response.ok) {
      throw new Error(
        `Server returned ${response.status} ${response.statusText} for ${url}`
      );
    }

    const contentType = response.headers.get("content-type");
    if (!contentType || !contentType.includes("application/json")) {
      const responseData = await response.text();
      return responseData;
    }

    const responseData = await response.json();
    return responseData;
  } catch (error: any) {
    console.error("Error:", (error as Error).message);
    throw error;
  }
};

export { registerUser };
