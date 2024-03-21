import { useDispatch } from 'react-redux'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { ThunkDispatch } from 'redux-thunk'

import { CustomButton } from '@/components/custom-button/Custom-button'
import { logoutAsync } from '@/store/actions/session-actions/logoutAsync'
import { IAppState } from '@/store/store'
import { AppActionTypes } from '@/store/types'

import styles from './Header.module.scss'

export const Header = () => {
	const dispatch = useDispatch<ThunkDispatch<IAppState, unknown, AppActionTypes>>()
	const navigate = useNavigate()
	const { pathname } = useLocation()
	const isSearch = pathname === '/search'
	const onLogout = () => {
		dispatch(logoutAsync()).finally(() => {
			navigate('/signIn')
		})
	}

	return (
		<header className={styles.header}>
			<div className="container">
				<div className={styles.wrapper}>
					<Link to="/" className={styles.logo}>
						Chat
					</Link>
					{!isSearch && (
						<Link className={styles.search} to="/search">
							<span className="icon-search"></span>
							<span>Поиск друзей</span>
						</Link>
					)}
					<div onClick={() => onLogout()}>
						<CustomButton>Выйти</CustomButton>
					</div>
				</div>
			</div>
		</header>
	)
}
