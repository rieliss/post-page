const API_BASE_URL = "http://localhost:3001";

export const registerAdmin = async (admin: any): Promise<any> => {
  const url = `${API_BASE_URL}/admin/register`;

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(admin),
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

export const loginAdmin = async (email: any, password: any): Promise<any> => {
  const url = `${API_BASE_URL}/admin/login`;

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      const statusText = response.statusText || "Unknown Error";
      throw new Error(
        `Server returned ${response.status} ${statusText} for ${url}`
      );
    }

    const contentType = response.headers.get("content-type");
    if (!contentType || !contentType.includes("application/json")) {
      // Handle non-JSON response
      const responseData = await response.text();
      return responseData;
    }

    // Handle JSON response
    const responseData = await response.json();
    if (responseData.id) {
      window.location.href = `/admin/${responseData.id}`;
      localStorage.setItem("adminId", responseData.id);
    } else {
      console.error("Response does not contain ID:", responseData);
    }

    return responseData;
  } catch (error: any) {
    console.error("Error:", (error as Error).message);

    // Handle different error types
    if (error instanceof TypeError) {
      console.error("Network error or CORS issue");
    } else if (error instanceof SyntaxError) {
      console.error("Error parsing JSON response");
    }

    throw error;
  }
};
