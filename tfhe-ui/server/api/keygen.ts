//TODO: client side only
import { Shortint, ShortintPublicKey } from 'tfhe'

export default defineEventHandler(async (event) => {
    const query = getQuery(event)
    
    //default values
    let messageBits = 2;
    let carryBits = 2;
    
    if (query.message) { 
      messageBits = parseInt(query.message.toString())
    }
    if (query.carry) { 
      carryBits = parseInt(query.carry.toString())
    }
    let params = Shortint.get_parameters(messageBits, carryBits);
    console.log("Generating client keys...")
    let cks = Shortint.new_client_key(params);
    let serialized_cks = Shortint.serialize_client_key(cks);
    let sks = Shortint.new_compressed_server_key(cks);
    let serialized_sks  = Shortint.serialize_compressed_server_key(sks);

    console.log("keys generated");
    
    //TODO: check if  possible to remove errors with sks (array too big for JS) 
    return {
      // serverkey: Object.freeze(Array.from(serialized_sks)),
      clientkey: Object.freeze(Array.from(serialized_cks)),
    }
})