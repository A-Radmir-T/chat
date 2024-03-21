import * as React from 'react'
import { ReactNode } from 'react'

import styles from './Custom-button.module.scss'

type CustomButtonProps = {
	children: ReactNode
	onClick?: () => void
	loading?: boolean
}
export const CustomButton = ({
	children,
	onClick,
	loading = false,
}: CustomButtonProps) => {
	return (
		<button className={styles.button} onClick={onClick}>
			{children}
			{loading && <p>Загрузка...</p>}
		</button>
	)
}
