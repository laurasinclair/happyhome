import React from 'react';
import styles from './index.module.sass';
import { Check } from 'react-bootstrap-icons';
import classNames from 'classnames';

function Success({ children, className }) {
	return (
		<div className={classNames(styles.success, className)}>
			<Check size='32' />
			<p>
				{children}
			</p>
		</div>
	);
}

export default Success;
