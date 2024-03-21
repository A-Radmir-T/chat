import { useSelector } from 'react-redux'
import { Outlet } from 'react-router'

import { Loading } from '@/components/loading/Loading'
import { Photo } from '@/components/photo/Photo'
import { Wrapper } from '@/layout/warpper/Wrapper'
import { selectIsLoading } from '@/store/selectors/select-is-loading'
import { selectShowedPhoto } from '@/store/selectors/select-showed-photo'

import styles from './Layout.module.scss'
import { Header } from './header/Header'
import { Sidebar } from './sidebar/Sidebar'

export const Layout = () => {
	const isLoading = useSelector(selectIsLoading)
	const showPhoto = useSelector(selectShowedPhoto)

	return (
		<Wrapper>
			<div className={styles.layout}>
				{isLoading && <Loading />}
				{showPhoto && <Photo imageId={showPhoto} />}
				<Header />
				<div className="container">
					<div className={styles.wrap}>
						<div className={styles.a}>
							<Sidebar />
						</div>
						<div className={styles.a}>
							<main className={styles.main} id="main">
								<Outlet />
							</main>
						</div>
					</div>
				</div>
			</div>
		</Wrapper>
	)
}
