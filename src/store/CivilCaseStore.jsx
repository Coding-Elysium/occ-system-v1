import axios from "axios";
import { create } from "zustand";
import { BASEURL } from "../helper/helper";

const useCivilCaseStore = create((set) => ({
  cases: [],
  loading: false,
  fetchCases: async () => {
    set({ loading: true });
    try {
      const response = await axios.get(`${BASEURL}/civilcase/read`);
      console.log("Fetched civil cases:", response.data);
      set({ cases: response.data, loading: false });
    } catch (error) {
      set({ error: error.message, loading: false });
      console.error("Error fetching civil cases:", error);
    }
  },

  fetchCasesById: async (id) => {
    set({ loading: true });
    try {
      const response = await axios.get(`${BASEURL}/civilcase/read/${id}`);
      set({ cases: response.data, loading: false });
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },

  addCases: async (data) => {
    try {
      const response = await axios.post(`${BASEURL}/civilcase/add`, data);
      console.log("Case added successfully:", response.data);
      return response.data;
    } catch (error) {
      console.error(
        "Failed to add case:",
        error.response?.data || error.message
      );
    }
  },
}));

export default useCivilCaseStore;
