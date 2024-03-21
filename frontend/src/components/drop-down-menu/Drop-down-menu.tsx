import * as React from 'react'
import { ReactNode } from 'react'

import styles from './Drop-down-menu.module.scss'

type DropDownMenuProps = {
	children: ReactNode
	top?: string
	left?: string
}
export const DropDownMenu = ({ children, top, left }: DropDownMenuProps) => {
	return (
		<div className={styles.dropDown} style={{ top: top, left: left }}>
			{children}
		</div>
	)
}
