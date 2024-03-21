import * as React from 'react'
import { useDispatch } from 'react-redux'
import { ThunkDispatch } from 'redux-thunk'

import { CustomButton } from '@/components/custom-button/Custom-button'
import { CustomImage } from '@/components/custom-image/Custom-image'
import { addImageAsync } from '@/store/actions/album-actions/add-image-async'
import { deleteImageAsync } from '@/store/actions/album-actions/delete-image-async'
import { showPhoto } from '@/store/actions/session-actions/show-photo'
import { IImage } from '@/store/reducers/album-reducer'
import { IAppState } from '@/store/store'
import { AppActionTypes } from '@/store/types'

import styles from './Pictures.module.scss'

type PhotosProps = {
	photos: IImage[]
}
export const Pictures = ({ photos }: PhotosProps) => {
	if (photos.length > 3) photos = photos.slice(0, 3)
	const dispatch = useDispatch<ThunkDispatch<IAppState, unknown, AppActionTypes>>()
	const onAddImage = ({ target }: any) => {
		const formData = new FormData()
		formData.append('picture', target.files[0])
		dispatch(addImageAsync(formData))
	}

	const onRemoveImage = (id: string) => {
		dispatch(deleteImageAsync(id))
	}

	return (
		<div className={styles.photos}>
			<div className={styles.header}>
				<span className="icon-image"></span>Фотографии
			</div>
			<div className={styles.items}>
				{photos.length ? (
					photos.map((image) => (
						<div className={styles.image} key={image.id}>
							<span
								className="icon-bin"
								onClick={() => onRemoveImage(image.id || '')}
							></span>
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
				<div className={styles.select_image}>
					<label htmlFor="file">Загрузить фото</label>
					<input id="file" type="file" name="picture" onChange={onAddImage} />
				</div>
				<CustomButton onClick={() => dispatch(showPhoto(photos[0].id || ''))}>
					Посмотреть все
				</CustomButton>
			</div>
		</div>
	)
}
