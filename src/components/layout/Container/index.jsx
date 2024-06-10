import classNames from 'classnames';

import styles from './index.module.sass';

export default function Container({ children, className }) {
	return (
		<div
			className={classNames(styles.container, className)}>
			{children}
		</div>
	);
}
