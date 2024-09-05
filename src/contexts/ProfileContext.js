import {createContext, useContext} from 'react';

export const ProfileContext = createContext();

export const ProfileProvider = ProfileContext.Provider;

export const useProfile = () => {
	return useContext(ProfileContext);
};
