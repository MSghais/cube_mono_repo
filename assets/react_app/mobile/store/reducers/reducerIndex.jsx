/**
 * author: JamesStandbridge
 * date: 22/01/2021
 */

import { combineReducers } from 'redux'
import AuthHandler from './securityReducers/AuthHandler'
import ResourceUserStateHandler from './resources/StateResources'
import Resources from './resources/Resources'

export default combineReducers({
	auth:AuthHandler,
	resource:Resources,
	resourceState:ResourceUserStateHandler
})