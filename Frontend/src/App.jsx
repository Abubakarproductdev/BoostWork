import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import OverallPerformance from './pages/OverallPerformance';
import ProposalPerformance from './pages/ProposalPerformance';
import ProposalWriting from './pages/ProposalWriting';
import ClientLeadGeneration from './pages/ClientLeadGeneration';
import CustomizeDetails from './pages/CustomizeDetails';
import { JobProvider } from './context/JobContext';

function App() {
  return (
    <JobProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<OverallPerformance />} />
            <Route path="proposals" element={<ProposalPerformance />} />
            <Route path="write" element={<ProposalWriting />} />
            <Route path="leads" element={<ClientLeadGeneration />} />
            <Route path="profile" element={<CustomizeDetails />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </JobProvider>
  );
}

export default App;
