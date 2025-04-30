"use client";

import { deleteAuthToken, hasAuthToken } from "@/actions/headers";
import { ApiError } from "@/http/errors/api-error";
import { getUser, IUser } from "@/http/requests/users";
import {
  ReactNode,
  createContext,
  useCallback,
  useEffect,
  useState,
} from "react";
import { toast } from "sonner";

export interface AuthContextProps {
  user: IUser | undefined;
  setUser: (user: IUser) => void;
  avatarUrl: string | undefined;
  setAvatarUrl: (url: string) => void;
  isLoadingUserData: boolean;
  removeUserAndToken: () => Promise<void>;
  loadUserData: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextProps>(
  {} as AuthContextProps
);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<IUser>({} as IUser);
  const [avatarUrl, setAvatarUrl] = useState<string | undefined>();
  const [isLoadingUserData, setIsLoadingUserData] = useState(true);

  const removeUserAndToken = useCallback(async () => {
    setIsLoadingUserData(true);

    setUser({} as IUser);
    await deleteAuthToken();

    window.location.href = "/login";

    setIsLoadingUserData(false);
  }, []);

  const loadUserData = useCallback(async () => {
    try {
      const token = await hasAuthToken();

      if (token) {
        const { user: loadedUser } = await getUser();

        setUser(loadedUser);
      }
    } catch (error) {
      if (error instanceof ApiError) {
        toast.error(error.message);
      }

      await removeUserAndToken();
    } finally {
      setIsLoadingUserData(false);
    }
  }, [removeUserAndToken]);

  useEffect(() => {
    loadUserData();
  }, [loadUserData]);

  return (
    <AuthContext.Provider
      value={{
        user,
        avatarUrl,
        isLoadingUserData,
        removeUserAndToken,
        loadUserData,
        setAvatarUrl,
        setUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
