import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:3001';
axios.defaults.headers.post['Content-Type'] = 'application/json;charset=utf-8';
axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';

export const getJobList = async (email) => {
  try {
    const response = await axios.get(`/task`, {
      params: { employerEmail: email },
    });
    return response.data;
  } catch (err) {
    return err;
  }
};

export const getAllJobList = async () => {
  try {
    const response = await axios.get(`/task`, { params: {} });
    return response.data;
  } catch (err) {
    return err;
  }
};

export const getJobById = async (jobId) => {
  try {
    const response = await axios.get(`/task`, { params: { taskId: jobId } });
    return response.data;
  } catch (err) {
    return err;
  }
};

export const createJob = async (job) => {
  try {
    const response = await axios.post(`/task`, job);
    return response.data;
  } catch (err) {
    return err;
  }
};

export const updateJobById = async (jobData) => {
  try {
    const response = await axios.patch(`/task`, jobData);
    return response.data;
  } catch (err) {
    return err;
  }
};

export const deleteJobById = async (jobId) => {
  try {
    const response = await axios.delete(`/task`, { data: { taskId: jobId } });
    return response.data;
  } catch (err) {
    return err;
  }
};
