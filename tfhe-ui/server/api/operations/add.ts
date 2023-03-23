import { Shortint, Boolean } from 'tfhe'
import { shortint_deserialize_client_key } from '~~/public/tfhe-wasm/tfhe_bg.wasm';
import { TfheDataType } from '~~/types/tfhe'

export default defineEventHandler(async (event) => {
    const body = await readBody(event)
    let deserialized_cks = Shortint.deserialize_client_key(body.cks);
    let sks = Shortint.new_compressed_server_key(deserialized_cks);
    let ct = body.ct;
    let fake_result_ct = [0,8,0,3];
    //TODO: support for sks.unchecked_add(sks, ct, ct) or run rust webserver

    return {
      cyphertext: Object.freeze(Array.from(fake_result_ct)),
    }
})
  