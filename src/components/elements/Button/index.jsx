import { Link } from 'react-router-dom';
import styles from './index.module.sass';
import classNames from 'classnames';

export default function Button({ to, children, type = 'primary', fullWidth = false, iconRight, iconLeft, onClick, className }) {
    const typeStyles = {
        primary: styles['btn-primary'],
        secondary: styles['btn-secondary'],
        'primary-outline': styles['btn-primary-outline'],
        'secondary-outline': styles['btn-secondary-outline'],
    };

    const buttonTypeClass = typeStyles[type] || typeStyles.primary;

    const buttonClasses = classNames(
        buttonTypeClass,
        { [styles['full-width']]: fullWidth },
        { [styles['icon-left']]: iconLeft },
        { [styles['icon-right']]: iconRight }
    );

    return (
        <Link to={to} className={classNames(buttonClasses, className)} onClick={onClick}>
            {iconLeft}
            {children}
            {iconRight}
        </Link>
    );
}
