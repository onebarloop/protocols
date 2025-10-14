'use client';

import {
  createContext,
  useContext,
  ReactNode,
  useReducer,
  Dispatch,
} from 'react';
import type { NewProtocol } from '@/types/db-types';
import type { SerializedEditorState } from 'lexical';

type Action =
  | { type: 'setSerializedState'; payload: SerializedEditorState }
  | { type: 'setName'; payload: string }
  | { type: 'setIcon'; payload: string };

type DocumentContextType = {
  protocolState: NewProtocol;
  protocolDispatch: Dispatch<Action>;
};

const initialState: NewProtocol = {
  name: 'New Protocol',
  icon: '🧪',
  serializedState: undefined,
};

const DocumentContext = createContext<DocumentContextType | undefined>(
  undefined,
);

function reducer(state: NewProtocol, action: Action): NewProtocol {
  switch (action.type) {
    case 'setSerializedState':
      return {
        ...state,
        serializedState: action.payload,
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
