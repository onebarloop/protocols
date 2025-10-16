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

type Action =
  | { type: 'setSerializedState'; payload: SerializedEditorState }
  | { type: 'setName'; payload: string }
  | { type: 'setIcon'; payload: string };

type DocumentContextType<T> = {
  protocolState: T;
  protocolDispatch: Dispatch<Action>;
};

const initialState: NewProtocol = {
  name: 'New Protocol',
  icon: '🧪',
  serializedState: undefined,
};

const DocumentContext = createContext<
  DocumentContextType<NewProtocol> | DocumentContextType<Protocol> | undefined
>(undefined);

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

// Overloaded hook signatures with proper constraints
export function useDocument(): DocumentContextType<NewProtocol>;
export function useDocument<T extends Protocol>(): DocumentContextType<T>;
export function useDocument<
  T extends NewProtocol | Protocol = NewProtocol,
>(): DocumentContextType<T> {
  const context = useContext(DocumentContext);
  if (!context) {
    throw new Error('useDocument must be used within a DocumentProvider');
  }
  return context as DocumentContextType<T>;
}

export function DocumentProvider(props: {
  children: ReactNode;
}): React.JSX.Element;
export function DocumentProvider<T extends Protocol>(props: {
  children: ReactNode;
  documentState: T;
}): React.JSX.Element;

export function DocumentProvider({
  children,
  documentState,
}: {
  children: ReactNode;
  documentState?: Protocol;
}) {
  // Validate that if documentState is provided, it has required fields
  if (documentState && !documentState.id) {
    throw new Error(
      'Protocol is missing id',
    );
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

export function isExistingProtocol(protocol: NewProtocol | Protocol): protocol is Protocol {
  return 'id' in protocol && protocol.id !== undefined;
}
