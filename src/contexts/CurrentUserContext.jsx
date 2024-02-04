import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import axios from 'axios';
import { axiosRes, axiosReq } from '../api/axiosDefaults';
import { useNavigate } from "react-router-dom";
import { removeTokenTimestamp, shouldRefreshToken } from '../utils/Utils';


export const CurrentUserContext = createContext()
export const SetCurrentUserContext = createContext()

const refreshToken = localStorage.getItem('refresh_token');

export const useCurrentUser = () => useContext(CurrentUserContext)
export const useSetCurrentUser = () => useContext(SetCurrentUserContext)

export const CurrentUserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const navigateTo = useNavigate();


  const handleMount = async () => {
    try {
      const accessToken = localStorage.getItem('access_token');
      const headers = {
        Authorization: `Bearer ${accessToken}`,
      };
      const { data } = await axios.get('dj-rest-auth/user/', { headers });
      // console.log('user data', data);
      setCurrentUser(data.first_name);
    } catch (error) {
      console.error('Error fetching user data:', error);
      setCurrentUser(null); // Set current user to null on error
      if (error.response && error.response.status === 401) {
        // Handle unauthorized access (e.g., navigate to signin)
        navigateTo('/');
      }
    }
  };

  useEffect(() => {
    

    const interceptorRequest = axiosReq.interceptors.request.use(
      async (config) => {
        if (shouldRefreshToken()) {
          try {
            console.log('refreshing token');
            await axios.post("/api/token/refresh/", { refresh: refreshToken });
          } catch (err) {
            setCurrentUser((prevCurrentUser) => {
              if (prevCurrentUser) {
                navigateTo("/");
              }
              return null;
            });
            removeTokenTimestamp();
            return config;
          }
        }

        return config;
      },
      (err) => Promise.reject(err)
    );

    const interceptorResponse = axiosRes.interceptors.response.use(
      (response) => response,
      async (err) => {
        if (err.response?.status === 401) {
          try {
            console.log('refreshing token');
            await axios.post("/api/token/refresh/", { refresh: refreshToken });
          } catch (err) {
            setCurrentUser((prevCurrentUser) => {
              if (prevCurrentUser) {
                navigateTo("/");
              }
              return null;
            });
            removeTokenTimestamp();
          }
          return axios(err.config);
        }
        return Promise.reject(err);
      }
    );
    handleMount()

    // Cleanup interceptors on unmount or dependency change
    return () => {
      axiosReq.interceptors.request.eject(interceptorRequest);
      axiosRes.interceptors.response.eject(interceptorResponse);
    };
    
  }, [navigateTo]);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <SetCurrentUserContext.Provider value={setCurrentUser}>
        {children}
      </SetCurrentUserContext.Provider>
    </CurrentUserContext.Provider>
  );
};