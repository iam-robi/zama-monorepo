//TODO: client side only
import { Shortint, Boolean } from 'tfhe'
import { shortint_deserialize_client_key } from '~~/public/tfhe-wasm/tfhe_bg.wasm';
import { TfheDataType  } from '~~/types/tfhe'

export default defineEventHandler(async (event) => {
    const body = await readBody(event)
    let deserialized_cks = Shortint.deserialize_client_key(body.cks);
    //TODO: make encrypted number dynamic and check for overflow + check all body types
    let ct = Shortint.encrypt(deserialized_cks, BigInt(body.message));
    let serialized_ct = Shortint.serialize_ciphertext(ct);
    
    return {
      serializedCiphertext: Object.freeze(Array.from(serialized_ct)),
      encodedCiphertext: btoa(String.fromCharCode.apply(null, Array.from(serialized_ct))),
    }
})
  