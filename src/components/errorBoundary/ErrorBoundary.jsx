import React, {Component} from 'react';

class ErrorBoundary extends Component {
	constructor(props) {
		super(props);
		this.state = {hasError: false, error: null, errorInfo: null};
	}

	componentDidCatch(error, errorInfo) {
		// Catch errors in any components below and log them to console
		console.error('ErrorBoundary caught an error', error, errorInfo);

		// Update state to trigger UI update with error details
		this.setState({
			hasError: true,
			error: error,
			errorInfo: errorInfo
		});
	}

	render() {
		if (this.state.hasError) {
			return (
				<div className='bg-red-500 text-white p-6 rounded-lg shadow-lg overflow-scroll'>
					<h2 className='text-2xl font-bold'>Something went wrong.</h2>
					<div className='mt-4'>
						<p className='font-semibold'>Error:</p>
						<pre className='bg-red-700 p-4 rounded overflow-scroll'>
							{this.state.error.toString()}
						</pre>
					</div>
					<div className='mt-4'>
						<p className='font-semibold'>Stack Trace:</p>
						<pre className='bg-red-700 p-4 rounded overflow-scroll'>
							{this.state.errorInfo.componentStack}
						</pre>
					</div>
				</div>
			);
		}

		return this.props.children;
	}
}

export default ErrorBoundary;
