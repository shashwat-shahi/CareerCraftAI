// @ts-nocheck
import { AppDispatch, RootState } from "@/state/store";
import { getUserAsync } from "@/state/user/userSlice";
import React, { useState, useEffect, useCallback } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import useFetch from "../hooks/use-fetch"
import "react-pdf/dist/esm/Page/TextLayer.css";
import 'react-pdf/dist/Page/AnnotationLayer.css';
import { Link } from "react-router-dom";

// Setup the PDF.js worker
pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.js',
  import.meta.url,
).toString();

// Function to wrap matched text with a highlight markup for each pattern
function highlightPattern(text, patterns) {
  patterns.forEach(pattern => {
    const regex = new RegExp(pattern, 'gi'); // Case insensitive search, global match
    text = text.replace(regex, (match) => `<mark>${match}</mark>`);
  });
  return text;
}

function Resume() {
  const [searchText, setSearchText] = useState([]); // Initialize with an array of search texts
  const [file, setFile] = useState(null);
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  let userId = ""
    const [searchParams, setSearchParams] = useSearchParams()
    if(searchParams.get("userId")){
        userId = searchParams.get("userId") || ""
        localStorage.setItem("userId", userId)
    }
    
    if(localStorage.getItem("userId") != null) {
        userId = localStorage.getItem("userId") || ""
    }
    const dispatch = useDispatch<AppDispatch>();
     useEffect(() => {
    dispatch(getUserAsync(userId))
    }, [])

  const userJson:any = useSelector((state: RootState) => state.user.value)
  
  const url = `${import.meta.env.VITE_BACKEND_URL}/user/getResume?fileName=${userJson?.resumeLink}`; 
  
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
      setLoading(true);
      setError(null);
  
      try {
        if (!userJson?.resumeLink) {
          throw new Error("Please upload a resume first");
        }
  
        const response = await fetch(url, {
          method: 'GET',
          credentials: 'include' // Ensures cookies are sent with the request
        });
  
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const blob = await response.blob();
        const fileBlob = new Blob([blob], { type: 'application/pdf' });
        setFile(URL.createObjectURL(fileBlob)); // Create a URL for the blob object
        setLoading(false);
      } catch (e) {
        setError(`Error fetching PDF: ${e.message}`);
        setLoading(false);
      }
    };
  
    fetchData();
  }, [url, userJson?.resumeLink]);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  const textRenderer = useCallback(
    (textItem) => highlightPattern(textItem.str, searchText),
    [searchText]
  );

  return (
    <div className="flex justify-center items-center min-h-screen">
      {loading && <p><svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="animate-spin"
      >
        <path d="M21 12a9 9 0 1 1-6.219-8.56" />
      </svg></p>}
      {error && <p><svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="animate-spin"
      >
        <path d="M21 12a9 9 0 1 1-6.219-8.56" />
      </svg></p>}
      {file && (
        <Document
          file={file}
          onLoadSuccess={onDocumentLoadSuccess}
        >
          <Page 
            pageNumber={pageNumber} 
            customTextRenderer={textRenderer} // Apply highlighting for each pattern
          />
        </Document>
      )}  
    </div>
  )
}

export default Resume