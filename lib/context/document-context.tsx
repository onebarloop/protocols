'use client';

import {
  createContext,
  useContext,
  ReactNode,
  useReducer,
  Dispatch,
} from 'react';
import type { NewProtocol, Protocol } from '@/types/db-types';
import type { SerializedEditorState } from 'lexical';
import { isExistingProtocol } from '@/types/typeguard';

type Action =
  | { type: 'setSerializedState'; payload: SerializedEditorState }
  | { type: 'setName'; payload: string }
  | { type: 'setIcon'; payload: string };

type DocumentContextType = {
  protocolState: NewProtocol | Protocol;
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

function reducer<T extends NewProtocol | Protocol>(
  state: T,
  action: Action,
): T {
  switch (action.type) {
    case 'setSerializedState':
      return { ...state, serializedState: action.payload };
    case 'setName':
      return { ...state, name: action.payload };
    case 'setIcon':
      return { ...state, icon: action.payload };
    default:
      return state;
  }
}

export function useDocument(): DocumentContextType {
  const context = useContext(DocumentContext);
  if (!context) {
    throw new Error('useDocument must be used within a DocumentProvider');
  }
  return context;
}

export function DocumentProvider({
  children,
  documentState,
}: {
  children: ReactNode;
  documentState?: Protocol;
}) {
  if (documentState && !isExistingProtocol(documentState)) {
    throw new Error('Invalid protocol state provided to DocumentProvider');
  }

  const [protocolState, protocolDispatch] = useReducer(
    reducer,
    documentState || initialState,
  );

  return (
    <DocumentContext.Provider value={{ protocolState, protocolDispatch }}>
      {children}
    </DocumentContext.Provider>
  );
}
