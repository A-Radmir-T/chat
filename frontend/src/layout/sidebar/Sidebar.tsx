import { useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'

import { selectDialogs } from '@/store/selectors/select-dialogs'

import styles from './Sidebar.module.scss'

export const Sidebar = () => {
	const { id } = useParams()
	const dialogs = useSelector(selectDialogs)
	const isUnreadMessage = dialogs.some(
		(dialog) => !dialog.isRead && id !== dialog.user.id,
	)
	return (
		<div className={styles.sidebar}>
			<ul className={styles.links}>
				<li>
					<Link to="/">Моя страница</Link>
				</li>
				<li>
					<Link to="/friends">Друзья</Link>
				</li>
				<li>
					<Link to="/messages">Сообщения</Link>
					{isUnreadMessage && <div className={styles.indicator}></div>}
				</li>
			</ul>
		</div>
	)
}
