import React from 'react';

const Footer = () => {
	return (
		<div className='p-4 bg-emerald-400 w-[100vw] mb-0 flex items-center justify-between md:p-8'>
			<div className='font-bold font-mono'>TodoTower</div>
			<div className='flex gap-4'>
				<div>privacy</div>
				<div>contact us</div>
				<div>about</div>
			</div>
		</div>
	);
};

export default Footer;
