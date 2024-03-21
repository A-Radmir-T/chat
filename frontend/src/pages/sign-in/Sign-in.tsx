import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { ThunkDispatch } from 'redux-thunk'
import { object, string } from 'yup'

import { Input } from '@/components/input/Input'
import { ILoginRequest } from '@/shared/interfaces/auth.interface'
import { loginAsync } from '@/store/actions/session-actions/login-async'
import { selectError } from '@/store/selectors/select-error'
import { IAppState } from '@/store/store'
import { AppActionTypes } from '@/store/types'

import styles from './Sign-in.module.scss'

const signInSchema = object({
	email: string()
		.matches(/^\S+@\S+\.\S+$/, 'Не корректный Email')
		.required('Заполните поле'),
	password: string().min(6, 'Должно быть не меньше 6 символов'),
})

export const SignIn = () => {
	const {
		reset,
		formState: { errors, isSubmitSuccessful },
		handleSubmit,
		register,
	} = useForm({
		defaultValues: {
			email: '',
			password: '',
		},
		mode: 'onChange',
		resolver: yupResolver(signInSchema),
	})
	const dispatch = useDispatch<ThunkDispatch<IAppState, unknown, AppActionTypes>>()
	const authError = useSelector(selectError)

	const onSubmit = ({ email, password }: { [key: string]: string }) => {
		const user: ILoginRequest = {
			email,
			password,
		}

		dispatch(loginAsync(user)).finally(() => {
			reset()
		})
	}

	return (
		<div className={styles.signIn}>
			<h2>Вход</h2>
			<p className="authError">{authError}</p>
			<form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
				<Input
					name="email"
					type="email"
					placeholder="Email..."
					register={register}
					errors={errors?.email?.message || ''}
				/>

				<Input
					name="password"
					type="password"
					placeholder="Password..."
					register={register}
					errors={errors?.password?.message || ''}
				/>

				<button type="submit" disabled={isSubmitSuccessful}>
					Войти
				</button>
			</form>
			<div className={styles.link}>
				<Link to="/signUp">Зарегистрироваться</Link>
			</div>
		</div>
	)
}
