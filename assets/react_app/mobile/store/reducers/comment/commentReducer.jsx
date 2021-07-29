/**
 * author: JamesStandbridge
 * date: 22/01/2021
 */

import { commentTypes } from "../../../services/commentService";

const initialState = {
	data: [],

	isUpdated: false,
	loading:false
}

function CommentReducer(state = initialState, action) {
	let nextState
	let newStateData
	switch(action.type) {
		case commentTypes.unload:
			nextState = { ...state, loading: false }
			return nextState;
		case commentTypes.loading:
			const loadingState = {...state, loading:true}
			return loadingState;
		case commentTypes.getCommmentsResource:
			nextState = {...state, data: action.data, loading:false}
			return nextState;

		default:
			return state;
	}
}

export default CommentReducer;

