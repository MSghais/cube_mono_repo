/**
 * author: JamesStandbridge
 * date: 22/01/2021
 */

import { resourcesTypes } from "../../../services/myResourcesService";

const initialState = {
	data: [],

	isUpdated: false,
	loading:false
}

function ResourcesState(state = initialState, action) {
	let nextState
	let newStateData
	switch(action.type) {
		case resourcesTypes.unload:
			nextState = { ...state, loading: false }
			return nextState;
		case resourcesTypes.loading:
			const loadingState = {...state, loading:true}
			return loadingState;
		case resourcesTypes.getResources:
			nextState = {...state, data: action.data, loading:false}
			return nextState;

		default:
			return state;
	}
}

export default ResourcesState;

