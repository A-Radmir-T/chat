import * as React from 'react'
import { useDispatch } from 'react-redux'
import { ThunkDispatch } from 'redux-thunk'

import { CustomButton } from '@/components/custom-button/Custom-button'
import { CustomImage } from '@/components/custom-image/Custom-image'
import { showPhoto } from '@/store/actions/session-actions/show-photo'
import { IImage } from '@/store/reducers/album-reducer'
import { IAppState } from '@/store/store'
import { AppActionTypes } from '@/store/types'

import styles from './User-pictures.module.scss'

type PhotosProps = {
	photos: IImage[]
}
export const UserPictures = ({ photos }: PhotosProps) => {
	if (photos.length > 3) photos = photos.slice(0, 3)
	const dispatch = useDispatch<ThunkDispatch<IAppState, unknown, AppActionTypes>>()
	return (
		<div className={styles.photos}>
			<div className={styles.header}>
				<span className="icon-image"></span>Фотографии
			</div>
			<div className={styles.items}>
				{photos.length ? (
					photos.map((image) => (
						<div className={styles.image} key={image.id}>
							<CustomImage
								onClick={() => dispatch(showPhoto(image.id || ''))}
								image={image.smallSize}
							/>
						</div>
					))
				) : (
					<p>У вас пока нет фотографий</p>
				)}
			</div>
			<div className={styles.buttons}>
				<CustomButton onClick={() => dispatch(showPhoto(photos[0].id || ''))}>
					Посмотреть все
				</CustomButton>
			</div>
		</div>
	)
}
