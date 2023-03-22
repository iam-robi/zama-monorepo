/* tslint:disable */
/* eslint-disable */
/**
*/
export enum BooleanParameterSet {
  Default = 0,
  TfheLib = 1,
}
/**
*/
export class Boolean {
  free(): void;
/**
* @param {number} parameter_choice
* @returns {BooleanParameters}
*/
  static get_parameters(parameter_choice: number): BooleanParameters;
/**
* @param {number} lwe_dimension
* @param {number} glwe_dimension
* @param {number} polynomial_size
* @param {number} lwe_modular_std_dev
* @param {number} glwe_modular_std_dev
* @param {number} pbs_base_log
* @param {number} pbs_level
* @param {number} ks_base_log
* @param {number} ks_level
* @returns {BooleanParameters}
*/
  static new_parameters(lwe_dimension: number, glwe_dimension: number, polynomial_size: number, lwe_modular_std_dev: number, glwe_modular_std_dev: number, pbs_base_log: number, pbs_level: number, ks_base_log: number, ks_level: number): BooleanParameters;
/**
* @param {bigint} seed_high_bytes
* @param {bigint} seed_low_bytes
* @param {BooleanParameters} parameters
* @returns {BooleanClientKey}
*/
  static new_client_key_from_seed_and_parameters(seed_high_bytes: bigint, seed_low_bytes: bigint, parameters: BooleanParameters): BooleanClientKey;
/**
* @param {BooleanParameters} parameters
* @returns {BooleanClientKey}
*/
  static new_client_key(parameters: BooleanParameters): BooleanClientKey;
/**
* @param {BooleanClientKey} client_key
* @returns {BooleanPublicKey}
*/
  static new_public_key(client_key: BooleanClientKey): BooleanPublicKey;
/**
* @param {BooleanClientKey} client_key
* @returns {BooleanCompressedServerKey}
*/
  static new_compressed_server_key(client_key: BooleanClientKey): BooleanCompressedServerKey;
/**
* @param {BooleanClientKey} client_key
* @param {boolean} message
* @returns {BooleanCiphertext}
*/
  static encrypt(client_key: BooleanClientKey, message: boolean): BooleanCiphertext;
/**
* @param {BooleanClientKey} client_key
* @param {boolean} message
* @returns {BooleanCompressedCiphertext}
*/
  static encrypt_compressed(client_key: BooleanClientKey, message: boolean): BooleanCompressedCiphertext;
/**
* @param {BooleanCompressedCiphertext} compressed_ciphertext
* @returns {BooleanCiphertext}
*/
  static decompress_ciphertext(compressed_ciphertext: BooleanCompressedCiphertext): BooleanCiphertext;
/**
* @param {BooleanPublicKey} public_key
* @param {boolean} message
* @returns {BooleanCiphertext}
*/
  static encrypt_with_public_key(public_key: BooleanPublicKey, message: boolean): BooleanCiphertext;
/**
* @param {boolean} message
* @returns {BooleanCiphertext}
*/
  trivial_encrypt(message: boolean): BooleanCiphertext;
/**
* @param {BooleanClientKey} client_key
* @param {BooleanCiphertext} ct
* @returns {boolean}
*/
  static decrypt(client_key: BooleanClientKey, ct: BooleanCiphertext): boolean;
/**
* @param {BooleanCiphertext} ciphertext
* @returns {Uint8Array}
*/
  static serialize_ciphertext(ciphertext: BooleanCiphertext): Uint8Array;
/**
* @param {Uint8Array} buffer
* @returns {BooleanCiphertext}
*/
  static deserialize_ciphertext(buffer: Uint8Array): BooleanCiphertext;
/**
* @param {BooleanCompressedCiphertext} ciphertext
* @returns {Uint8Array}
*/
  static serialize_compressed_ciphertext(ciphertext: BooleanCompressedCiphertext): Uint8Array;
/**
* @param {Uint8Array} buffer
* @returns {BooleanCompressedCiphertext}
*/
  static deserialize_compressed_ciphertext(buffer: Uint8Array): BooleanCompressedCiphertext;
/**
* @param {BooleanClientKey} client_key
* @returns {Uint8Array}
*/
  static serialize_client_key(client_key: BooleanClientKey): Uint8Array;
/**
* @param {Uint8Array} buffer
* @returns {BooleanClientKey}
*/
  static deserialize_client_key(buffer: Uint8Array): BooleanClientKey;
/**
* @param {BooleanPublicKey} public_key
* @returns {Uint8Array}
*/
  static serialize_public_key(public_key: BooleanPublicKey): Uint8Array;
/**
* @param {Uint8Array} buffer
* @returns {BooleanPublicKey}
*/
  static deserialize_public_key(buffer: Uint8Array): BooleanPublicKey;
/**
* @param {BooleanCompressedServerKey} server_key
* @returns {Uint8Array}
*/
  static serialize_compressed_server_key(server_key: BooleanCompressedServerKey): Uint8Array;
/**
* @param {Uint8Array} buffer
* @returns {BooleanCompressedServerKey}
*/
  static deserialize_compressed_server_key(buffer: Uint8Array): BooleanCompressedServerKey;
}
/**
*/
export class BooleanCiphertext {
  free(): void;
}
/**
*/
export class BooleanClientKey {
  free(): void;
}
/**
*/
export class BooleanCompressedCiphertext {
  free(): void;
}
/**
*/
export class BooleanCompressedServerKey {
  free(): void;
}
/**
*/
export class BooleanParameters {
  free(): void;
}
/**
*/
export class BooleanPublicKey {
  free(): void;
}
/**
*/
export class Shortint {
  free(): void;
/**
* @param {number} message_bits
* @param {number} carry_bits
* @returns {ShortintParameters}
*/
  static get_parameters(message_bits: number, carry_bits: number): ShortintParameters;
/**
* @param {number} lwe_dimension
* @param {number} glwe_dimension
* @param {number} polynomial_size
* @param {number} lwe_modular_std_dev
* @param {number} glwe_modular_std_dev
* @param {number} pbs_base_log
* @param {number} pbs_level
* @param {number} ks_base_log
* @param {number} ks_level
* @param {number} pfks_level
* @param {number} pfks_base_log
* @param {number} pfks_modular_std_dev
* @param {number} cbs_level
* @param {number} cbs_base_log
* @param {number} message_modulus
* @param {number} carry_modulus
* @returns {ShortintParameters}
*/
  static new_parameters(lwe_dimension: number, glwe_dimension: number, polynomial_size: number, lwe_modular_std_dev: number, glwe_modular_std_dev: number, pbs_base_log: number, pbs_level: number, ks_base_log: number, ks_level: number, pfks_level: number, pfks_base_log: number, pfks_modular_std_dev: number, cbs_level: number, cbs_base_log: number, message_modulus: number, carry_modulus: number): ShortintParameters;
/**
* @param {bigint} seed_high_bytes
* @param {bigint} seed_low_bytes
* @param {ShortintParameters} parameters
* @returns {ShortintClientKey}
*/
  static new_client_key_from_seed_and_parameters(seed_high_bytes: bigint, seed_low_bytes: bigint, parameters: ShortintParameters): ShortintClientKey;
/**
* @param {ShortintParameters} parameters
* @returns {ShortintClientKey}
*/
  static new_client_key(parameters: ShortintParameters): ShortintClientKey;
/**
* @param {ShortintClientKey} client_key
* @returns {ShortintPublicKey}
*/
  static new_public_key(client_key: ShortintClientKey): ShortintPublicKey;
/**
* @param {ShortintClientKey} client_key
* @returns {ShortintCompressedPublicKey}
*/
  static new_compressed_public_key(client_key: ShortintClientKey): ShortintCompressedPublicKey;
/**
* @param {ShortintClientKey} client_key
* @returns {ShortintCompressedServerKey}
*/
  static new_compressed_server_key(client_key: ShortintClientKey): ShortintCompressedServerKey;
/**
* @param {ShortintClientKey} client_key
* @param {bigint} message
* @returns {ShortintCiphertext}
*/
  static encrypt(client_key: ShortintClientKey, message: bigint): ShortintCiphertext;
/**
* @param {ShortintClientKey} client_key
* @param {bigint} message
* @returns {ShortintCompressedCiphertext}
*/
  static encrypt_compressed(client_key: ShortintClientKey, message: bigint): ShortintCompressedCiphertext;
/**
* @param {ShortintCompressedCiphertext} compressed_ciphertext
* @returns {ShortintCiphertext}
*/
  static decompress_ciphertext(compressed_ciphertext: ShortintCompressedCiphertext): ShortintCiphertext;
/**
* @param {ShortintPublicKey} public_key
* @param {bigint} message
* @returns {ShortintCiphertext}
*/
  static encrypt_with_public_key(public_key: ShortintPublicKey, message: bigint): ShortintCiphertext;
/**
* @param {ShortintCompressedPublicKey} public_key
* @param {bigint} message
* @returns {ShortintCiphertext}
*/
  static encrypt_with_compressed_public_key(public_key: ShortintCompressedPublicKey, message: bigint): ShortintCiphertext;
/**
* @param {ShortintClientKey} client_key
* @param {ShortintCiphertext} ct
* @returns {bigint}
*/
  static decrypt(client_key: ShortintClientKey, ct: ShortintCiphertext): bigint;
/**
* @param {ShortintCiphertext} ciphertext
* @returns {Uint8Array}
*/
  static serialize_ciphertext(ciphertext: ShortintCiphertext): Uint8Array;
/**
* @param {Uint8Array} buffer
* @returns {ShortintCiphertext}
*/
  static deserialize_ciphertext(buffer: Uint8Array): ShortintCiphertext;
/**
* @param {ShortintCompressedCiphertext} ciphertext
* @returns {Uint8Array}
*/
  static serialize_compressed_ciphertext(ciphertext: ShortintCompressedCiphertext): Uint8Array;
/**
* @param {Uint8Array} buffer
* @returns {ShortintCompressedCiphertext}
*/
  static deserialize_compressed_ciphertext(buffer: Uint8Array): ShortintCompressedCiphertext;
/**
* @param {ShortintClientKey} client_key
* @returns {Uint8Array}
*/
  static serialize_client_key(client_key: ShortintClientKey): Uint8Array;
/**
* @param {Uint8Array} buffer
* @returns {ShortintClientKey}
*/
  static deserialize_client_key(buffer: Uint8Array): ShortintClientKey;
/**
* @param {ShortintPublicKey} public_key
* @returns {Uint8Array}
*/
  static serialize_public_key(public_key: ShortintPublicKey): Uint8Array;
/**
* @param {Uint8Array} buffer
* @returns {ShortintPublicKey}
*/
  static deserialize_public_key(buffer: Uint8Array): ShortintPublicKey;
/**
* @param {ShortintCompressedPublicKey} public_key
* @returns {Uint8Array}
*/
  static serialize_compressed_public_key(public_key: ShortintCompressedPublicKey): Uint8Array;
/**
* @param {Uint8Array} buffer
* @returns {ShortintCompressedPublicKey}
*/
  static deserialize_compressed_public_key(buffer: Uint8Array): ShortintCompressedPublicKey;
/**
* @param {ShortintCompressedServerKey} server_key
* @returns {Uint8Array}
*/
  static serialize_compressed_server_key(server_key: ShortintCompressedServerKey): Uint8Array;
/**
* @param {Uint8Array} buffer
* @returns {ShortintCompressedServerKey}
*/
  static deserialize_compressed_server_key(buffer: Uint8Array): ShortintCompressedServerKey;
}
/**
*/
export class ShortintCiphertext {
  free(): void;
}
/**
*/
export class ShortintClientKey {
  free(): void;
}
/**
*/
export class ShortintCompressedCiphertext {
  free(): void;
}
/**
*/
export class ShortintCompressedPublicKey {
  free(): void;
}
/**
*/
export class ShortintCompressedServerKey {
  free(): void;
}
/**
*/
export class ShortintParameters {
  free(): void;
}
/**
*/
export class ShortintPublicKey {
  free(): void;
}

export type InitInput = RequestInfo | URL | Response | BufferSource | WebAssembly.Module;

export interface InitOutput {
  readonly memory: WebAssembly.Memory;
  readonly __wbg_shortintciphertext_free: (a: number) => void;
  readonly __wbg_shortintcompressedciphertext_free: (a: number) => void;
  readonly __wbg_shortintclientkey_free: (a: number) => void;
  readonly __wbg_shortintpublickey_free: (a: number) => void;
  readonly __wbg_shortintcompressedpublickey_free: (a: number) => void;
  readonly __wbg_shortintcompressedserverkey_free: (a: number) => void;
  readonly __wbg_shortintparameters_free: (a: number) => void;
  readonly shortint_get_parameters: (a: number, b: number, c: number) => void;
  readonly shortint_new_parameters: (a: number, b: number, c: number, d: number, e: number, f: number, g: number, h: number, i: number, j: number, k: number, l: number, m: number, n: number, o: number, p: number) => number;
  readonly shortint_new_client_key_from_seed_and_parameters: (a: number, b: number, c: number, d: number) => void;
  readonly shortint_new_client_key: (a: number) => number;
  readonly shortint_new_public_key: (a: number) => number;
  readonly shortint_new_compressed_public_key: (a: number) => number;
  readonly shortint_new_compressed_server_key: (a: number) => number;
  readonly shortint_encrypt: (a: number, b: number) => number;
  readonly shortint_encrypt_compressed: (a: number, b: number) => number;
  readonly shortint_decompress_ciphertext: (a: number) => number;
  readonly shortint_encrypt_with_public_key: (a: number, b: number) => number;
  readonly shortint_encrypt_with_compressed_public_key: (a: number, b: number) => number;
  readonly shortint_decrypt: (a: number, b: number) => number;
  readonly shortint_serialize_ciphertext: (a: number, b: number) => void;
  readonly shortint_deserialize_ciphertext: (a: number, b: number, c: number) => void;
  readonly shortint_serialize_compressed_ciphertext: (a: number, b: number) => void;
  readonly shortint_deserialize_compressed_ciphertext: (a: number, b: number, c: number) => void;
  readonly shortint_serialize_client_key: (a: number, b: number) => void;
  readonly shortint_deserialize_client_key: (a: number, b: number, c: number) => void;
  readonly shortint_serialize_public_key: (a: number, b: number) => void;
  readonly shortint_deserialize_public_key: (a: number, b: number, c: number) => void;
  readonly shortint_serialize_compressed_public_key: (a: number, b: number) => void;
  readonly shortint_deserialize_compressed_public_key: (a: number, b: number, c: number) => void;
  readonly shortint_serialize_compressed_server_key: (a: number, b: number) => void;
  readonly shortint_deserialize_compressed_server_key: (a: number, b: number, c: number) => void;
  readonly __wbg_shortint_free: (a: number) => void;
  readonly __wbg_booleanciphertext_free: (a: number) => void;
  readonly __wbg_booleancompressedciphertext_free: (a: number) => void;
  readonly __wbg_booleanclientkey_free: (a: number) => void;
  readonly __wbg_booleanpublickey_free: (a: number) => void;
  readonly __wbg_booleancompressedserverkey_free: (a: number) => void;
  readonly __wbg_booleanparameters_free: (a: number) => void;
  readonly boolean_get_parameters: (a: number, b: number) => void;
  readonly boolean_new_parameters: (a: number, b: number, c: number, d: number, e: number, f: number, g: number, h: number, i: number) => number;
  readonly boolean_new_client_key_from_seed_and_parameters: (a: number, b: number, c: number) => number;
  readonly boolean_new_client_key: (a: number) => number;
  readonly boolean_new_public_key: (a: number) => number;
  readonly boolean_new_compressed_server_key: (a: number) => number;
  readonly boolean_encrypt: (a: number, b: number) => number;
  readonly boolean_encrypt_compressed: (a: number, b: number) => number;
  readonly boolean_decompress_ciphertext: (a: number) => number;
  readonly boolean_encrypt_with_public_key: (a: number, b: number) => number;
  readonly boolean_trivial_encrypt: (a: number, b: number) => number;
  readonly boolean_decrypt: (a: number, b: number) => number;
  readonly boolean_serialize_ciphertext: (a: number, b: number) => void;
  readonly boolean_deserialize_ciphertext: (a: number, b: number, c: number) => void;
  readonly boolean_serialize_compressed_ciphertext: (a: number, b: number) => void;
  readonly boolean_deserialize_compressed_ciphertext: (a: number, b: number, c: number) => void;
  readonly boolean_serialize_client_key: (a: number, b: number) => void;
  readonly boolean_deserialize_client_key: (a: number, b: number, c: number) => void;
  readonly boolean_serialize_public_key: (a: number, b: number) => void;
  readonly boolean_deserialize_public_key: (a: number, b: number, c: number) => void;
  readonly boolean_serialize_compressed_server_key: (a: number, b: number) => void;
  readonly boolean_deserialize_compressed_server_key: (a: number, b: number, c: number) => void;
  readonly __wbg_boolean_free: (a: number) => void;
  readonly __wbindgen_add_to_stack_pointer: (a: number) => number;
  readonly __wbindgen_free: (a: number, b: number) => void;
  readonly __wbindgen_malloc: (a: number) => number;
  readonly __wbindgen_realloc: (a: number, b: number, c: number) => number;
  readonly __wbindgen_exn_store: (a: number) => void;
}

export type SyncInitInput = BufferSource | WebAssembly.Module;
/**
* Instantiates the given `module`, which can either be bytes or
* a precompiled `WebAssembly.Module`.
*
* @param {SyncInitInput} module
*
* @returns {InitOutput}
*/
export function initSync(module: SyncInitInput): InitOutput;

/**
* If `module_or_path` is {RequestInfo} or {URL}, makes a request and
* for everything else, calls `WebAssembly.instantiate` directly.
*
* @param {InitInput | Promise<InitInput>} module_or_path
*
* @returns {Promise<InitOutput>}
*/
export default function init (module_or_path?: InitInput | Promise<InitInput>): Promise<InitOutput>;
