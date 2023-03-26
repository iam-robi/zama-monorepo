import { BooleanClientKey , BooleanPublicKey, ShortintClientKey , ShortintPublicKey } from "tfhe";
type Uint8ArrayLengthClient = 38864;
type SerializedClientKey = [Uint8Array] & { length: Uint8ArrayLengthClient };
type Uint8ArrayLengthServer = 24395904;
type SerializedServerKey = [Uint8Array] & { length: Uint8ArrayLengthServer };
export interface KeysState {
    keypairId: null | string;
    serialized_cks: null | SerializedClientKey ;
    serialized_sks: any ;
    encoded_cks: null | string ;
    encoded_sks: null | string ;
    serializedCiphertext: any;
    encodedCiphertext: any;
    result: any;
    // result_ct: cyphertext result from operation
    result_ct: any;
}


