'use client';

import { createContext, useContext, ReactNode, useOptimistic } from 'react';
import { ProtocolNavItemsQueryResult } from '@/lib/dal/queries';

type ProtocolsContextType = {
  optimisticProtocols: ProtocolNavItemsQueryResult[];
  addProtocolOptimistic: (protocol: ProtocolNavItemsQueryResult) => void;
  updateProtocolOptimistic: (protocol: ProtocolNavItemsQueryResult) => void;
  deleteProtocolOptimistic: (id: string) => void;
};

const ProtocolsContext = createContext<ProtocolsContextType | undefined>(
  undefined,
);

type ProtocolAction =
  | { type: 'add'; protocol: ProtocolNavItemsQueryResult }
  | { type: 'update'; protocol: ProtocolNavItemsQueryResult }
  | { type: 'delete'; id: string }
  | {
      type: 'replaceTempId';
      tempId: string;
      protocol: ProtocolNavItemsQueryResult;
    };

export function ProtocolsProvider({
  children,
  initialProtocols,
}: {
  children: ReactNode;
  initialProtocols: ProtocolNavItemsQueryResult[];
}) {
  const [optimisticProtocols, setOptimisticProtocols] = useOptimistic(
    initialProtocols,
    (state, action: ProtocolAction) => {
      switch (action.type) {
        case 'add':
          return [...state, action.protocol];
        case 'update':
          return state.map((p) =>
            p.id === action.protocol.id ? action.protocol : p,
          );
        case 'delete':
          return state.filter((p) => p.id !== action.id);
        case 'replaceTempId':
          return state.map((p) =>
            p.id === action.tempId ? action.protocol : p,
          );
        default:
          return state;
      }
    },
  );

  const addProtocolOptimistic = (protocol: ProtocolNavItemsQueryResult) => {
    setOptimisticProtocols({ type: 'add', protocol });
  };

  const updateProtocolOptimistic = (protocol: ProtocolNavItemsQueryResult) => {
    setOptimisticProtocols({ type: 'update', protocol });
  };

  const deleteProtocolOptimistic = (id: string) => {
    setOptimisticProtocols({ type: 'delete', id });
  };

  return (
    <ProtocolsContext.Provider
      value={{
        optimisticProtocols,
        addProtocolOptimistic,
        updateProtocolOptimistic,
        deleteProtocolOptimistic,
      }}
    >
      {children}
    </ProtocolsContext.Provider>
  );
}

export function useProtocols(): ProtocolsContextType {
  const context = useContext(ProtocolsContext);
  if (!context) {
    throw new Error('useProtocols must be used within a ProtocolsProvider');
  }
  return context;
}
