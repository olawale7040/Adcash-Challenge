import axios from "axios";

const Axios = axios.create({
  baseURL: "https://private-anon-82e8a3143d-adcashdsp.apiary-mock.com/",
  headers: { "Content-Type": "application/json" },
});

Axios.interceptors.response.use(
  (response) => response,
  (error) =>
    Promise.reject(
      (error.response && error.response.data) || "Something went wrong"
    )
);

export const getTargetingTypes = () =>
  Axios.get("types", { responseType: "json" });

export const getCategoryTypes = () => Axios.get(`categories`);

export const getCountryTypes = () => Axios.get(`countries`);

export const getDeviceTypes = () => Axios.get(`devices`);

export const getSavedTargetingRules = () => Axios.get(`rules`);

export const addNewRules = (payload) => Axios.post(`rules`, payload);

export const deleteTargetingRules = (payload) => Axios.delete(`rules`, payload);
