import * as React from 'react'
import { Link } from 'react-router-dom'

import styles from './Not-found.module.scss'

export const NotFound = () => {
	return (
		<div className={styles.notFound}>
			<h2>404</h2>
			<p>Not found</p>
			<Link to="/">На главную</Link>
		</div>
	)
}
