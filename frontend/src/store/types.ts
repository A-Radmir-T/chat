import { ThunkAction } from 'redux-thunk'

import { addImageAsyncType } from '@/store/actions/album-actions/add-image-async'
import { DeleteAvatarAsyncType } from '@/store/actions/album-actions/delete-avatar-async'
import { DeleteImageAsyncType } from '@/store/actions/album-actions/delete-image-async'
import { GetAlbumType } from '@/store/actions/album-actions/get-album-async'
import { UpdateAvatarType } from '@/store/actions/album-actions/update-avatar-async'
import { ClearMessagesType } from '@/store/actions/dialog-actions/clear-messages'
import { CreateDialogType } from '@/store/actions/dialog-actions/create-dialog-async'
import { DeleteDialogType } from '@/store/actions/dialog-actions/delete-dialog-async'
import { GetMessagesType } from '@/store/actions/dialog-actions/get-messages-async'
import { ReceiveMessagesType } from '@/store/actions/dialog-actions/receive-messages'
import { UpdateDialogType } from '@/store/actions/dialog-actions/update-dialog'
import { UpdateMessagesType } from '@/store/actions/dialog-actions/update-message'
import { AddFriendType } from '@/store/actions/friend-actions/add-friend-async'
import { CancelFriendType } from '@/store/actions/friend-actions/cancel-friend-async'
import { DeleteFriendType } from '@/store/actions/friend-actions/delete-friend-async'
import { GetFriendsType } from '@/store/actions/friend-actions/get-friends-async'
import { SendFriendRequestType } from '@/store/actions/friend-actions/send-friend-request-async'
import { ClearProfileFriendType } from '@/store/actions/profile-actions/clear-profile-friend'
import { EditProfileType } from '@/store/actions/profile-actions/edit-profile-async'
import { GetFriendDataType } from '@/store/actions/profile-actions/get-friend-data-async'
import { GetProfileType } from '@/store/actions/profile-actions/get-profile-async'
import { GetProfileFriendType } from '@/store/actions/profile-actions/get-profile-friend-async'
import { AuthErrorType } from '@/store/actions/session-actions/auth-error'
import { LoginType } from '@/store/actions/session-actions/login-async'
import { LogoutType } from '@/store/actions/session-actions/logoutAsync'
import { RegisterType } from '@/store/actions/session-actions/register-async'
import { ShowPhotoType } from '@/store/actions/session-actions/show-photo'
import { SwitchAvatarEditorType } from '@/store/actions/session-actions/switch-avatar-editor'
import { ToggleLoadingType } from '@/store/actions/session-actions/toggle-loading'
import { IAppState } from '@/store/store'

export type AppActionTypes =
	| RegisterType
	| LoginType
	| ToggleLoadingType
	| LogoutType
	| EditProfileType
	| UpdateAvatarType
	| SwitchAvatarEditorType
	| GetAlbumType
	| addImageAsyncType
	| DeleteImageAsyncType
	| DeleteAvatarAsyncType
	| ShowPhotoType
	| GetProfileType
	| GetProfileFriendType
	| AddFriendType
	| SendFriendRequestType
	| CancelFriendType
	| DeleteFriendType
	| CreateDialogType
	| DeleteDialogType
	| GetMessagesType
	| ReceiveMessagesType
	| GetFriendDataType
	| UpdateDialogType
	| UpdateMessagesType
	| ClearMessagesType
	| GetFriendsType
	| ClearProfileFriendType
	| AuthErrorType

export type ThunkActions = ThunkAction<Promise<void>, IAppState, unknown, AppActionTypes>
