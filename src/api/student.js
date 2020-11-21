import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:3001';
axios.defaults.headers.post['Content-Type'] = 'application/json;charset=utf-8';
axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';

export const getStudentJobList = async () => {
  try {
    const response = await axios.get(`/task-student`);
    return response.data;
  } catch (err) {
    return err;
  }
};

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

export const updateApp = async (appData) => {
  try {
    const response = await axios.patch(`/application`, appData);
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

export const getAssessmentByJobId = async (jobId) => {
  try {
    const response = await axios.get(`/assessment/job/${jobId}`);
    return response.data; 
  } catch(err) {
    return err;
  }
}

export const createApp = async (app) => {
  try {
    const response = await axios.post(`/application`, app);
    return response.data;
  } catch (err) {
    return err;
  }
}