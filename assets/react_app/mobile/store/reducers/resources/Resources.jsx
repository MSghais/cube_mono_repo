/**
 * author: JamesStandbridge
 * date: 22/01/2021
 */

import { actionsTypes } from "../../../services/myResourcesService";

const initialState = {
	data: [],

	isUpdated: false,
	loading:false
}

function ResourcesState(state = initialState, action) {
	let nextState
	let newStateData
	switch(action.type) {

		case actionsTypes.loading:
			const loadingState = {...state, loading:true}
			return loadingState;

		case actionsTypes.getResources:
			// nextState = {...state, token: action.auth.token, user: action.auth.user}
			nextState = {...state, data: action.data, loading:true}

			return nextState;



		default:
			return state;
	}
}

export default ResourcesState;

