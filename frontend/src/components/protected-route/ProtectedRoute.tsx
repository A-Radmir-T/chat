import { ReactElement } from 'react'
import { Navigate, Outlet } from 'react-router'

interface ProtectedRouteProps {
	isAllowed: boolean
	redirectPath?: string
	children?: ReactElement
}

export const ProtectedRoute = ({
	isAllowed,
	redirectPath = '/signIn',
	children,
}: ProtectedRouteProps) => {
	if (!isAllowed) {
		return <Navigate to={redirectPath} />
	}
	return children ? children : <Outlet />
}
