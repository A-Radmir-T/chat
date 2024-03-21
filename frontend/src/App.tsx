import axios from 'axios'
import React, { useLayoutEffect } from 'react'
import { useSelector } from 'react-redux'
import { Route, Routes, useAsyncError } from 'react-router'
import { useLocation } from 'react-router-dom'

import { ProtectedRoute } from '@/components/protected-route/ProtectedRoute'
import { Layout } from '@/layout/Layout'
import { EditPage } from '@/pages/edit-page/Edit-page'
import { Friends } from '@/pages/friends/Friends'
import { Messages } from '@/pages/messages/Messages'
import { NotFound } from '@/pages/not-found/Not-found'
import { Profile } from '@/pages/profile/Profile'
import { Search } from '@/pages/search/Search'
import { SignIn } from '@/pages/sign-in/Sign-in'
import { SignUp } from '@/pages/sign-up/Sign-up'
import { User } from '@/pages/user/User'
import { selectIsAuthenticated } from '@/store/selectors/select-is-authenticated'

import './App.scss'

function App() {
	const isAuthenticated = useSelector(selectIsAuthenticated)

	return (
		<Routes>
			<Route
				element={<ProtectedRoute isAllowed={isAuthenticated} redirectPath="/signIn" />}
			>
				<Route path="/" element={<Layout />}>
					<Route path="/" element={<Profile />} />
					<Route path="/edit" element={<EditPage />} />
					<Route path="/:id" element={<User />} />
					<Route path="/search" element={<Search />} />
					<Route path="/friends" element={<Friends />} />
					<Route path="/messages" element={<Messages />} />
					<Route path="/messages/:id" element={<Messages />} />
				</Route>
			</Route>

			<Route element={<ProtectedRoute isAllowed={!isAuthenticated} redirectPath="/" />}>
				<Route path="/signIn" element={<SignIn />} />
				<Route path="/signUp" element={<SignUp />} />
			</Route>
			<Route path="*" element={<NotFound />} />
		</Routes>
	)
}

export default App
