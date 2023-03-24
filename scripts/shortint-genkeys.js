// Here import assert to check the decryption went well and panic otherwise
const assert = require('node:assert').strict;
// Import the Shortint module from the TFHE-rs package generated earlier
const { Shortint } = require("../tfhe-rs/wasm/nodejs/tfhe");

function shortint_example() {
    // Get pre-defined parameters from the shortint module to manage messages with 4 bits of useful
    // information in total (2 bits of "message" and 2 bits of "carry")
    let params = Shortint.get_parameters(2, 2);
    // Create a new secret ClientKey, this must not be shared
    console.log("Generating client keys...")
    let cks = Shortint.new_client_key(params);
    // Encrypt 3 in a ciphertext
    console.log("Encrypting 3...")
    let ct = Shortint.encrypt(cks, BigInt(3));

    // Demonstrate ClientKey serialization (for example saving it on disk on the user device)
    let serialized_cks = Shortint.serialize_client_key(cks);
    // Deserialization
    let deserialized_cks = Shortint.deserialize_client_key(serialized_cks);

    // Demonstrate ciphertext serialization to send over the network
    let serialized_ct = Shortint.serialize_ciphertext(ct);
    // Deserialize a ciphertext received over the network for example
    let deserialized_ct = Shortint.deserialize_ciphertext(serialized_ct);

    // Decrypt with the deserialized objects
    console.log("Decrypting ciphertext...")
    let decrypted = Shortint.decrypt(deserialized_cks, deserialized_ct);
    // Check decryption works as expected
    assert.deepStrictEqual(decrypted, BigInt(3));
    console.log("Decryption successful!")

    // Generate public evaluation keys, also called ServerKey
    console.log("Generating compressed ServerKey...")
    let sks = Shortint.new_compressed_server_key(cks);
    
    console.log("sks", sks)
    // Can be serialized to send over the network to the machine doing the evaluation
    let serialized_sks = Shortint.serialize_compressed_server_key(sks);
    console.log("seria", serialized_sks)
    let deserialized_sks = Shortint.deserialize_compressed_server_key(serialized_sks);
    console.log("deser", deserialized_sks)
    console.log("All done!")
}

shortint_example();