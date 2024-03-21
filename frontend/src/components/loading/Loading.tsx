import styles from './Lloading.module.scss'

export const Loading = () => {
	return (
		<div className={styles.ldsRing}>
			<div></div>
			<div></div>
			<div></div>
			<div></div>
		</div>
	)
}
