import { Shortint, ShortintPublicKey } from 'tfhe'

export default defineEventHandler(async (event) => {
    const query = getQuery(event)
    let messageBits = 2;
    let carryBits = 2;
    
    if (query.message) { 
      messageBits = parseInt(query.message.toString())
    }
    if (query.carry) { 
      carryBits = parseInt(query.carry.toString())
    }

    console.log("messageBits: " + messageBits)

    // // information in total (2 bits of "message" and 2 bits of "carry")
    let params = Shortint.get_parameters(messageBits, carryBits);
    // Create a new secret ClientKey, this must not be shared
    console.log("Generating client keys...")
    let cks = Shortint.new_client_key(params);

  
    // // Demonstrate ClientKey serialization (for example saving it on disk on the user device)
    let serialized_cks = Shortint.serialize_client_key(cks);
    let sks = Shortint.new_compressed_server_key(cks);
    let serialized_sks  = Shortint.serialize_compressed_server_key(sks);

    console.log("keys generated");
    // console.log(serialized_cks)
    // console.log(cks)

    // console.log(sks)
    // console.log(serialized_sks)
    
    return {
      serverkey: serialized_cks,
      clientkey: serialized_sks
    }
})