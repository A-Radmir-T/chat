import * as React from 'react'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { ThunkDispatch } from 'redux-thunk'

import { Avatar } from '@/components/avatar/Avatar'
import { CustomButton } from '@/components/custom-button/Custom-button'
import { DropDownMenu } from '@/components/drop-down-menu/Drop-down-menu'
import { EditAvatar } from '@/components/edit-avatar/Edit-avatar'
import { MenuItem } from '@/components/menu-item/Menu-item'
import { IAvatar } from '@/shared/interfaces/image.interface'
import { deleteAvatarAsync } from '@/store/actions/album-actions/delete-avatar-async'
import { showPhoto } from '@/store/actions/session-actions/show-photo'
import { switchAvatarEditor } from '@/store/actions/session-actions/switch-avatar-editor'
import { selectIsEditAvatar } from '@/store/selectors/select-is-edit-avatar'
import { IAppState } from '@/store/store'
import { AppActionTypes } from '@/store/types'

import styles from './Profile-header.module.scss'

type ProfileHeaderProps = {
	lastName: string
	firstName: string
	avatar: IAvatar
}
export const ProfileHeader = ({ lastName, firstName, avatar }: ProfileHeaderProps) => {
	const dispatch = useDispatch<ThunkDispatch<IAppState, unknown, AppActionTypes>>()
	const [showMenu, setShowMenu] = useState(false)
	const isEditAvatar = useSelector(selectIsEditAvatar)

	const onEditAvatar = () => {
		dispatch(switchAvatarEditor(true))
		setShowMenu(false)
	}

	const onDeleteAvatar = () => {
		dispatch(deleteAvatarAsync())
		setShowMenu(false)
	}

	const onOpenPhoto = () => {
		if (avatar) dispatch(showPhoto(avatar?.imageId))
	}

	return (
		<>
			{isEditAvatar && <EditAvatar />}
			<div className="ownerPageCover"></div>
			<div className="profileHeader">
				<div
					className="profileHeaderPhoto"
					onMouseEnter={() => setShowMenu(true)}
					onMouseLeave={() => setShowMenu(false)}
				>
					<div className="profileHeaderAva">
						<Avatar avatar={avatar} />
					</div>
					{showMenu && (
						<DropDownMenu top="90px">
							<MenuItem icon="icon-image" handleClick={onOpenPhoto}>
								Открыть фотографию
							</MenuItem>
							<MenuItem handleClick={onEditAvatar} icon="icon-pencil">
								Обновить фотографию
							</MenuItem>

							<MenuItem
								icon="icon-bin"
								iconColor="#e34f4f"
								handleClick={() => (avatar ? onDeleteAvatar() : null)}
							>
								Удалить фотографию
							</MenuItem>
						</DropDownMenu>
					)}
				</div>
				<div className={styles.wrapper}>
					<div className={styles.info}>
						<h2>
							{firstName} {lastName}
						</h2>
					</div>
					<Link className={styles.actions} to="/edit">
						<CustomButton>Редактировать профиль</CustomButton>
					</Link>
				</div>
			</div>
		</>
	)
}
