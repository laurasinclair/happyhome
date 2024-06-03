import React from 'react';
import styles from './index.module.sass'

function Dashboard() {
	return (
		<div className='d-flex'>
			<div
				className='primary m-4'
				style={{ display: 'block', width: '100px', height: '100px' }}></div>
			<div
				className='primary-30 m-4'
				style={{ display: 'block', width: '100px', height: '100px' }}></div>
			<div
				className='primary-50 m-4'
				style={{ display: 'block', width: '100px', height: '100px' }}></div>
			<div
				className='primary-60 m-4'
				style={{ display: 'block', width: '100px', height: '100px' }}></div>
			<div
				className='white m-4'
				style={{ display: 'block', width: '100px', height: '100px' }}></div>
		</div>
	);
}

export default Dashboard;
