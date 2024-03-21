import * as React from 'react'
import { ReactNode } from 'react'

import styles from './Menu-item.module.scss'

type MenuItemProps = {
	icon: string
	iconColor?: string
	children: ReactNode
	handleClick?: () => void
}
export const MenuItem = ({ icon, children, handleClick, iconColor }: MenuItemProps) => {
	return (
		<div className={styles.item} onClick={handleClick}>
			<span className={icon} style={{ color: iconColor }}></span>
			{children}
		</div>
	)
}
