import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:3001';
axios.defaults.headers.post['Content-Type'] ='application/json;charset=utf-8';
axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';

export const getJobList = async (email) => {
  try {
    const response = await axios.get(`/task`, {params: {employerEmail: email}});
    return response.data;
  } catch(err) {
    return err;
  }
};

export const getJobById = async (jobId) => {
  try {
    const response = await axios.get(`/task`, {params: {taskId: jobId}});
    return response.data;
  } catch(err) {
    return err;
  }
};

export const updateJobById = async (jobData) => {
  try {
    const response = await axios.patch(`/task`, jobData);
    console.log(response)
    return response.data;
  } catch(err) {
    return err;
  }
};

export const deleteJobById = async (jobId) => {
  try {
    const response = await axios.delete(`/task`, {data: {taskId: jobId}});
    return response.data;
  } catch(err) {
    return err;
  }
};

export const jobCreate = async (values, email) => {
  try {
    const data = await axios.post(
      'http://localhost:3001/task',
      {
        title: values.title,
        description: values.description,
        minCompensation: values.minCompensation,
        maxCompensation: values.maxCompensation,
        minQuota: values.minQuota,
        maxQuota: values.maxQuota,
        paymentMethod: values.paymentMethod,
        employerEmail: email,
        fieldsOfWork: [values.fieldsOfWork],
      }
    )
    console.log("success")
    console.log(data)
    return data
  } catch (error) {
    console.log(error)
    return { error }
  }
}