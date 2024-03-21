import axios from 'axios'

import { authService } from '@/services/auth.service'

export const $axios = axios.create({
	headers: {
		Authorization: authService.token ? `Bearer ${authService.token}` : '',
	},
})

$axios.interceptors.request.use((config) => {
	const token = authService.token
	if (config && token) {
		config.headers.Authorization = `Bearer ${token}`
	}
	return config
})

$axios.interceptors.response.use(
	(config) => config,
	async (error) => {
		const originalRequest = error.config

		if (
			(error.response.status === 401 ||
				error.response.data.error === 'jwt expired' ||
				error.response.data.error === 'jwt must be provided') &&
			error.config &&
			!error.config._isRetry
		) {
			originalRequest._isRetry = true
			try {
				await authService.refresh()
				return $axios.request(originalRequest)
			} catch (e) {
				authService.logout()
			}
		}

		throw error
	},
)
