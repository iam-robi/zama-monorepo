import { BooleanClientKey , BooleanPublicKey, ShortintClientKey , ShortintPublicKey } from "tfhe";
type Uint8ArrayLengthClient = 38864;
type SerializedClientKey = [Uint8Array] & { length: Uint8ArrayLengthClient };
type Uint8ArrayLengthServer = 24395904;
type SerializedServerKey = [Uint8Array] & { length: Uint8ArrayLengthServer };
export interface KeysState {
    cks: null | BooleanClientKey | ShortintClientKey;
    sks: null |BooleanPublicKey |ShortintPublicKey;
    serialized_cks: null | SerializedClientKey ;
    serialized_sks: null | SerializedServerKey ;
}


