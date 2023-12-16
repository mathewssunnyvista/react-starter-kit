import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    loading: false,
    errorStatus: null,
    errorName: '',
    timeElapsed: 0,
    apiResponse: null,
    apiResponseData: null,
    errorMsg: '',
    counter: 4,
    disablePopUpError: false,
    disableRedirectError: false,
}

const pendingReducer = (state) => {
    state.errorStatus = null
    state.errorName = ''
    state.errorMsg = ''
    state.loading = true
    state.timeElapsed = 0
}

const rejectedReducer = (state, action) => {
    state.counter = state.counter - 1
    state.apiResponse = action.payload?.apiResponse
    state.apiResponseData = action.payload?.apiResponseData
    state.errorStatus = action.payload?.error?.status
    state.errorName = action.payload?.apiName
    state.errorMsg = action.payload?.error?.data?.exception
    state.loading = false
    state.timeElapsed = 0
}

const fulfilledReducer = (state, action) => {
    state.loading = false
    state.timeElapsed = 0
}

export const loaderSlice = createSlice({
    name: 'loader',
    initialState,
    reducers: {
        incrementTimeElapsed: (state) => {
            state.timeElapsed += 1
        },
        disablePopupError: (state) => {
            state.disablePopUpError = true
        },
        disabledRedirectError: (state) => {
            state.disableRedirectError = true
        },
    },
    extraReducers: (builder) => {
        builder.addMatcher(
            (action) => action.type.endsWith('/pending'),
            pendingReducer
        )
        builder.addMatcher(
            (action) => action.type.endsWith('/rejected'),
            rejectedReducer
        )
        builder.addMatcher(
            (action) => action.type.endsWith('/pending'),
            fulfilledReducer
        )
    },
})
