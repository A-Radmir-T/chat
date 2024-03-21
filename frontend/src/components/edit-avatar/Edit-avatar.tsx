import * as React from 'react'
import { useRef, useState } from 'react'
import { type Crop, PixelCrop, ReactCrop } from 'react-image-crop'
import 'react-image-crop/src/ReactCrop.scss'
import { useDispatch } from 'react-redux'
import { ThunkDispatch } from 'redux-thunk'

import { CustomButton } from '@/components/custom-button/Custom-button'
import { Loading } from '@/components/loading/Loading'
import { cropForAvatar } from '@/shared/utils/crop-for-avatar'
import { onSelectImage } from '@/shared/utils/on-select-image'
import { updateAvatarAsync } from '@/store/actions/album-actions/update-avatar-async'
import { switchAvatarEditor } from '@/store/actions/session-actions/switch-avatar-editor'
import { IAppState } from '@/store/store'
import { AppActionTypes } from '@/store/types'

import styles from './Edit-avatr.module.scss'

type Props = {}
export const EditAvatar = (props: Props) => {
	const dispatch = useDispatch<ThunkDispatch<IAppState, unknown, AppActionTypes>>()
	const [crop, setCrop] = useState<Crop>({
		unit: '%', // Can be 'px' or '%'
		x: 25,
		y: 25,
		width: 50,
		height: 50,
	})
	const [image, setImage] = useState<string | null | ArrayBuffer>(null)
	const [file, setFile] = useState()
	const [completedCrop, setCompletedCrop] = useState<PixelCrop | null>(null)
	const imgRef = useRef(null)
	const [loading, setLoading] = useState(false)

	const onSelect = (e: any) => {
		setLoading(true)
		onSelectImage(e)
			.then((img) => {
				if (typeof img === 'string') setImage(img)
			})
			.finally(() => setLoading(false))
		setFile(e.target.files[0])
	}

	const onCancel = () => {
		setImage(null)
	}

	const onClose = () => {
		onCancel()
		dispatch(switchAvatarEditor(false))
	}
	const onSaveCroppedImage = () => {
		const formData = new FormData()
		if (completedCrop && imgRef.current && file) {
			formData.append('picture', file)
			cropForAvatar(imgRef.current, completedCrop).then((data) => {
				if (data instanceof Blob) formData.append('avatar', data, `avatar`)
				dispatch(updateAvatarAsync(formData)).finally(() => {
					dispatch(switchAvatarEditor(false))
				})
			})
		}
	}

	return (
		<>
			<div className={styles.modal}>
				<div className={styles.inner}>
					<div className={styles.header}>
						{!image ? (
							<h2>Загрузка новой фотографии</h2>
						) : (
							<h2>Фотография на вашей странице</h2>
						)}
						<span className="icon-cross" onClick={onClose}></span>
					</div>
					<div className={styles.content}>
						{loading && <Loading />}
						{!image && (
							<div className={styles.select_image}>
								<label htmlFor="file">Выбрать файл</label>
								<input
									id="file"
									type="file"
									name="picture"
									accept=".png, .jpg, .jpeg"
									onChange={onSelect}
								/>
							</div>
						)}

						{typeof image === 'string' && (
							<div className={styles.crop}>
								<h4>Выбранная область будет показываться на вашей странице.</h4>
								<ReactCrop
									maxWidth={300}
									maxHeight={300}
									minWidth={100}
									minHeight={100}
									crop={crop}
									ruleOfThirds={false}
									onComplete={(c) => setCompletedCrop(c)}
									onChange={(c) => setCrop(c)}
								>
									<img src={image} alt="" style={{ width: '500px' }} ref={imgRef} />
								</ReactCrop>
							</div>
						)}
					</div>
					<div className={styles.footer}>
						{!image ? (
							<p>
								Если у вас возникают проблемы с загрузкой, попробуйте выбрать фотографию
								меньшего размера.
							</p>
						) : (
							<>
								<div onClick={onSaveCroppedImage}>
									<CustomButton>Сохранить</CustomButton>
								</div>

								<div onClick={onCancel}>
									<CustomButton>Вернуться назад</CustomButton>
								</div>
							</>
						)}
					</div>
				</div>
			</div>
		</>
	)
}
