import type { GenericAbortSignal } from 'axios'
import ApiClient from '../ApiClient'
import { ApiCategory } from '../api-interface'
import categoryMapper from '../mappers/categoryMapper'
import liquidParser from '../../utils/liquidParser'

export const apiEndPointCategoryList = liquidParser.parse(
    '{{vars.endpoints.category}}'
)
const token =
    'edb233f00a68c64b6f3c53aaa763bbebbee10c12130c86980806cf42ed0731604dc1ed8830872c241c3134a7fd8e2a0151aeea10fc73c113bd8cac4420b75a9a0f832a2f7db46920e51cabb8d8e47085316956086c4c9476496536caad1fdcdda834914be41ebd7650eb9b4032ac463dc04d8d70159fd043e553fa520d6cceb4'

export async function categoryList(config?: {
    abortSignal: GenericAbortSignal
}) {
    const { data } = await ApiClient.request<Array<ApiCategory>>({
        // content/spaces/<space_id>/categories
        url: `${apiEndPointCategoryList}`,
        method: 'GET',
        // headers: {
        //     Prefer: 'code=200',
        //     Authorization: `Bearer ${token}`,
        // },
        ...(config?.abortSignal && {
            signal: config.abortSignal,
        }),
    })
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return data.map((apiCategory: ApiCategory) => categoryMapper(apiCategory))
}
