import axios, { AxiosError } from 'axios'
import liquidParser from '../utils/liquidParser'

import ApiError from './utils/ApiError'
import type { ApiErrorItem } from './api-interface'

const token =
    'edb233f00a68c64b6f3c53aaa763bbebbee10c12130c86980806cf42ed0731604dc1ed8830872c241c3134a7fd8e2a0151aeea10fc73c113bd8cac4420b75a9a0f832a2f7db46920e51cabb8d8e47085316956086c4c9476496536caad1fdcdda834914be41ebd7650eb9b4032ac463dc04d8d70159fd043e553fa520d6cceb4'

const apiClient = axios.create({
    baseURL: liquidParser.parse('{{vars.api-path}}'),
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        Authorization: `Bearer ${token}`,
    },
})

apiClient.interceptors.response.use(
    (response) => response,
    (error: AxiosError) => {
        if (
            error.response &&
            axios.isAxiosError<{ errors: Array<ApiErrorItem> }>(error)
        ) {
            throw new ApiError(error.response.data.errors)
        }
        throw error
    }
)

export default apiClient
