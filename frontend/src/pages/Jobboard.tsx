import jobs from '../data/jobs.json';


const Jobboard = () => {


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
                <div className='job-title  mb-2'>{job.position}</div>
                <div className='job-details flex gap-4  mb-2'>
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
