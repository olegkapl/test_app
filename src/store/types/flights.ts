export const UPDATE_TICKETS = "UPDATE_TICKETS";
export const UPDATE_SEARCH_ID = "UPDATE_SEARCH_ID";
export const SET_BUTTON_FILTER = "SET_BUTTON_FILTER";
export const SET_CHECKBOX_FILTER = "SET_CHECKBOX_FILTER";
export const FETCH_FAILED = "FETCH_FAILED";
export const LOADING = "LOADING";

export interface Ticket {
    segments: any;
    carrier: Array<Segment>;
    price: number;
    img: string;
}

export interface Segment {
    origin: string;
    destination: string;
    date: string;
    duration: number;
    stops: Array<string>
}

export interface Checkboxes {
    all: boolean,
    WithoutTransplantation: boolean,
    oneTransplantation: boolean,
    twoTransplantation: boolean,
    threeTransplantation: boolean
}

export type BtnFilterType = "lowcost" | "fastest" | "optimal"

export interface FlightsState {
    tickets: null | Ticket[];
    searchID: null | string;
    currentFilter: BtnFilterType;
    checkboxProps: Checkboxes;
    error: boolean,
    loading: boolean
}

interface getFlights {
    type: typeof UPDATE_TICKETS,
    tickets: Ticket[]
}

interface FailedTickets {
    type: typeof FETCH_FAILED
}

interface GetSearchId {
    type: typeof UPDATE_SEARCH_ID,
    id: string
}

interface SetButtonFilter {
    type: typeof SET_BUTTON_FILTER,
    payload: BtnFilterType
}

interface SetCheckboxFilter {
    type: typeof SET_CHECKBOX_FILTER,
    payload: Checkboxes
}

interface SetLoadingStatus {
    type: typeof LOADING,
    payload: boolean
}

export type TicketsActionTypes = | getFlights | GetSearchId | SetButtonFilter | SetCheckboxFilter | FailedTickets | SetLoadingStatus;