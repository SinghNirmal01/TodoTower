import React from 'react';
import {createRoot} from 'react-dom/client';

import ErrorBoundary from './components/errorBoundary/ErrorBoundary.jsx';
import App from './App';
import './index.css';

const root = createRoot(document.getElementById('root'));
root.render(
	<ErrorBoundary>
		<App />
	</ErrorBoundary>
);
