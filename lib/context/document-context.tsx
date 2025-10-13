'use client';

import {
  createContext,
  useContext,
  ReactNode,
  useReducer,
  ActionDispatch,
} from 'react';
import type { NewProtocol } from '@/types/db-types';

type Action = {
  type: 'setHtml' | 'setName' | 'setIcon';
  payload: string;
};

type DocumentContextType = {
  protocolState: NewProtocol;
  protocolDispatch: ActionDispatch<[action: Action]>;
};

const initialState: NewProtocol = { name: 'New Protocol', html: 'Test', icon: '🧪' };

const DocumentContext = createContext<DocumentContextType | undefined>(
  undefined,
);

function reducer(state: NewProtocol, action: Action) {
  switch (action.type) {
    case 'setHtml':
      return {
        ...state,
        html: action.payload,
      };
    case 'setName':
      return {
        ...state,
        name: action.payload,
      };
    case 'setIcon':
      return {
        ...state,
        icon: action.payload,
      };
    // more cases yet to come
    default:
      return state;
  }
}

export function useDocument() {
  const context = useContext(DocumentContext);
  if (!context) {
    throw new Error('useDocument must be used within a DocumentProvider');
  }
  return context;
}

export function DocumentProvider({ children }: { children: ReactNode }) {
  const [protocolState, protocolDispatch] = useReducer(reducer, initialState);

  return (
    <DocumentContext.Provider value={{ protocolState, protocolDispatch }}>
      {children}
    </DocumentContext.Provider>
  );
}
