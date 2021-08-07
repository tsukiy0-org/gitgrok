import React, { useContext } from "react";

// eslint-disable-next-line @typescript-eslint/ban-types
type ServiceContextValue = {};

const ServiceContext = React.createContext<ServiceContextValue>({} as any);

export const ServiceContextProvider: React.FC = ({ children }) => {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL!;

  return (
    <ServiceContext.Provider value={{}}>{children}</ServiceContext.Provider>
  );
};

export const useServiceContext = (): ServiceContextValue =>
  useContext(ServiceContext);
