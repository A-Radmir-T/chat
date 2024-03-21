import * as React from 'react'
import { ChangeEvent } from 'react'

import styles from './Search-input.module.scss'

type SearchInputProps = {
	value: string
	onChange: (event: ChangeEvent<HTMLInputElement>) => void
}
export const SearchInput = ({ value, onChange }: SearchInputProps) => {
	return (
		<label className={styles.search} htmlFor="search">
			<span className="icon-search"></span>
			<input type="text" id="search" value={value} onChange={onChange} />
		</label>
	)
}
