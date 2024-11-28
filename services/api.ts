import axios, { AxiosError, AxiosResponse } from "axios";

const API_BASE_URL = process.env.API_BASE_URL || "http://localhost:3000";
const API_KEY = process.env.API_KEY || "your_api_key_here";

class BackendService {
  private static instance: BackendService;
  private constructor() {}

  public static getInstance(): BackendService {
    if (!BackendService.instance) {
      BackendService.instance = new BackendService();
    }
    return BackendService.instance;
  }

  private handleAxiosError(error: AxiosError) {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.error('Server responded with:', error.response.status, error.response.data);
    } else if (error.request) {
      // The request was made but no response was received
      console.error('No response received for request:', error.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.error('Error setting up request:', error.message);
    }
    throw error; // Rethrow the error to be handled further up if needed
  }

  public async getLogs(): Promise<AxiosResponse> {
    try {
      const response = await axios.get(`${API_BASE_URL}/logs`, {
        headers: { 'Authorization': `Bearer ${API_KEY}` }
      });
      return response;
    } catch (error) {
      this.handleAxiosError(error as AxiosError);
    }
  }

  public async performSearch(query: string): Promise<AxiosResponse> {
    try {
      const response = await axios.get(`${API_BASE_URL}/search`, {
        params: { query },
        headers: { 'Authorization': `Bearer ${API_KEY}` }
      });
      return response;
    } catch (error) {
      this.handleAxiosError(error as AxiosError);
    }
  }

  public async generateReports(param: string): Promise<AxiosResponse> {
    try {
      const response = await axios.get(`${API_BASE_URL}/reports`, {
        params: { param },
        headers: { 'Authorization': `Bearer ${API_KEY}` }
      });
      return response;
    } catch (error) {
      this.handleAxiosError(error as AxiosError);
    }
  }
}

export default BackendService.getInstance();