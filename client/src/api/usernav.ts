const API_BASE_URL = "http://localhost:3001";

export const fetchUserNav = async (id: string): Promise<any> => {
  if (!id) {
    throw new Error("Invalid user ID");
  }

  const url = `${API_BASE_URL}/nav`;

  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const statusText = response.statusText || "Unknown Error";
      throw new Error(
        `Server returned ${response.status} ${statusText} for ${url}`
      );
    }

    const contentType = response.headers.get("content-type");
    if (!contentType || !contentType.includes("application/json")) {
      const responseData = await response.text();
      return responseData;
    }

    const responseData = await response.json();
    if (responseData.id) {
      localStorage.setItem("userId", responseData.id);
    } else {
      console.error("Response does not contain ID:", responseData);
    }
    return responseData;
  } catch (error) {
    console.error("Error:", (error as Error).message);

    if (error instanceof TypeError) {
      console.error("Network error or CORS issue");
    } else if (error instanceof SyntaxError) {
      console.error("Error parsing JSON response");
    }

    return null;
  }
};
