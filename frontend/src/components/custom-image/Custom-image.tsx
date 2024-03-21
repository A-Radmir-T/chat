import * as React from 'react'

import styles from './Custom-image.module.scss'

type ImageProps = {
	image: string
	onClick?: () => void
}
export const CustomImage = ({ image, onClick }: ImageProps) => {
	return <img className={styles.image} src={image} alt="" onClick={onClick} />
}
