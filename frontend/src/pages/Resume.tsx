// @ts-nocheck
import { AppDispatch, RootState } from "@/state/store";
import { getUserAsync } from "@/state/user/userSlice";
import React, { useState, useEffect, useCallback } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import useFetch from "../hooks/use-fetch"
import "react-pdf/dist/esm/Page/TextLayer.css";

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
  const [loader, setLoading] = useState(true);
  const [fault, setError] = useState(null);

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

  console.log("userJson dashboard", JSON.stringify(userJson))
  
  const url = `${import.meta.env.VITE_BACKEND_URL}/user/getResume?fileName=${userJson?.resumeLink}`; 
  console.log(url)
  const {val, loading, error} = useFetch(url)
  console.log(val, loading, error)
  useEffect(() => {
    fetch(url, {
      method: 'GET',
      credentials: 'include' // Ensures cookies are sent with the request
    })
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.blob();
    })
    .then(blob => {
      const fileBlob = new Blob([blob], { type: 'application/pdf' });
      setFile(URL.createObjectURL(fileBlob)); // Create a URL for the blob object
      setLoading(false);
    })
    .catch(e => {
      setError(`Error fetching PDF: ${e.message}`);
      setLoading(false);
    });
  }, []);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  const textRenderer = useCallback(
    (textItem) => highlightPattern(textItem.str, searchText),
    [searchText]
  );

  return (
    <div className="flex justify-center items-center min-h-screen">
      {loader && <p>Loading PDF...</p>}
      {fault && <p>{fault}</p>}

     
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