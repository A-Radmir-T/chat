import * as React from 'react'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useSelector } from 'react-redux'

import { Loading } from '@/components/loading/Loading'
import { SearchUser } from '@/pages/search/components/search-user/Search-user'
import { userService } from '@/services/user.service'
import { IUser } from '@/store/reducers/profile-reducer'
import { selectUser } from '@/store/selectors/select-user'

import styles from './Search.module.scss'

export const Search = () => {
	const { handleSubmit, register, setFocus } = useForm()
	const [users, setUsers] = useState<IUser[]>([])
	const profile = useSelector(selectUser)
	const [loading, setLoading] = useState(false)

	const getUsers = (searchPhrase: string = '') => {
		setLoading(true)
		userService
			.searchUsers(searchPhrase)
			.then((data) => {
				setUsers(data)
			})
			.finally(() => setLoading(false))
	}

	const onSearch = ({ search }: any) => {
		getUsers(search)
	}

	useEffect(() => {
		setFocus('search')
		if (!users.length) {
			getUsers()
		}
	}, [])

	return (
		<div className={styles.search}>
			<form className={styles.form} onSubmit={handleSubmit(onSearch)}>
				<div className={styles.formControl}>
					<input type="text" placeholder="Поиск друзей..." {...register('search')} />
					<button className="icon-search"></button>
				</div>
			</form>
			<div className={styles.users}>
				{loading && <Loading />}
				{users?.length ? (
					users.map((user, idx) => (
						<SearchUser key={user.id} profileId={profile.id || ''} user={user} />
					))
				) : (
					<p></p>
				)}
			</div>
		</div>
	)
}
