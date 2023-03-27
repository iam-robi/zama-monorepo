import { Shortint, Boolean } from 'tfhe'
import { shortint_deserialize_client_key } from '~~/public/tfhe-wasm/tfhe_bg.wasm';
import { TfheDataType } from '~~/types/tfhe'
import axios from 'axios' 
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
    let serialized_ct1 = body.ct1;

    let arr = Array.from(serialized_sks);
    let ct1arr = Array.from(serialized_ct1);
    var data = JSON.stringify({
      "sks": arr,
      "ct1": ct1arr,
      "ct2": ct1arr,
      "uuid": "49e0cfb4-6f52-4391-a2ec-25ffffe93f8f"
    });


    var config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: 'http://127.0.0.1:8000/serverkey',
      headers: { 
        'Content-Type': 'application/json',
      
      },
      data : data
    };
    axios(config)
    .then(function (response) {
      console.log(JSON.stringify(response.data));
    })
    .catch(function (error) {
      console.log(error);
    });
  
  
    return {
      statusCode: 200,
    }
})
  