import * as React from 'react'
import { ChangeEvent, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useLocation } from 'react-router-dom'
import { ThunkDispatch } from 'redux-thunk'

import { SearchInput } from '@/components/search-input/Search-input'
import { useDebounce } from '@/hooks/use-debounce'
import { FriendList } from '@/pages/friends/components/friend-list/Friend-list'
import { IFriend } from '@/shared/interfaces/profile.interface'
import { getFriendsAsync } from '@/store/actions/friend-actions/get-friends-async'
import { selectFriends } from '@/store/selectors/select-friends'
import { IAppState } from '@/store/store'
import { AppActionTypes } from '@/store/types'

import styles from './Friends.module.scss'

export const Friends = () => {
	const { search } = useLocation()
	const dispatch = useDispatch<ThunkDispatch<IAppState, unknown, AppActionTypes>>()
	const [searchValue, setSearchValue] = useState('')
	const [filteredUsers, setFilteredUsers] = useState<IFriend[]>([])
	const debounced = useDebounce(searchValue)
	const friendList = useSelector(selectFriends)
	const friends: IFriend[] = friendList.filter((friend) => friend.isAccepted)
	const requests: IFriend[] = friendList.filter((friend) => !friend.isAccepted)
	const path = search.split('=').at(1)

	let data = friends

	if (path === 'all') data = friends
	if (path === 'req') data = requests

	useEffect(() => {
		dispatch(getFriendsAsync())
	}, [])
	useEffect(() => {
		const filtered = friends.filter(
			(friend) =>
				friend.firstName.toLowerCase().includes(debounced.toLowerCase()) ||
				friend.lastName.toLowerCase().includes(debounced.toLowerCase()),
		)
		setFilteredUsers(filtered)
	}, [debounced])

	const onChange = (event: ChangeEvent<HTMLInputElement>) => {
		const { value } = event.target
		setSearchValue(value)
	}

	return (
		<div className={styles.friends}>
			<div className={styles.links}>
				<Link
					to="/friends?sel=all"
					className={!path || path === 'all' ? `${styles.active}` : ''}
				>
					Друзья <span>{friends.length}</span>
				</Link>
				<Link to="/friends?sel=req" className={path === 'req' ? `${styles.active}` : ''}>
					Заявки в друзья <span>{requests.length}</span>
				</Link>
			</div>
			<SearchInput onChange={onChange} value={searchValue} />

			<div>
				<FriendList users={debounced ? filteredUsers : data} />
			</div>
		</div>
	)
}
