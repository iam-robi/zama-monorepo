import { Shortint, Boolean } from 'tfhe'
import { TfheDataType } from '~~/types/tfhe'

export default defineEventHandler(async (event) => {
    const body = await readBody(event)
    console.log(body)
    return {
      cyphertext: 'ee',
    }
})
  