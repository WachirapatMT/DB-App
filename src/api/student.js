import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:3001';
axios.defaults.headers.post['Content-Type'] = 'application/json;charset=utf-8';
axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';

export const getAppList = async () => {
  try {
    const response = await axios.get(`/application`, {
      params: {},
    });
    return response.data;
  } catch (err) {
    return err;
  }
};

export const getAppByEmail = async (email) => {
  try {
    const response = await axios.get(`/application`, {
      params: { studentEmail: email },
    });
    return response.data;
  } catch (err) {
    return err;
  }
};

export const getAppById = async (appId) => {
  try {
    const response = await axios.get(`/application`, {
      params: { applicationId: appId },
    });
    return response.data;
  } catch (err) {
    return err;
  }
};

export const deleteAppById = async (appId) => {
  try {
    const response = await axios.delete(`/application`, {
      data: { applicationId: appId },
    });
    return response.data;
  } catch (err) {
    return err;
  }
};
