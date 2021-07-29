/**
 * author: JamesStandbridge
 * date: 22/01/2021
 */

import { combineReducers } from 'redux'
import AuthHandler from './securityReducers/AuthHandler'
import ResourceUserStateHandler from './resources/stateResourceReducer'
import Resources from './resources/resourceReducer'
import CommentReducer from './comment/commentReducer'

export default combineReducers({
	auth: AuthHandler,
	resource: Resources,
	resourceState: ResourceUserStateHandler,
	comment:CommentReducer
})