import { Shortint, Boolean } from 'tfhe'
import { shortint_deserialize_client_key } from '~~/public/tfhe-wasm/tfhe_bg.wasm';
import { TfheDataType } from '~~/types/tfhe'

export default defineEventHandler(async (event) => {
    const body = await readBody(event)
    console.log("reconstructing client key...")
    let deserialized_cks = Shortint.deserialize_client_key(body.cks);
    console.log("client key reconstructed")
    console.log("generating server key...")
    let sks = Shortint.new_compressed_server_key(deserialized_cks);
    console.log("server key generated")
    console.log("serializing server key...")
    let serialized_sks  = Shortint.serialize_compressed_server_key(sks);
    //TODO: support for sks.unchecked_add(sks, ct, ct) or run rust webserver 
    console.log("server key serialized")
    return {
      sks: serialized_sks,
    }
})
  