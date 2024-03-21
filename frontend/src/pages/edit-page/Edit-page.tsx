import { yupResolver } from '@hookform/resolvers/yup'
import * as React from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { ThunkDispatch } from 'redux-thunk'
import { object, string } from 'yup'

import { Input } from '@/components/input/Input'
import { IEditProfile } from '@/shared/interfaces/auth.interface'
import { editProfileAsync } from '@/store/actions/profile-actions/edit-profile-async'
import { selectUser } from '@/store/selectors/select-user'
import { IAppState } from '@/store/store'
import { AppActionTypes } from '@/store/types'

import styles from './Edit-page.module.scss'

export const editSchema = object({
	firstName: string().required('Заполните поле'),
	lastName: string().required('Заполните поле'),
})
export const EditPage = () => {
	const user = useSelector(selectUser)
	const {
		formState: { errors, isDirty },
		handleSubmit,
		register,
	} = useForm({
		defaultValues: {
			firstName: user.firstName,
			lastName: user.lastName,
		},
		mode: 'onTouched',
		resolver: yupResolver(editSchema),
	})
	const dispatch = useDispatch<ThunkDispatch<IAppState, unknown, AppActionTypes>>()

	const onSubmit = ({ firstName, lastName }: { [key: string]: string }) => {
		if (!isDirty) return
		const edited: IEditProfile = {
			firstName,
			lastName,
		}

		dispatch(editProfileAsync(edited))
	}
	return (
		<div className={styles.edit}>
			<h2 className={styles.title}>Редактировать профиль</h2>

			<form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
				<Input
					label="Имя:"
					name="firstName"
					type="text"
					placeholder="Имя..."
					register={register}
					errors={errors?.firstName?.message || ''}
				/>

				<Input
					label="Фамилия:"
					name="lastName"
					type="text"
					placeholder="Фамилия..."
					register={register}
					errors={errors?.lastName?.message || ''}
				/>

				<button type="submit">Сохранить</button>
			</form>
		</div>
	)
}
