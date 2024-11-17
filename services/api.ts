import axios, { AxiosResponse } from "axios";

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

  public async getLogs(): Promise<AxiosResponse> {
    try {
      const response = await axios.get(`${API_BASE_URL}/logs`, {
        headers: { 'Authorization': `Bearer ${API_KEY}` }
      });
      return response;
    } catch (error) {
      throw error;
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
      throw error;
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
      throw error;
    }
  }
}

export default BackendService.getInstance();