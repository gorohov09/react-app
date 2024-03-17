export const INITIAL_STATE = {
	isValid: {
		post: true,
		title: true,
		date: true
	},
	values: {
		post: '',
		title: '',
		date: '',
		tag: ''
	},
	isFormReadyToSubmit: false
};

export function formReducer(state, action) {
	switch (action.type) {
	case 'RESET_VALIDITY': 
		return {...state, isValid: INITIAL_STATE.isValid};
	case 'SUBMIT': {
		const titleValidity = state.values.title?.trim().length != 0;
		const postValidity = state.values.post?.trim().length != 0;
		const dateValidity = state.values.date != undefined;
        
		return {
			...state,
			isValid: {
				post: postValidity,
				title: titleValidity,
				date: dateValidity
			},
			isFormReadyToSubmit: titleValidity && postValidity && dateValidity
		};
	}
	case 'SET_POST': {
		return {
			...state,
			values: {
				...state.values,
				post: action.payload 
			}
		};
	}

	case 'SET_DATE': {
		return {
			...state,
			values: {
				...state.values,
				date: action.payload
			}
		};
	}

	case 'SET_TAG': {
		return {
			...state,
			values: {
				...state.values,
				tag: action.payload
			}
		};
	}

	case 'SET_TITLE': {
		return {
			...state,
			values: {
				...state.values,
				title: action.payload
			}
		};
	}

	case 'CLEAR':
		return {...state, values: INITIAL_STATE.values};
	}
}