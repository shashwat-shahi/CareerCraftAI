import { Link } from 'react-router-dom';
import RoadMapImage from '../../public/image.png'
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/state/store';
import { getUserAsync } from '@/state/user/userSlice';
import { useEffect } from 'react';

function Roadmap() {
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

  return (
    <div className="flex justify-center mt-10">
      <img src={RoadMapImage} />
    </div>
  )
}

export default Roadmap