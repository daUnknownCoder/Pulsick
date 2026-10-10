import { createContext, useContext } from "react";

export const AuthContext = createContext({ session: null, loading: true });
export default function useAuth() {
  return useContext(AuthContext);
}
