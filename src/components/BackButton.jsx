import React from 'react'
import { Link } from "react-router-dom";
import styles from './BackButton.module.sass'
import { ArrowLeftShort } from 'react-bootstrap-icons'

export default function BackButton() {
	return (
		<Link to="/" className={styles.backbutton}>
			<ArrowLeftShort size="26" /> Back to previous page
		</Link>
	)
}
