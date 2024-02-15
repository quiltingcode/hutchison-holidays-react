import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const useRedirect = (userAuthStatus) => {
    const navigateTo = useNavigate();
    const refreshToken = localStorage.getItem('refresh_token');

    useEffect(() => {
        const handleMount = async () => {
            // console.log('redirect refresh')
            try {
                await axios.post('/api/token/refresh/', { refresh: refreshToken })
                if (userAuthStatus === 'loggedIn'){
                    navigateTo('/bookings')
                }
            } catch (err) {
                if (userAuthStatus === 'loggedOut'){
                    navigateTo('/')
                }
            }
        };

        handleMount();
    }, [navigateTo, userAuthStatus, refreshToken]);

};