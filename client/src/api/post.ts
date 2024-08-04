import { Post } from "../types/post";

const API_BASE_URL = "http://localhost:3001";

const createPost = async (post: any): Promise<any> => {
  const url = `${API_BASE_URL}/posts`;

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(post),
    });

    if (!response.ok) {
      throw new Error(
        `Server returned ${response.status} ${response.statusText} for ${url}`
      );
    }

    const contentType = response.headers.get("content-type");
    if (contentType && contentType.includes("application/json")) {
      const responseData = await response.json();
      return responseData;
    } else {
      const responseText = await response.text();
      throw new Error(
        `Expected JSON but received ${contentType}: ${responseText}`
      );
    }
  } catch (error: any) {
    console.error("Error:", (error as Error).message);
    throw error;
  }
};

const editPost = async (id: string, post: any): Promise<any> => {
  const url = `${API_BASE_URL}/posts/${id}`;

  try {
    const response = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(post),
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

const addComment = async (id: string, content: string): Promise<void> => {
  const url = `${API_BASE_URL}/posts/${id}/comment`;

  const userId = localStorage.getItem("userId"); // ดึงค่า userId เป็นสตริง

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        author: userId,
        content,
      }),
    });

    if (!response.ok) {
      throw new Error(
        `Server returned ${response.status} ${response.statusText}`
      );
    }
  } catch (error: any) {
    console.error("Error:", error.message);
    throw error;
  }
};

const likePost = async (id: string): Promise<void> => {
  const url = `${API_BASE_URL}/posts/${id}/likes`;

  const userId = localStorage.getItem("userId"); // ดึงค่า userId เป็นสตริง

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId,
      }),
    });

    if (!response.ok) {
      throw new Error(
        `Server returned ${response.status} ${response.statusText}`
      );
    }
  } catch (error: any) {
    console.error("Error:", error.message);
    throw error;
  }
};

const getPosts = async (): Promise<Post[]> => {
  const url = `${API_BASE_URL}/posts`;

  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const contentType = response.headers.get("content-type");
    if (contentType && contentType.includes("application/json")) {
      const data = await response.json();
      return data;
    } else {
      const responseText = await response.text();
      throw new Error(
        `Expected JSON response but got ${contentType}: ${responseText}`
      );
    }
  } catch (error: any) {
    console.error("Error:", (error as Error).message);
    throw error;
  }
};

const getPostById = async (id: string): Promise<Post> => {
  const url = `${API_BASE_URL}/posts/${id}`;

  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const contentType = response.headers.get("content-type");
    if (contentType && contentType.includes("application/json")) {
      const data = await response.json();
      return data;
    } else {
      const responseText = await response.text();
      throw new Error(
        `Expected JSON response but got ${contentType}: ${responseText}`
      );
    }
  } catch (error: any) {
    console.error("Error:", (error as Error).message);
    throw error;
  }
};

const deletePostById = async (id: string): Promise<Post> => {
  const url = `${API_BASE_URL}/posts/${id}`;

  try {
    const response = await fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();
    return data;
  } catch (error: any) {
    console.error("Error:", (error as Error).message);
    throw error;
  }
};

export {
  createPost,
  editPost,
  addComment,
  getPosts,
  getPostById,
  likePost,
  deletePostById,
};
