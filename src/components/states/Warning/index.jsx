import React from 'react';
import styles from './index.module.sass';
import { X } from 'react-bootstrap-icons';
import classNames from 'classnames';

function Warning({ children, className }) {
	return (
		<div className={classNames(styles.Warning, className)}>
			<X size='32' />
			<p>
				{children}
			</p>
		</div>
	);
}

export default Warning;