import * as React from 'react'

import { CustomImage } from '@/components/custom-image/Custom-image'
import { IAvatar } from '@/shared/interfaces/image.interface'

import styles from './Avatar.module.scss'

type AvatarProps = {
	avatar?: IAvatar
	width?: string
	height?: string
}
export const Avatar = ({ avatar, height, width }: AvatarProps) => {
	return (
		<div className={styles.avatar}>
			<div className={styles.inner} style={{ width: width, height: height }}>
				{avatar && <CustomImage image={avatar.path} />}
			</div>
		</div>
	)
}
