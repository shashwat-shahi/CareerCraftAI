import { useState, useEffect } from 'react';
import jobs from '../data/jobs.json';

const Jobboard = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center space-y-4">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="48"
          height="48"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="animate-pulse"
        >
          <path d="M4 5h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2z" />
          <path d="M8 11h8v6H8z" />
          <path d="M8 7v4" />
          <path d="M16 7v4" />
        </svg>
        <p className="text-lg font-semibold">Fetching Jobs...</p>
      </div>
    );
  }

  return (
    <>
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-3 gap-6">
          {jobs.map((job) => (
            <div key={job.id} className="border rounded-lg p-6 shadow-md">
              <div className='logo w-16 h-16 mb-2'>
                {job.logo && <img src={job.logo} alt={`${job.logo} logo`} className=" mb-4 cursor-pointer" />}
              </div>
              <div className='title'>
                <div className='job-title mb-2'>{job.position}</div>
                <div className='job-details flex gap-4 mb-2'>
                  <div className='company-name text-sm'>{job.companyName}</div>
                  <div>•</div>
                  <div className='company-location text-sm'>{job.location}</div>
                </div>
              </div>
              <div className='link flex gap-4'>
                <div className='apply bg-blue-500 text-white rounded w-full p-2 text-center'>
                  <a href={job.applyLink} target="_blank" rel="noopener noreferrer">Apply</a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Jobboard;