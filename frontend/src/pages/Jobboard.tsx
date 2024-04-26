import jobs from '../data/jobs.json';
import React, { useState, useEffect, ChangeEvent } from 'react';
import { Job } from '../pages/Jobs';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/state/store';
import { getUserAsync } from '@/state/user/userSlice';

const jobListings: Job[] = jobs;

const Jobboard: React.FC = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  let userId = ""

  if(localStorage.getItem("userId") != null) {
    userId = localStorage.getItem("userId") || ""
}

  const dispatch = useDispatch<AppDispatch>();
     useEffect(() => {
    dispatch(getUserAsync(userId))
    }, [])

    const userJson:any = useSelector((state: RootState
    ) => state.user.value)


    if(!userJson?.resumeLink){
      return <div className="min-h-screen flex flex-col items-center justify-center space-y-4">
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
        className="animate-bounce"
      >
        <path d="M4 14v6a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-6" />
        <path d="M14 4h-4a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h4a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2z" />
        <path d="M12 11v5" />
        <path d="M10 14h4" />
      </svg>
      <p className="text-lg font-semibold"><Link to="/" className="text-blue-500 underline">Please Upload Your Resume</Link></p>
    </div>
    }

  useEffect(() => {
    const fetchData = async () => {
      const getCompanyLogo = async (company: string) => {
        try {
          const response = await axios.get(`https://company.clearbit.com/v1/domains/find?name=${company}`, {
            headers: {
              Authorization: `Bearer sk_f4b3f0bdcb92f0aecd164a7033254af6`,
            },
          });

          const domain = response.data.domain;
          return `https://logo.clearbit.com/${domain}`;
        } catch (error) {
          console.error('Error fetching company logo:', error);
          const randomString = Array.from({ length: 10 }, () =>
            String.fromCharCode(97 + Math.floor(Math.random() * 26))
          ).join('');

          return `https://example.com/logo-${company.replace(' ', '-').toLowerCase()}-${randomString}.png`;
        }
      };

      const filteredJobs = jobListings.filter(job => 
        job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.position.toLowerCase().includes(searchTerm.toLowerCase())
      );

      const updatedData = await Promise.all(
        filteredJobs.map(async (job) => {
          try {
            job.logoLink = await getCompanyLogo(job.company);
          } catch (error) {
            console.error('Error setting company logo:', error);
          }
          return job;
        })
      );

      setJobs(updatedData);
    };

    fetchData();
  }, [searchTerm]);

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const openModal = (job: Job) => {
    setSelectedJob(job);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedJob(null);
    setIsModalOpen(false);
  };

  return (
    <>
      <div className="container mx-auto px-4 py-8">
        <div className='text-3xl mb-4'>Search for Jobs</div>
        <div className="mb-6">
          <input
            type="text"
            placeholder="Search jobs..."
            className="w-full p-2 rounded-md border text-black"
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </div>
        <div className="grid grid-cols-3 gap-6">
          {jobs.map((job: Job) => (
            <div key={job.id} className="border rounded-lg p-6 shadow-md bg-gray-800">
              <div className='logo w-16 h-16 mb-2'>
                {job.logoLink && <img src={job.logoLink} alt={`${job.company} logo`} className=" mb-4 cursor-pointer" onClick={() => openModal(job)} />}
              </div>
              <div className='title'>
                <div className='job-title  mb-2'>{job.position}</div>
                <div className='job-details flex gap-4  mb-2'>
                  <div className='company-name text-sm'>{job.company}</div>
                  <div>•</div>
                  <div className='company-location text-sm'>{job.location}</div>
                </div>
              </div>
              <div className='link flex gap-4'>
                <div className='apply border rounded w-[50%] p-2 text-center bg-black text-white'><a href={job.applyLink} target="_blank" rel="noopener noreferrer">Apply</a></div>
                <div className='details border rounded w-[50%] p-2 text-center bg-black text-white cursor-pointer' onClick={() => openModal(job)}>Details</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {isModalOpen && selectedJob && (
        <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50 text-white">
          <div className="bg-gray-800 p-8 rounded-lg w-1/2">
            <div className="flex justify-between items-center">
              <div></div>
              <button onClick={closeModal} className="text-red-500 text-lg">
                &times;
              </button>
            </div>
            <div className='flex gap-4'>
              <img src={selectedJob.logoLink || ''} alt={`${selectedJob.company} logo`} className="w-16 h-16 mb-4" />
              <div>
                <h3 className="text-xl font-semibold ">{selectedJob.position}</h3>
                <h2 className="text-md ">{selectedJob.company}</h2>
              </div>
            </div>
            <p className="text-base mb-4">{selectedJob.jobdescription}</p>
            <a href={selectedJob.applyLink} target="_blank" rel="noopener noreferrer" className="text-blue-500 font-bold hover:underline">Apply Now</a>
          </div>
        </div>
      )}
    </>
  );
};

export default Jobboard;
