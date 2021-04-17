import { createContext, useContext } from "react";

export const UserStoreContext = createContext({});

export const useUserStoreContext = () => useContext(UserStoreContext);
