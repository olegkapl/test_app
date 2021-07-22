import {FETCH_FAILED, LOADING, UPDATE_SEARCH_ID, UPDATE_TICKETS} from "../types/flights";
import axios from "axios";

export const getFlights = () => async (dispatch: any) => {
    try {
        dispatch({type: LOADING, payload: true})
        const response = await axios.get("https://front-test.beta.aviasales.ru/search")
        const {searchId} = response.data;
        dispatch({type: UPDATE_SEARCH_ID, searchId})

        const payload = await axios.get(`https://front-test.beta.aviasales.ru/tickets?searchId=${searchId}`)
        const {tickets} = payload.data;
        dispatch({type: UPDATE_TICKETS, tickets})
        dispatch({type: LOADING, payload: false})
    } catch (e) {
        dispatch({type: FETCH_FAILED})
        dispatch({type: LOADING, payload: false})
    }
}