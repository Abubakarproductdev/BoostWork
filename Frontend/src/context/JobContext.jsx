import React, { createContext, useContext, useState } from 'react';

const JobContext = createContext();

export const useJobContext = () => {
  const context = useContext(JobContext);
  if (!context) {
    throw new Error('useJobContext must be used within a JobProvider');
  }
  return context;
};

// Initial mock data to give the dashboard a populated feel initially
const initialJobs = [
  {
    id: 1,
    title: 'Full Stack React Node Developer Needed',
    budget: '$50/hr',
    connectsCost: 16,
    status: 'response', // response, no_response, view
    completed: true,
    appliedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(), // 2 days ago
    clientRate: '$45/hr avg',
    clientRegion: 'United States',
    isClientVerified: true,
    amountSpent: '$10k+',
    clientAge: '2 years',
    clientStars: 4.8,
    description: 'We are looking for a senior developer to build out our frontend application using React and Tailwind, and connect it to our existing Node/Express APIs.',
    proposal: 'Hi there, I am a senior full-stack developer with extensive experience in React, Node, and Tailwind. I would love to tackle this project and build a stunning frontend for you.'
  },
  {
    id: 2,
    title: 'Build modern dashboard for analytics',
    budget: '$1500 fixed',
    connectsCost: 12,
    status: 'view',
    completed: true,
    appliedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    clientRate: 'N/A',
    clientRegion: 'Australia',
    isClientVerified: false,
    amountSpent: '$0',
    clientAge: '1 month',
    clientStars: 0,
    description: 'Need a developer to create a simple dashboard interface using Recharts to visualize user metrics.',
    proposal: 'I specialize in creating beautiful data visualization dashboards with Recharts and Tailwind. I can complete this well within your budget.'
  },
  {
    id: 3,
    title: 'React native expert for bug fixing',
    budget: '$30/hr',
    connectsCost: 8,
    status: 'no_response',
    completed: false,
    appliedAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
    clientRate: '$25/hr avg',
    clientRegion: 'United Kingdom',
    isClientVerified: true,
    amountSpent: '$500+',
    clientAge: '1 year',
    clientStars: 4.5,
    description: 'We have some layout bugs in our React Native app that need fixing ASAP.',
    proposal: 'I can fix your layout bugs today. Here is my portfolio showing previous RN work.'
  }
];

export const JobProvider = ({ children }) => {
  const [jobs, setJobs] = useState(initialJobs);

  const addJob = (job) => {
    setJobs([{ ...job, id: Date.now() }, ...jobs]);
  };

  const updateJob = (id, updatedJob) => {
    setJobs(jobs.map((job) => (job.id === id ? { ...job, ...updatedJob } : job)));
  };

  return (
    <JobContext.Provider value={{ jobs, addJob, updateJob }}>
      {children}
    </JobContext.Provider>
  );
};
