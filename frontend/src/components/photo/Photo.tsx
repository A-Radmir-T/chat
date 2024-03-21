import * as React from 'react'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

import { CustomImage } from '@/components/custom-image/Custom-image'
import { showPhoto } from '@/store/actions/session-actions/show-photo'
import { selectFriendImages } from '@/store/selectors/select-friend-images'
import { selectImages } from '@/store/selectors/select-images'

import styles from './Photo.module.scss'

type PhotoProps = {
	imageId?: string
}
export const Photo = ({ imageId }: PhotoProps) => {
	const dispatch = useDispatch()
	const { id } = useParams()

	let num = 0
	// eslint-disable-next-line react-hooks/rules-of-hooks
	const photos = id ? useSelector(selectFriendImages) : useSelector(selectImages)
	if (imageId) {
		num = photos.findIndex((photo) => photo.id === imageId)
	}
	const [image, setImage] = useState(num)
	const onPrev = () => {
		if (image === 0) {
			setImage(photos.length - 1)
			return
		}
		setImage(image - 1)
	}
	const onNext = () => {
		if (image + 1 === photos.length) {
			setImage(0)
			return
		}
		setImage(image + 1)
	}
	return (
		<div className={styles.wrapper}>
			<div className={styles.photo}>
				<div className={`${styles.btn} ${styles.btn_right}`} onClick={onNext}>
					▷
				</div>
				<div className={`${styles.btn} ${styles.btn_left}`} onClick={onPrev}>
					◁
				</div>
				<CustomImage image={photos[image].fullSize} />
			</div>
			<div className={styles.close} onClick={() => dispatch(showPhoto(''))}>
				<span className="icon-cross"></span>
			</div>
		</div>
	)
}
