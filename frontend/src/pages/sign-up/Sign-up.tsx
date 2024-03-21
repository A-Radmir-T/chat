import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { ThunkDispatch } from 'redux-thunk'
import { object, ref, string } from 'yup'

import { Input } from '@/components/input/Input'
import { IRegRequest } from '@/shared/interfaces/auth.interface'
import { registerAsync } from '@/store/actions/session-actions/register-async'
import { selectError } from '@/store/selectors/select-error'
import { IAppState } from '@/store/store'
import { AppActionTypes } from '@/store/types'

import styles from './Sign-up.module.scss'

export const signUpSchema = object({
	email: string()
		.matches(/^\S+@\S+\.\S+$/, 'Не корректный Email')
		.required('Заполните поле'),
	password: string()
		.required('Заполните поле')
		.min(6, 'Должно быть не меньше 6 символов'),
	confirmPwd: string()
		.required('Заполните поле')
		.oneOf([ref('password'), ''], 'Пароль не совпадает'),
	firstName: string().required('Заполните поле'),
	lastName: string().required('Заполните поле'),
})

export const SignUp = () => {
	const {
		formState: { errors },
		handleSubmit,
		register,
	} = useForm({
		defaultValues: {
			email: '',
			password: '',
			confirmPwd: '',
			firstName: '',
			lastName: '',
		},
		mode: 'onTouched',
		resolver: yupResolver(signUpSchema),
	})
	const authError = useSelector(selectError)
	const dispatch = useDispatch<ThunkDispatch<IAppState, unknown, AppActionTypes>>()

	const onSubmit = ({
		email,
		password,
		firstName,
		lastName,
	}: {
		[key: string]: string
	}) => {
		const newUser: IRegRequest = {
			email,
			password,
			firstName,
			lastName,
			avatar: { path: '', imageId: '' },
		}
		dispatch(registerAsync(newUser))
	}

	return (
		<div className={styles.signUp}>
			<h2>Регистрация</h2>
			<p className="authError">{authError}</p>
			<form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
				<Input
					label="Email:"
					name="email"
					type="email"
					placeholder="Email..."
					register={register}
					errors={errors?.email?.message || ''}
				/>

				<Input
					label="Пароль:"
					name="password"
					type="password"
					placeholder="Пароль..."
					register={register}
					errors={errors?.password?.message || ''}
				/>
				<Input
					label="Повтор пароля:"
					name="confirmPwd"
					type="password"
					placeholder="Подтвердите пароль..."
					register={register}
					errors={errors?.confirmPwd?.message || ''}
				/>

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

				<button type="submit">Зарегистрироваться </button>
			</form>
			<div className={styles.link}>
				<Link to="/signIn">Войти</Link>
			</div>
		</div>
	)
}
