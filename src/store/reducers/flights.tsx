import {
    UPDATE_TICKETS,
    TicketsActionTypes,
    FlightsState,
    UPDATE_SEARCH_ID,
    SET_BUTTON_FILTER,
    SET_CHECKBOX_FILTER,
    FETCH_FAILED,
    LOADING
} from "../types/flights";

const INITIAL_STATE: FlightsState = {
    tickets: null,
    searchID: null,
    currentFilter: 'lowcost',
    checkboxProps: {
        all: true,
        WithoutTransplantation: false,
        oneTransplantation: false,
        twoTransplantation: false,
        threeTransplantation: false
    },
    error: false,
    loading: false
};

export default function flights (
    state = INITIAL_STATE,
    action: TicketsActionTypes): FlightsState {
    switch (action.type) {
        case UPDATE_TICKETS:
            return {
               ...state,
                tickets: action.tickets,
                error: false
            }
        case UPDATE_SEARCH_ID:
            return {
                ...state,
                searchID: action.id,
            }
        case SET_BUTTON_FILTER:
            return {
                ...state,
                currentFilter: action.payload
            }
        case SET_CHECKBOX_FILTER:
            return {
                ...state,
                checkboxProps: action.payload
            }
        case FETCH_FAILED:
            return {
                ...state,
                tickets: [],
                error: true
            }
        case LOADING:
            return {
                ...state,
                loading: action.payload
            }
        default: return state
    }
}