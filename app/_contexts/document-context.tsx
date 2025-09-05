'use client';

import { createContext, useContext, useState, ReactNode } from 'react';

type DocumentContextType = {
  html: string;
  setHtml: React.Dispatch<React.SetStateAction<string>>;
};

const DocumentContext = createContext<DocumentContextType | undefined>(
  undefined
);

export function useDocument() {
  const context = useContext(DocumentContext);
  if (!context) {
    throw new Error('useDocument must be used within a DocumentProvider');
  }
  return context;
}

export function DocumentProvider({ children }: { children: ReactNode }) {
  const [html, setHtml] = useState('Start Writing...');

  return (
    <DocumentContext.Provider value={{ html, setHtml }}>
      {children}
    </DocumentContext.Provider>
  );
}
