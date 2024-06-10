import classNames from 'classnames';

import styles from './index.module.sass';

export default function Block({ children, className, ...props }) {
	return (
		<div
			className={classNames(styles.block, className)}
			style={props.backgroundColor && { backgroundColor: props.backgroundColor }}>
			{children}
		</div>
	);
}
