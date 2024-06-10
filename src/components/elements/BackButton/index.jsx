import React from 'react';
import { Link } from 'react-router-dom';

import { ArrowLeftShort } from 'react-bootstrap-icons';

import styles from './index.module.sass';

export default function BackButton({ label, to }) {
	return (
		<Link
			to={to || -1}
			className={styles.backbutton}>
			<ArrowLeftShort size={26} /> {label || 'Back to previous page'}
		</Link>
	);
}
