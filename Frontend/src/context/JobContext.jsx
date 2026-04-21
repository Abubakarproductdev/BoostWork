import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { API_BASE } from '../lib/utils';

const JobContext = createContext();

export const useJobContext = () => {
  const context = useContext(JobContext);
  if (!context) {
    throw new Error('useJobContext must be used within a JobProvider');
  }
  return context;
};

const PROPOSALS_CACHE_KEY = 'global-jobs-cache-v1';
const PROPOSALS_CACHE_TTL_MS = 5 * 60 * 1000;

export const JobProvider = ({ children }) => {
  const [jobs, setJobs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const normalizeProposal = (job) => ({
    ...job,
    connectsCost: job.jobDetails?.connectsCost ?? 0,
    description: job.jobDetails?.description || '',
    clientRegion: job.clientInfo?.region || '',
    clientRate: job.clientInfo?.hireRate || '',
    amountSpent: job.clientInfo?.totalSpent || '',
    clientAge: job.clientInfo?.memberSince || '',
    isClientVerified: job.clientInfo?.isPaymentVerified || false,
    proposal: job.proposalText || '',
    appliedAt: job.submissionDate,
    budgetDisplay: job.budget?.amount
      ? `${job.budget.amount}${job.budget?.type === 'hourly' ? '/hr' : ''}`
      : 'N/A',
  });

  const fetchJobs = useCallback(async (force = false) => {
    try {
      if (!force) {
        const raw = localStorage.getItem(PROPOSALS_CACHE_KEY);
        if (raw) {
          const parsed = JSON.parse(raw);
          if (parsed?.timestamp && Array.isArray(parsed?.data)) {
            if (Date.now() - parsed.timestamp <= PROPOSALS_CACHE_TTL_MS) {
              setJobs(parsed.data);
              setIsLoading(false);
              return;
            }
          }
        }
      }

      const response = await fetch(`${API_BASE}/api/proposals`);
      const data = await response.json();

      if (response.ok && data.success) {
        const normalizedJobs = data.data.map(normalizeProposal);
        setJobs(normalizedJobs);
        localStorage.setItem(PROPOSALS_CACHE_KEY, JSON.stringify({
          timestamp: Date.now(),
          data: normalizedJobs,
        }));
      }
    } catch (error) {
      console.error('Error fetching jobs for context:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchJobs();
  }, [fetchJobs]);

  const addJob = (job) => {
    const newJobs = [normalizeProposal(job), ...jobs];
    setJobs(newJobs);
    localStorage.setItem(PROPOSALS_CACHE_KEY, JSON.stringify({
      timestamp: Date.now(),
      data: newJobs,
    }));
  };

  const updateJob = (id, updatedJob) => {
    const newJobs = jobs.map((job) => (job._id === id || job.id === id ? normalizeProposal(updatedJob) : job));
    setJobs(newJobs);
    localStorage.setItem(PROPOSALS_CACHE_KEY, JSON.stringify({
      timestamp: Date.now(),
      data: newJobs,
    }));
  };

  return (
    <JobContext.Provider value={{ jobs, isLoading, addJob, updateJob, refreshJobs: () => fetchJobs(true) }}>
      {children}
    </JobContext.Provider>
  );
};
