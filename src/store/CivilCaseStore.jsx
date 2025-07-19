import axios from "axios";
import { create } from "zustand";
import { BASEURL } from "../helper/helper";

const useCivilCaseStore = create((set) => ({
  cases: [],
  firstLevelDetails: [],
  secondLevelDetails: [],
  courtAppealsDetails: [],
  supremeCourtDetails: [],
  caseDetails: null,
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
      set({ caseDetails: response.data, loading: false });
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },

  fetchFirstLevel: async (id) => {
    set({ loading: true });
    try {
      const response = await axios.get(
        `${BASEURL}/civilcase/read/decision/firstlevel/${id}`
      );
      set({ firstLevelDetails: response.data, loading: false });
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },

  fetchSecondLevel: async (id) => {
    set({ loading: true });
    try {
      const response = await axios.get(
        `${BASEURL}/civilcase/read/decision/secondLevel/${id}`
      );
      set({ secondLevelDetails: response.data, loading: false });
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },

  fetchCourtAppeals: async (id) => {
    set({ loading: true });
    try {
      const response = await axios.get(
        `${BASEURL}/civilcase/read/decision/courtappeals/${id}`
      );
      set({ courtAppealsDetails: response.data, loading: false });
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },

  fetchSupremeCourt: async (id) => {
    set({ loading: true });
    try {
      const response = await axios.get(
        `${BASEURL}/civilcase/read/decision/supremecourt/${id}`
      );
      set({ supremeCourtDetails: response.data, loading: false });
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },

  clearCaseData: () =>
    set({
      caseDetails: null,
      firstLevelDetails: [],
      secondLevelDetails: [],
      courtAppealsDetails: [],
      supremeCourtDetails: [],
    }),

  add: async ({
    data,
    endPoint = "/endpoint",
    getEndPoint = "/getEndPoint",
    updateKey = "cases",
  }) => {
    try {
      const response = await axios.post(`${BASEURL}${endPoint}`, data);
      console.log("Case added successfully:", response.data);

      const refreshed = await axios.get(`${BASEURL}/civilcase${getEndPoint}`);
      set({ [updateKey]: refreshed.data });

      return response.data;
    } catch (error) {
      console.error(
        "Failed to add case:",
        error.response?.data || error.message
      );
    }
  },

  updateCases: async (updatedCase, data) => {
    try {
      const response = await axios.put(
        `${BASEURL}/civilcase/update/${updatedCase}`,
        data
      );
      console.log("Case updated successfully:", response.data);

      const refreshed = await axios.get(`${BASEURL}/civilcase/read`);
      set({ cases: refreshed.data });

      return response.data;
    } catch (error) {
      console.error(
        "Failed to update case:",
        error.response?.data || error.message
      );
      throw error;
    }
  },

  updateStatus: async ({ ids, status }) => {
    try {
      const response = await axios.put(`${BASEURL}/civilcase/update-status`, {
        ids,
        status,
      });
      console.log("Status updated:", response.data);

      const refreshed = await axios.get(`${BASEURL}/civilcase/read  `);
      set({ cases: refreshed.data });

      return response.data;
    } catch (error) {
      console.error(
        "Failed to update status:",
        error.response?.data || error.message
      );
      throw error;
    }
  },

  updateDecision: async ({
    path,
    updatedCase,
    data,
    getEndPoint,
    updateKey,
  }) => {
    try {
      const response = await axios.put(
        `${BASEURL}/civilcase/update/${path}/${updatedCase}`,
        data
      );
      console.log("Case updated successfully:", response.data);

      const refreshed = await axios.get(`${BASEURL}/civilcase${getEndPoint}`);
      set({ [updateKey]: refreshed.data });

      return response.data;
    } catch (error) {
      console.error(
        "Failed to update case:",
        error.response?.data || error.message
      );
      throw error;
    }
  },

  deleteDecision: async ({
    level,
    id,
    caseId,
    refetchUrl,
    updateKey = "cases",
  }) => {
    try {
      if (!id) {
        return { success: false, message: "Invalid case ID" };
      }

      const response = await axios.delete(
        `${BASEURL}/civilcase/delete/decision/${level}/${id}`
      );

      const refreshed = await axios.get(`${BASEURL}/${refetchUrl}/${caseId}`);
      set({ [updateKey]: refreshed.data });

      return response.data;
    } catch (error) {
      console.error("Error deleting decision:", error);
      return { success: false, message: "Something went wrong" };
    }
  },

  deleteCase: async (id) => {
    try {
      if (!id) {
        return { success: false, message: "Invalid case ID" };
      }

      const response = await axios.delete(`${BASEURL}/civilcase/delete/${id}`);

      const refreshed = await axios.get(`${BASEURL}/civilcase/read`);
      set({ cases: refreshed.data });

      return response.data;
    } catch (error) {
      return { success: false, message: "Failed to delete case." };
    }
  },
}));

export default useCivilCaseStore;
