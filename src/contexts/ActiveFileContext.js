import {createContext, useContext} from 'react';

export const fileContext = createContext({
  activeFile:"App"
});

export const FileProvider = fileContext.Provider;

export const useFile = () => {
	return useContext(fileContext);
};
