import axios, { AxiosError } from 'axios'

import {
	IAuthResponse,
	ILoginRequest,
	IRefreshResponse,
	IRegRequest,
} from '@/shared/interfaces/auth.interface'
import { IUser } from '@/store/reducers/profile-reducer'

export const authService = {
	get token(): string | null {
		const expDate = new Date(JSON.stringify(localStorage.getItem('token-exp')))
		if (new Date() > expDate) {
			this.refresh().catch(() => {
				return null
			})
		}
		return localStorage.getItem('accessToken')
	},

	async login(newUser: ILoginRequest): Promise<IUser | undefined> {
		try {
			const { user, accessToken, expiresIn }: IAuthResponse = await axios
				.post<IAuthResponse>(`/login`, newUser)
				.then((res) => res.data)
			this.setToken({ expiresIn, accessToken })
			localStorage.setItem('user', JSON.stringify(user))
			return user
		} catch (e: AxiosError | unknown) {
			if (e instanceof AxiosError) {
				authService.handleError(e)
				throw e
			}
		}
	},

	async refresh(): Promise<void> {
		try {
			const { accessToken, expiresIn }: IRefreshResponse = await axios
				.get<IRefreshResponse>(`/refresh`)
				.then((res) => res.data)
			this.setToken({ expiresIn, accessToken })
		} catch (e: AxiosError | unknown) {
			if (e instanceof AxiosError) authService.handleError(e)
		}
	},

	async register(newUser: IRegRequest): Promise<IUser | undefined> {
		try {
			const { user, accessToken, expiresIn }: IAuthResponse = await axios
				.post<IAuthResponse>('/register', newUser)
				.then((res) => res.data)
			this.setToken({ expiresIn, accessToken })
			localStorage.setItem('user', JSON.stringify(user))
			return user
		} catch (e: AxiosError | unknown) {
			if (e instanceof AxiosError) {
				authService.handleError(e)
			}
			throw e
		}
	},

	isAuthenticated(): boolean {
		return !!this.token
	},

	handleError(e: AxiosError<any>): void {
		const { error } = e.response?.data
		switch (error) {
			case 'jwt malformed':
				this.logout()
				break
			default:
				console.error('handleError:', error)
		}
	},

	setToken(data: { accessToken: string; expiresIn: number } | null) {
		if (data) {
			const expDate = new Date(new Date().getTime() + +data.expiresIn * 1000)
			localStorage.setItem('accessToken', data.accessToken)
			localStorage.setItem('token-exp', expDate.toString())
		} else {
			localStorage.clear()
		}
	},

	async logout(): Promise<void> {
		this.setToken(null)
		await axios.post('/logout')
	},
}
