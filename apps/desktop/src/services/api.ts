import { Project, TimeEntry, User } from "../types";
import {
  API_URL,
  AUTH,
  EMAIL,
  EMPLOYEE_PROJECTS,
  GET_TIME_LOG,
  PASSWORD,
  PROFILE,
  SCREENSHOT,
  START_TIME,
  STOP_TIME,
} from "./constants";
import { File } from "types/utils"
import axios from "axios";

// Mock API service
class ApiService {
  async login() {
    return axios
      .post<User>(`${API_URL}/${AUTH}`, {
        email: EMAIL,
        password: PASSWORD,
      })
      .then((response) => {
        const token = response.data["accessToken"];
        localStorage.setItem("access_token", token);
        return token;
      });
  }

  async getCurrentUser(): Promise<User> {
    return axios
      .post<User>(
        `${API_URL}/${PROFILE}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        },
      )
      .then((response) => {
        return response.data;
      });
  }

  getAssignedProjects = async (id: string) => {
    return axios
      .get<Project[]>(`${API_URL}/${EMPLOYEE_PROJECTS(id)}`)
      .then((response) => response.data);
  };

  async getProjectTimeEntries(
    projectId: string,
    userId: string,
  ): Promise<TimeEntry[]> {
    return axios
      .get<TimeEntry[]>(`${API_URL}/${GET_TIME_LOG(userId, projectId)}`)
      .then((response) => response.data);
  }

  async startTimer(
    taskId: string,
    userId: string,
  ): Promise<{ startTime: string }> {
    return axios
      .post(
        `${API_URL}/${START_TIME}`,
        {
          employeeId: userId,
          taskId: taskId,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        },
      )
      .then((response) => {
        return response.data;
      });
  }

  async stopTimer(
    taskId: string,
    userId: string,
  ): Promise<{ startTime: string }> {
    return axios
      .post(
        `${API_URL}/${STOP_TIME}`,
        {
          employeeId: userId,
          taskId: taskId,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        },
      )
      .then((response) => {
        return response.data;
      });
  }

  async captureScreenshot(
    taskId: string,
    employeeId: string,
    document: File,
  ): Promise<{ id: string }> {
    const formData = createFormData(document, "file", {})
    return axios
      .post(`${API_URL}/${SCREENSHOT}/${employeeId}/${taskId}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then((response) => response.data)
  }
}

export const createFormData = (file: File, filename: string, body: { [key: string]: any }) => {
  const data = new FormData()
  data.append("file", {
    name: filename,
    type: file.mimeType,
    uri: file.uri.replace("file://", "")
  } as unknown as Blob)

  Object.keys(body).forEach((key) => {
    data.append(key, body[key])
  })
  return data
}


export const apiService = new ApiService();
