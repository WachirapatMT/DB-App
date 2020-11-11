export const getJobList = async (id) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        {
          id: 'job-1',
          title: 'Create a New Prototype of Macbook Pro 2025',
          description:
            'The prototype should be the same as 2024, just some few tweaks.',
          fieldOfWork: ['Design', 'Hardware'],
          minQuota: 5,
          maxQuota: 7,
          minCompensation: 50000,
          maxCompensation: 100000,
        },
        {
          id: 'job-2',
          title: 'Debug NASA Spaceship',
          description: 'NASA kor pa ter glub ma mai dai T T',
          fieldOfWork: ['Repairment', 'Hardware'],
          minQuota: 10,
          maxQuota: 20,
          minCompensation: 100000,
          maxCompensation: 300000,
        },
      ]);
    }, 500);
  });
};
