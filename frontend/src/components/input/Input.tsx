import * as React from 'react'
import { ForwardedRef, forwardRef } from 'react'
import { FieldValue } from 'react-hook-form'
import { UseFormRegister } from 'react-hook-form/dist/types/form'

import styles from './Input.module.scss'

type InputProps = {
	name: string
	type: string
	placeholder?: string
	register: UseFormRegister<FieldValue<any>>
	errors: string
	label?: string
}
export const Input = forwardRef(
	(
		{ name, type, register, placeholder, errors, label }: InputProps,
		ref: ForwardedRef<HTMLInputElement>,
	) => {
		return (
			<div className={styles.formControl}>
				{label && <label htmlFor={name}>{label}</label>}
				<input type={type} placeholder={placeholder} {...register(name)} />
				<small className={styles.error}>{errors}</small>
			</div>
		)
	},
)
