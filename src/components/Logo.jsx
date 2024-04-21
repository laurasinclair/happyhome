import logo from '@img/logo.png'
import styles from './Logo.module.sass'

export default function Logo ({ size, hasText }) {
	const sizes = {
		"xs": "logo-extrasmall",
		"s": "logo-small",
		"m": "logo-medium",
		"l": "logo-large"
	}
	const logoSize = sizes[size] || sizes["s"]

	return (
		<>
		<div className={`${styles.logo} ${hasText && styles.logo_hastext} ${styles[logoSize]}`}>
			<img src={logo} alt={window.appName} />
			{hasText && <p>{window.appName}</p>}
		</div>
		</>
	)
}
