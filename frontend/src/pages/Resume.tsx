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
import file from "../data/ShashwatShahi_Resume(MLE).pdf"

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
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

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