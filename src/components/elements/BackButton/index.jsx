import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

import { ArrowLeftShort } from 'react-bootstrap-icons'

import styles from './index.module.sass'

export default function BackButton() {
	const navigate = useNavigate()

	return (
		<Link
			onClick={() => {
				navigate(-1)
			}}
			className={styles.backbutton}>
			<ArrowLeftShort size="26" /> Back to previous page
		</Link>
	)
}
