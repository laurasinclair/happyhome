import React from 'react';
import styles from './index.module.sass';
import { ExclamationCircle } from 'react-bootstrap-icons';
import classNames from 'classnames';

function Warning({ children, className }) {
	return (
		<div className={classNames(styles.Warning, className)}>
			<ExclamationCircle size='24' />
			<p>
				{children}
			</p>
		</div>
	);
}

export default Warning;
