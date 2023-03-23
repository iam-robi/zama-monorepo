//TODO: client side only
import { Shortint, Boolean } from 'tfhe'
import { TfheDataType } from '~/types/tfhe'

export default defineEventHandler(async (event) => {
    const body = await readBody(event)
    let deserialized_cks = Shortint.deserialize_client_key(body.cks);
    let result = Shortint.decrypt(body.cks, body.cyphertext);

    return {
      result
    }

})
  