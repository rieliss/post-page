import axios from "axios";
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
  const userId = localStorage.getItem("userId");

  if (!userId) {
    throw new Error("User is not logged in.");
  }

  try {
    const response = await axios.post(url, {
      author: userId,
      content,
    });

    if (response.status !== 201) {
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
  const userId = localStorage.getItem("userId");
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId }),
    });

    if (!response.ok) {
      throw new Error(
        `Server returned ${response.status} ${response.statusText}`
      );
    }
    const like = await response.json();
  } catch (error: any) {
    console.error("Error:", error.message);
    throw error;
  }
};

const createNotification = async (notificationData: {
  user: string;
  type: string;
  message: string;
  entity: string;
  entityModel: string;
}) => {
  const url = `${API_BASE_URL}/notifications`;

  try {
    const existingNotificationResponse = await axios.post(
      `${API_BASE_URL}/notifications/check`,
      notificationData
    );

    if (existingNotificationResponse.data.exists) {
      return existingNotificationResponse.data.notification;
    }

    const response = await axios.post(url, notificationData);

    if (response.status !== 200) {
      throw new Error(`Failed to create notification: ${response.statusText}`);
    }

    return response.data;
  } catch (error: any) {
    console.error(
      "Error creating notification:",
      error.response?.data || error.message
    );
    throw error;
  }
};

const deleteNotification = async (notificationData: {
  user: string;
  entity: string;
  type: string;
  entityModel: string;
}) => {
  const url = `${API_BASE_URL}/notifications/delete`;
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(notificationData),
    });

    if (!response.ok) {
      throw new Error(
        `Server returned ${response.status} ${response.statusText}`
      );
    }
    await response.json();
  } catch (error: any) {
    console.error("Error deleting notification:", error.message);
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
