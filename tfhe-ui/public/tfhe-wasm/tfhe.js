let wasm;

const cachedTextDecoder = new TextDecoder('utf-8', { ignoreBOM: true, fatal: true });

cachedTextDecoder.decode();

let cachedUint8Memory0 = null;

function getUint8Memory0() {
    if (cachedUint8Memory0 === null || cachedUint8Memory0.byteLength === 0) {
        cachedUint8Memory0 = new Uint8Array(wasm.memory.buffer);
    }
    return cachedUint8Memory0;
}

function getStringFromWasm0(ptr, len) {
    return cachedTextDecoder.decode(getUint8Memory0().subarray(ptr, ptr + len));
}

const heap = new Array(128).fill(undefined);

heap.push(undefined, null, true, false);

let heap_next = heap.length;

function addHeapObject(obj) {
    if (heap_next === heap.length) heap.push(heap.length + 1);
    const idx = heap_next;
    heap_next = heap[idx];

    heap[idx] = obj;
    return idx;
}

function getObject(idx) { return heap[idx]; }

function dropObject(idx) {
    if (idx < 132) return;
    heap[idx] = heap_next;
    heap_next = idx;
}

function takeObject(idx) {
    const ret = getObject(idx);
    dropObject(idx);
    return ret;
}

let cachedInt32Memory0 = null;

function getInt32Memory0() {
    if (cachedInt32Memory0 === null || cachedInt32Memory0.byteLength === 0) {
        cachedInt32Memory0 = new Int32Array(wasm.memory.buffer);
    }
    return cachedInt32Memory0;
}

function _assertClass(instance, klass) {
    if (!(instance instanceof klass)) {
        throw new Error(`expected instance of ${klass.name}`);
    }
    return instance.ptr;
}

function getArrayU8FromWasm0(ptr, len) {
    return getUint8Memory0().subarray(ptr / 1, ptr / 1 + len);
}

let WASM_VECTOR_LEN = 0;

function passArray8ToWasm0(arg, malloc) {
    const ptr = malloc(arg.length * 1);
    getUint8Memory0().set(arg, ptr / 1);
    WASM_VECTOR_LEN = arg.length;
    return ptr;
}

const cachedTextEncoder = new TextEncoder('utf-8');

const encodeString = (typeof cachedTextEncoder.encodeInto === 'function'
    ? function (arg, view) {
    return cachedTextEncoder.encodeInto(arg, view);
}
    : function (arg, view) {
    const buf = cachedTextEncoder.encode(arg);
    view.set(buf);
    return {
        read: arg.length,
        written: buf.length
    };
});

function passStringToWasm0(arg, malloc, realloc) {

    if (realloc === undefined) {
        const buf = cachedTextEncoder.encode(arg);
        const ptr = malloc(buf.length);
        getUint8Memory0().subarray(ptr, ptr + buf.length).set(buf);
        WASM_VECTOR_LEN = buf.length;
        return ptr;
    }

    let len = arg.length;
    let ptr = malloc(len);

    const mem = getUint8Memory0();

    let offset = 0;

    for (; offset < len; offset++) {
        const code = arg.charCodeAt(offset);
        if (code > 0x7F) break;
        mem[ptr + offset] = code;
    }

    if (offset !== len) {
        if (offset !== 0) {
            arg = arg.slice(offset);
        }
        ptr = realloc(ptr, len, len = offset + arg.length * 3);
        const view = getUint8Memory0().subarray(ptr + offset, ptr + len);
        const ret = encodeString(arg, view);

        offset += ret.written;
    }

    WASM_VECTOR_LEN = offset;
    return ptr;
}

function handleError(f, args) {
    try {
        return f.apply(this, args);
    } catch (e) {
        wasm.__wbindgen_exn_store(addHeapObject(e));
    }
}
/**
*/
export const BooleanParameterSet = Object.freeze({ Default:0,"0":"Default",TfheLib:1,"1":"TfheLib", });
/**
*/
export class Boolean {

    __destroy_into_raw() {
        const ptr = this.ptr;
        this.ptr = 0;

        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_boolean_free(ptr);
    }
    /**
    * @param {number} parameter_choice
    * @returns {BooleanParameters}
    */
    static get_parameters(parameter_choice) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.boolean_get_parameters(retptr, parameter_choice);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return BooleanParameters.__wrap(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
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
    static new_parameters(lwe_dimension, glwe_dimension, polynomial_size, lwe_modular_std_dev, glwe_modular_std_dev, pbs_base_log, pbs_level, ks_base_log, ks_level) {
        const ret = wasm.boolean_new_parameters(lwe_dimension, glwe_dimension, polynomial_size, lwe_modular_std_dev, glwe_modular_std_dev, pbs_base_log, pbs_level, ks_base_log, ks_level);
        return BooleanParameters.__wrap(ret);
    }
    /**
    * @param {bigint} seed_high_bytes
    * @param {bigint} seed_low_bytes
    * @param {BooleanParameters} parameters
    * @returns {BooleanClientKey}
    */
    static new_client_key_from_seed_and_parameters(seed_high_bytes, seed_low_bytes, parameters) {
        _assertClass(parameters, BooleanParameters);
        const ret = wasm.boolean_new_client_key_from_seed_and_parameters(seed_high_bytes, seed_low_bytes, parameters.ptr);
        return BooleanClientKey.__wrap(ret);
    }
    /**
    * @param {BooleanParameters} parameters
    * @returns {BooleanClientKey}
    */
    static new_client_key(parameters) {
        _assertClass(parameters, BooleanParameters);
        const ret = wasm.boolean_new_client_key(parameters.ptr);
        return BooleanClientKey.__wrap(ret);
    }
    /**
    * @param {BooleanClientKey} client_key
    * @returns {BooleanPublicKey}
    */
    static new_public_key(client_key) {
        _assertClass(client_key, BooleanClientKey);
        const ret = wasm.boolean_new_public_key(client_key.ptr);
        return BooleanPublicKey.__wrap(ret);
    }
    /**
    * @param {BooleanClientKey} client_key
    * @returns {BooleanCompressedServerKey}
    */
    static new_compressed_server_key(client_key) {
        _assertClass(client_key, BooleanClientKey);
        const ret = wasm.boolean_new_compressed_server_key(client_key.ptr);
        return BooleanCompressedServerKey.__wrap(ret);
    }
    /**
    * @param {BooleanClientKey} client_key
    * @param {boolean} message
    * @returns {BooleanCiphertext}
    */
    static encrypt(client_key, message) {
        _assertClass(client_key, BooleanClientKey);
        const ret = wasm.boolean_encrypt(client_key.ptr, message);
        return BooleanCiphertext.__wrap(ret);
    }
    /**
    * @param {BooleanClientKey} client_key
    * @param {boolean} message
    * @returns {BooleanCompressedCiphertext}
    */
    static encrypt_compressed(client_key, message) {
        _assertClass(client_key, BooleanClientKey);
        const ret = wasm.boolean_encrypt_compressed(client_key.ptr, message);
        return BooleanCompressedCiphertext.__wrap(ret);
    }
    /**
    * @param {BooleanCompressedCiphertext} compressed_ciphertext
    * @returns {BooleanCiphertext}
    */
    static decompress_ciphertext(compressed_ciphertext) {
        _assertClass(compressed_ciphertext, BooleanCompressedCiphertext);
        const ret = wasm.boolean_decompress_ciphertext(compressed_ciphertext.ptr);
        return BooleanCiphertext.__wrap(ret);
    }
    /**
    * @param {BooleanPublicKey} public_key
    * @param {boolean} message
    * @returns {BooleanCiphertext}
    */
    static encrypt_with_public_key(public_key, message) {
        _assertClass(public_key, BooleanPublicKey);
        const ret = wasm.boolean_encrypt_with_public_key(public_key.ptr, message);
        return BooleanCiphertext.__wrap(ret);
    }
    /**
    * @param {boolean} message
    * @returns {BooleanCiphertext}
    */
    trivial_encrypt(message) {
        const ret = wasm.boolean_trivial_encrypt(this.ptr, message);
        return BooleanCiphertext.__wrap(ret);
    }
    /**
    * @param {BooleanClientKey} client_key
    * @param {BooleanCiphertext} ct
    * @returns {boolean}
    */
    static decrypt(client_key, ct) {
        _assertClass(client_key, BooleanClientKey);
        _assertClass(ct, BooleanCiphertext);
        const ret = wasm.boolean_decrypt(client_key.ptr, ct.ptr);
        return ret !== 0;
    }
    /**
    * @param {BooleanCiphertext} ciphertext
    * @returns {Uint8Array}
    */
    static serialize_ciphertext(ciphertext) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            _assertClass(ciphertext, BooleanCiphertext);
            wasm.boolean_serialize_ciphertext(retptr, ciphertext.ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            var r3 = getInt32Memory0()[retptr / 4 + 3];
            if (r3) {
                throw takeObject(r2);
            }
            var v0 = getArrayU8FromWasm0(r0, r1).slice();
            wasm.__wbindgen_free(r0, r1 * 1);
            return v0;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {Uint8Array} buffer
    * @returns {BooleanCiphertext}
    */
    static deserialize_ciphertext(buffer) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            const ptr0 = passArray8ToWasm0(buffer, wasm.__wbindgen_malloc);
            const len0 = WASM_VECTOR_LEN;
            wasm.boolean_deserialize_ciphertext(retptr, ptr0, len0);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return BooleanCiphertext.__wrap(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {BooleanCompressedCiphertext} ciphertext
    * @returns {Uint8Array}
    */
    static serialize_compressed_ciphertext(ciphertext) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            _assertClass(ciphertext, BooleanCompressedCiphertext);
            wasm.boolean_serialize_compressed_ciphertext(retptr, ciphertext.ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            var r3 = getInt32Memory0()[retptr / 4 + 3];
            if (r3) {
                throw takeObject(r2);
            }
            var v0 = getArrayU8FromWasm0(r0, r1).slice();
            wasm.__wbindgen_free(r0, r1 * 1);
            return v0;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {Uint8Array} buffer
    * @returns {BooleanCompressedCiphertext}
    */
    static deserialize_compressed_ciphertext(buffer) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            const ptr0 = passArray8ToWasm0(buffer, wasm.__wbindgen_malloc);
            const len0 = WASM_VECTOR_LEN;
            wasm.boolean_deserialize_compressed_ciphertext(retptr, ptr0, len0);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return BooleanCompressedCiphertext.__wrap(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {BooleanClientKey} client_key
    * @returns {Uint8Array}
    */
    static serialize_client_key(client_key) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            _assertClass(client_key, BooleanClientKey);
            wasm.boolean_serialize_client_key(retptr, client_key.ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            var r3 = getInt32Memory0()[retptr / 4 + 3];
            if (r3) {
                throw takeObject(r2);
            }
            var v0 = getArrayU8FromWasm0(r0, r1).slice();
            wasm.__wbindgen_free(r0, r1 * 1);
            return v0;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {Uint8Array} buffer
    * @returns {BooleanClientKey}
    */
    static deserialize_client_key(buffer) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            const ptr0 = passArray8ToWasm0(buffer, wasm.__wbindgen_malloc);
            const len0 = WASM_VECTOR_LEN;
            wasm.boolean_deserialize_client_key(retptr, ptr0, len0);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return BooleanClientKey.__wrap(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {BooleanPublicKey} public_key
    * @returns {Uint8Array}
    */
    static serialize_public_key(public_key) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            _assertClass(public_key, BooleanPublicKey);
            wasm.boolean_serialize_public_key(retptr, public_key.ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            var r3 = getInt32Memory0()[retptr / 4 + 3];
            if (r3) {
                throw takeObject(r2);
            }
            var v0 = getArrayU8FromWasm0(r0, r1).slice();
            wasm.__wbindgen_free(r0, r1 * 1);
            return v0;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {Uint8Array} buffer
    * @returns {BooleanPublicKey}
    */
    static deserialize_public_key(buffer) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            const ptr0 = passArray8ToWasm0(buffer, wasm.__wbindgen_malloc);
            const len0 = WASM_VECTOR_LEN;
            wasm.boolean_deserialize_public_key(retptr, ptr0, len0);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return BooleanPublicKey.__wrap(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {BooleanCompressedServerKey} server_key
    * @returns {Uint8Array}
    */
    static serialize_compressed_server_key(server_key) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            _assertClass(server_key, BooleanCompressedServerKey);
            wasm.boolean_serialize_compressed_server_key(retptr, server_key.ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            var r3 = getInt32Memory0()[retptr / 4 + 3];
            if (r3) {
                throw takeObject(r2);
            }
            var v0 = getArrayU8FromWasm0(r0, r1).slice();
            wasm.__wbindgen_free(r0, r1 * 1);
            return v0;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {Uint8Array} buffer
    * @returns {BooleanCompressedServerKey}
    */
    static deserialize_compressed_server_key(buffer) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            const ptr0 = passArray8ToWasm0(buffer, wasm.__wbindgen_malloc);
            const len0 = WASM_VECTOR_LEN;
            wasm.boolean_deserialize_compressed_server_key(retptr, ptr0, len0);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return BooleanCompressedServerKey.__wrap(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
}
/**
*/
export class BooleanCiphertext {

    static __wrap(ptr) {
        const obj = Object.create(BooleanCiphertext.prototype);
        obj.ptr = ptr;

        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.ptr;
        this.ptr = 0;

        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_booleanciphertext_free(ptr);
    }
}
/**
*/
export class BooleanClientKey {

    static __wrap(ptr) {
        const obj = Object.create(BooleanClientKey.prototype);
        obj.ptr = ptr;

        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.ptr;
        this.ptr = 0;

        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_booleanclientkey_free(ptr);
    }
}
/**
*/
export class BooleanCompressedCiphertext {

    static __wrap(ptr) {
        const obj = Object.create(BooleanCompressedCiphertext.prototype);
        obj.ptr = ptr;

        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.ptr;
        this.ptr = 0;

        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_booleancompressedciphertext_free(ptr);
    }
}
/**
*/
export class BooleanCompressedServerKey {

    static __wrap(ptr) {
        const obj = Object.create(BooleanCompressedServerKey.prototype);
        obj.ptr = ptr;

        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.ptr;
        this.ptr = 0;

        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_booleancompressedserverkey_free(ptr);
    }
}
/**
*/
export class BooleanParameters {

    static __wrap(ptr) {
        const obj = Object.create(BooleanParameters.prototype);
        obj.ptr = ptr;

        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.ptr;
        this.ptr = 0;

        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_booleanparameters_free(ptr);
    }
}
/**
*/
export class BooleanPublicKey {

    static __wrap(ptr) {
        const obj = Object.create(BooleanPublicKey.prototype);
        obj.ptr = ptr;

        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.ptr;
        this.ptr = 0;

        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_booleanpublickey_free(ptr);
    }
}
/**
*/
export class Shortint {

    __destroy_into_raw() {
        const ptr = this.ptr;
        this.ptr = 0;

        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_shortint_free(ptr);
    }
    /**
    * @param {number} message_bits
    * @param {number} carry_bits
    * @returns {ShortintParameters}
    */
    static get_parameters(message_bits, carry_bits) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.shortint_get_parameters(retptr, message_bits, carry_bits);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return ShortintParameters.__wrap(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
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
    static new_parameters(lwe_dimension, glwe_dimension, polynomial_size, lwe_modular_std_dev, glwe_modular_std_dev, pbs_base_log, pbs_level, ks_base_log, ks_level, pfks_level, pfks_base_log, pfks_modular_std_dev, cbs_level, cbs_base_log, message_modulus, carry_modulus) {
        const ret = wasm.shortint_new_parameters(lwe_dimension, glwe_dimension, polynomial_size, lwe_modular_std_dev, glwe_modular_std_dev, pbs_base_log, pbs_level, ks_base_log, ks_level, pfks_level, pfks_base_log, pfks_modular_std_dev, cbs_level, cbs_base_log, message_modulus, carry_modulus);
        return ShortintParameters.__wrap(ret);
    }
    /**
    * @param {bigint} seed_high_bytes
    * @param {bigint} seed_low_bytes
    * @param {ShortintParameters} parameters
    * @returns {ShortintClientKey}
    */
    static new_client_key_from_seed_and_parameters(seed_high_bytes, seed_low_bytes, parameters) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            _assertClass(parameters, ShortintParameters);
            wasm.shortint_new_client_key_from_seed_and_parameters(retptr, seed_high_bytes, seed_low_bytes, parameters.ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return ShortintClientKey.__wrap(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {ShortintParameters} parameters
    * @returns {ShortintClientKey}
    */
    static new_client_key(parameters) {
        _assertClass(parameters, ShortintParameters);
        const ret = wasm.shortint_new_client_key(parameters.ptr);
        return ShortintClientKey.__wrap(ret);
    }
    /**
    * @param {ShortintClientKey} client_key
    * @returns {ShortintPublicKey}
    */
    static new_public_key(client_key) {
        _assertClass(client_key, ShortintClientKey);
        const ret = wasm.shortint_new_public_key(client_key.ptr);
        return ShortintPublicKey.__wrap(ret);
    }
    /**
    * @param {ShortintClientKey} client_key
    * @returns {ShortintCompressedPublicKey}
    */
    static new_compressed_public_key(client_key) {
        _assertClass(client_key, ShortintClientKey);
        const ret = wasm.shortint_new_compressed_public_key(client_key.ptr);
        return ShortintCompressedPublicKey.__wrap(ret);
    }
    /**
    * @param {ShortintClientKey} client_key
    * @returns {ShortintCompressedServerKey}
    */
    static new_compressed_server_key(client_key) {
        _assertClass(client_key, ShortintClientKey);
        const ret = wasm.shortint_new_compressed_server_key(client_key.ptr);
        return ShortintCompressedServerKey.__wrap(ret);
    }
    /**
    * @param {ShortintClientKey} client_key
    * @param {bigint} message
    * @returns {ShortintCiphertext}
    */
    static encrypt(client_key, message) {
        _assertClass(client_key, ShortintClientKey);
        const ret = wasm.shortint_encrypt(client_key.ptr, message);
        return ShortintCiphertext.__wrap(ret);
    }
    /**
    * @param {ShortintClientKey} client_key
    * @param {bigint} message
    * @returns {ShortintCompressedCiphertext}
    */
    static encrypt_compressed(client_key, message) {
        _assertClass(client_key, ShortintClientKey);
        const ret = wasm.shortint_encrypt_compressed(client_key.ptr, message);
        return ShortintCompressedCiphertext.__wrap(ret);
    }
    /**
    * @param {ShortintCompressedCiphertext} compressed_ciphertext
    * @returns {ShortintCiphertext}
    */
    static decompress_ciphertext(compressed_ciphertext) {
        _assertClass(compressed_ciphertext, ShortintCompressedCiphertext);
        const ret = wasm.shortint_decompress_ciphertext(compressed_ciphertext.ptr);
        return ShortintCiphertext.__wrap(ret);
    }
    /**
    * @param {ShortintPublicKey} public_key
    * @param {bigint} message
    * @returns {ShortintCiphertext}
    */
    static encrypt_with_public_key(public_key, message) {
        _assertClass(public_key, ShortintPublicKey);
        const ret = wasm.shortint_encrypt_with_public_key(public_key.ptr, message);
        return ShortintCiphertext.__wrap(ret);
    }
    /**
    * @param {ShortintCompressedPublicKey} public_key
    * @param {bigint} message
    * @returns {ShortintCiphertext}
    */
    static encrypt_with_compressed_public_key(public_key, message) {
        _assertClass(public_key, ShortintCompressedPublicKey);
        const ret = wasm.shortint_encrypt_with_compressed_public_key(public_key.ptr, message);
        return ShortintCiphertext.__wrap(ret);
    }
    /**
    * @param {ShortintClientKey} client_key
    * @param {ShortintCiphertext} ct
    * @returns {bigint}
    */
    static decrypt(client_key, ct) {
        _assertClass(client_key, ShortintClientKey);
        _assertClass(ct, ShortintCiphertext);
        const ret = wasm.shortint_decrypt(client_key.ptr, ct.ptr);
        return BigInt.asUintN(64, ret);
    }
    /**
    * @param {ShortintCiphertext} ciphertext
    * @returns {Uint8Array}
    */
    static serialize_ciphertext(ciphertext) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            _assertClass(ciphertext, ShortintCiphertext);
            wasm.shortint_serialize_ciphertext(retptr, ciphertext.ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            var r3 = getInt32Memory0()[retptr / 4 + 3];
            if (r3) {
                throw takeObject(r2);
            }
            var v0 = getArrayU8FromWasm0(r0, r1).slice();
            wasm.__wbindgen_free(r0, r1 * 1);
            return v0;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {Uint8Array} buffer
    * @returns {ShortintCiphertext}
    */
    static deserialize_ciphertext(buffer) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            const ptr0 = passArray8ToWasm0(buffer, wasm.__wbindgen_malloc);
            const len0 = WASM_VECTOR_LEN;
            wasm.shortint_deserialize_ciphertext(retptr, ptr0, len0);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return ShortintCiphertext.__wrap(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {ShortintCompressedCiphertext} ciphertext
    * @returns {Uint8Array}
    */
    static serialize_compressed_ciphertext(ciphertext) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            _assertClass(ciphertext, ShortintCompressedCiphertext);
            wasm.shortint_serialize_compressed_ciphertext(retptr, ciphertext.ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            var r3 = getInt32Memory0()[retptr / 4 + 3];
            if (r3) {
                throw takeObject(r2);
            }
            var v0 = getArrayU8FromWasm0(r0, r1).slice();
            wasm.__wbindgen_free(r0, r1 * 1);
            return v0;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {Uint8Array} buffer
    * @returns {ShortintCompressedCiphertext}
    */
    static deserialize_compressed_ciphertext(buffer) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            const ptr0 = passArray8ToWasm0(buffer, wasm.__wbindgen_malloc);
            const len0 = WASM_VECTOR_LEN;
            wasm.shortint_deserialize_compressed_ciphertext(retptr, ptr0, len0);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return ShortintCompressedCiphertext.__wrap(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {ShortintClientKey} client_key
    * @returns {Uint8Array}
    */
    static serialize_client_key(client_key) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            _assertClass(client_key, ShortintClientKey);
            wasm.shortint_serialize_client_key(retptr, client_key.ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            var r3 = getInt32Memory0()[retptr / 4 + 3];
            if (r3) {
                throw takeObject(r2);
            }
            var v0 = getArrayU8FromWasm0(r0, r1).slice();
            wasm.__wbindgen_free(r0, r1 * 1);
            return v0;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {Uint8Array} buffer
    * @returns {ShortintClientKey}
    */
    static deserialize_client_key(buffer) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            const ptr0 = passArray8ToWasm0(buffer, wasm.__wbindgen_malloc);
            const len0 = WASM_VECTOR_LEN;
            wasm.shortint_deserialize_client_key(retptr, ptr0, len0);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return ShortintClientKey.__wrap(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {ShortintPublicKey} public_key
    * @returns {Uint8Array}
    */
    static serialize_public_key(public_key) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            _assertClass(public_key, ShortintPublicKey);
            wasm.shortint_serialize_public_key(retptr, public_key.ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            var r3 = getInt32Memory0()[retptr / 4 + 3];
            if (r3) {
                throw takeObject(r2);
            }
            var v0 = getArrayU8FromWasm0(r0, r1).slice();
            wasm.__wbindgen_free(r0, r1 * 1);
            return v0;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {Uint8Array} buffer
    * @returns {ShortintPublicKey}
    */
    static deserialize_public_key(buffer) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            const ptr0 = passArray8ToWasm0(buffer, wasm.__wbindgen_malloc);
            const len0 = WASM_VECTOR_LEN;
            wasm.shortint_deserialize_public_key(retptr, ptr0, len0);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return ShortintPublicKey.__wrap(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {ShortintCompressedPublicKey} public_key
    * @returns {Uint8Array}
    */
    static serialize_compressed_public_key(public_key) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            _assertClass(public_key, ShortintCompressedPublicKey);
            wasm.shortint_serialize_compressed_public_key(retptr, public_key.ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            var r3 = getInt32Memory0()[retptr / 4 + 3];
            if (r3) {
                throw takeObject(r2);
            }
            var v0 = getArrayU8FromWasm0(r0, r1).slice();
            wasm.__wbindgen_free(r0, r1 * 1);
            return v0;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {Uint8Array} buffer
    * @returns {ShortintCompressedPublicKey}
    */
    static deserialize_compressed_public_key(buffer) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            const ptr0 = passArray8ToWasm0(buffer, wasm.__wbindgen_malloc);
            const len0 = WASM_VECTOR_LEN;
            wasm.shortint_deserialize_compressed_public_key(retptr, ptr0, len0);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return ShortintCompressedPublicKey.__wrap(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {ShortintCompressedServerKey} server_key
    * @returns {Uint8Array}
    */
    static serialize_compressed_server_key(server_key) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            _assertClass(server_key, ShortintCompressedServerKey);
            wasm.shortint_serialize_compressed_server_key(retptr, server_key.ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            var r3 = getInt32Memory0()[retptr / 4 + 3];
            if (r3) {
                throw takeObject(r2);
            }
            var v0 = getArrayU8FromWasm0(r0, r1).slice();
            wasm.__wbindgen_free(r0, r1 * 1);
            return v0;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {Uint8Array} buffer
    * @returns {ShortintCompressedServerKey}
    */
    static deserialize_compressed_server_key(buffer) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            const ptr0 = passArray8ToWasm0(buffer, wasm.__wbindgen_malloc);
            const len0 = WASM_VECTOR_LEN;
            wasm.shortint_deserialize_compressed_server_key(retptr, ptr0, len0);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return ShortintCompressedServerKey.__wrap(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
}
/**
*/
export class ShortintCiphertext {

    static __wrap(ptr) {
        const obj = Object.create(ShortintCiphertext.prototype);
        obj.ptr = ptr;

        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.ptr;
        this.ptr = 0;

        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_shortintciphertext_free(ptr);
    }
}
/**
*/
export class ShortintClientKey {

    static __wrap(ptr) {
        const obj = Object.create(ShortintClientKey.prototype);
        obj.ptr = ptr;

        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.ptr;
        this.ptr = 0;

        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_shortintclientkey_free(ptr);
    }
}
/**
*/
export class ShortintCompressedCiphertext {

    static __wrap(ptr) {
        const obj = Object.create(ShortintCompressedCiphertext.prototype);
        obj.ptr = ptr;

        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.ptr;
        this.ptr = 0;

        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_shortintcompressedciphertext_free(ptr);
    }
}
/**
*/
export class ShortintCompressedPublicKey {

    static __wrap(ptr) {
        const obj = Object.create(ShortintCompressedPublicKey.prototype);
        obj.ptr = ptr;

        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.ptr;
        this.ptr = 0;

        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_shortintcompressedpublickey_free(ptr);
    }
}
/**
*/
export class ShortintCompressedServerKey {

    static __wrap(ptr) {
        const obj = Object.create(ShortintCompressedServerKey.prototype);
        obj.ptr = ptr;

        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.ptr;
        this.ptr = 0;

        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_shortintcompressedserverkey_free(ptr);
    }
}
/**
*/
export class ShortintParameters {

    static __wrap(ptr) {
        const obj = Object.create(ShortintParameters.prototype);
        obj.ptr = ptr;

        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.ptr;
        this.ptr = 0;

        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_shortintparameters_free(ptr);
    }
}
/**
*/
export class ShortintPublicKey {

    static __wrap(ptr) {
        const obj = Object.create(ShortintPublicKey.prototype);
        obj.ptr = ptr;

        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.ptr;
        this.ptr = 0;

        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_shortintpublickey_free(ptr);
    }
}

async function load(module, imports) {
    if (typeof Response === 'function' && module instanceof Response) {
        if (typeof WebAssembly.instantiateStreaming === 'function') {
            try {
                return await WebAssembly.instantiateStreaming(module, imports);

            } catch (e) {
                if (module.headers.get('Content-Type') != 'application/wasm') {
                    console.warn("`WebAssembly.instantiateStreaming` failed because your server does not serve wasm with `application/wasm` MIME type. Falling back to `WebAssembly.instantiate` which is slower. Original error:\n", e);

                } else {
                    throw e;
                }
            }
        }

        const bytes = await module.arrayBuffer();
        return await WebAssembly.instantiate(bytes, imports);

    } else {
        const instance = await WebAssembly.instantiate(module, imports);

        if (instance instanceof WebAssembly.Instance) {
            return { instance, module };

        } else {
            return instance;
        }
    }
}

function getImports() {
    const imports = {};
    imports.wbg = {};
    imports.wbg.__wbindgen_error_new = function(arg0, arg1) {
        const ret = new Error(getStringFromWasm0(arg0, arg1));
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_new_abda76e883ba8a5f = function() {
        const ret = new Error();
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_stack_658279fe44541cf6 = function(arg0, arg1) {
        const ret = getObject(arg1).stack;
        const ptr0 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        getInt32Memory0()[arg0 / 4 + 1] = len0;
        getInt32Memory0()[arg0 / 4 + 0] = ptr0;
    };
    imports.wbg.__wbg_error_f851667af71bcfc6 = function(arg0, arg1) {
        try {
            console.error(getStringFromWasm0(arg0, arg1));
        } finally {
            wasm.__wbindgen_free(arg0, arg1);
        }
    };
    imports.wbg.__wbindgen_object_drop_ref = function(arg0) {
        takeObject(arg0);
    };
    imports.wbg.__wbg_randomFillSync_6894564c2c334c42 = function() { return handleError(function (arg0, arg1, arg2) {
        getObject(arg0).randomFillSync(getArrayU8FromWasm0(arg1, arg2));
    }, arguments) };
    imports.wbg.__wbg_getRandomValues_805f1c3d65988a5a = function() { return handleError(function (arg0, arg1) {
        getObject(arg0).getRandomValues(getObject(arg1));
    }, arguments) };
    imports.wbg.__wbg_crypto_e1d53a1d73fb10b8 = function(arg0) {
        const ret = getObject(arg0).crypto;
        return addHeapObject(ret);
    };
    imports.wbg.__wbindgen_is_object = function(arg0) {
        const val = getObject(arg0);
        const ret = typeof(val) === 'object' && val !== null;
        return ret;
    };
    imports.wbg.__wbg_process_038c26bf42b093f8 = function(arg0) {
        const ret = getObject(arg0).process;
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_versions_ab37218d2f0b24a8 = function(arg0) {
        const ret = getObject(arg0).versions;
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_node_080f4b19d15bc1fe = function(arg0) {
        const ret = getObject(arg0).node;
        return addHeapObject(ret);
    };
    imports.wbg.__wbindgen_is_string = function(arg0) {
        const ret = typeof(getObject(arg0)) === 'string';
        return ret;
    };
    imports.wbg.__wbg_msCrypto_6e7d3e1f92610cbb = function(arg0) {
        const ret = getObject(arg0).msCrypto;
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_require_78a3dcfbdba9cbce = function() { return handleError(function () {
        const ret = module.require;
        return addHeapObject(ret);
    }, arguments) };
    imports.wbg.__wbindgen_is_function = function(arg0) {
        const ret = typeof(getObject(arg0)) === 'function';
        return ret;
    };
    imports.wbg.__wbindgen_string_new = function(arg0, arg1) {
        const ret = getStringFromWasm0(arg0, arg1);
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_newnoargs_2b8b6bd7753c76ba = function(arg0, arg1) {
        const ret = new Function(getStringFromWasm0(arg0, arg1));
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_call_95d1ea488d03e4e8 = function() { return handleError(function (arg0, arg1) {
        const ret = getObject(arg0).call(getObject(arg1));
        return addHeapObject(ret);
    }, arguments) };
    imports.wbg.__wbindgen_object_clone_ref = function(arg0) {
        const ret = getObject(arg0);
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_self_e7c1f827057f6584 = function() { return handleError(function () {
        const ret = self.self;
        return addHeapObject(ret);
    }, arguments) };
    imports.wbg.__wbg_window_a09ec664e14b1b81 = function() { return handleError(function () {
        const ret = window.window;
        return addHeapObject(ret);
    }, arguments) };
    imports.wbg.__wbg_globalThis_87cbb8506fecf3a9 = function() { return handleError(function () {
        const ret = globalThis.globalThis;
        return addHeapObject(ret);
    }, arguments) };
    imports.wbg.__wbg_global_c85a9259e621f3db = function() { return handleError(function () {
        const ret = global.global;
        return addHeapObject(ret);
    }, arguments) };
    imports.wbg.__wbindgen_is_undefined = function(arg0) {
        const ret = getObject(arg0) === undefined;
        return ret;
    };
    imports.wbg.__wbg_call_9495de66fdbe016b = function() { return handleError(function (arg0, arg1, arg2) {
        const ret = getObject(arg0).call(getObject(arg1), getObject(arg2));
        return addHeapObject(ret);
    }, arguments) };
    imports.wbg.__wbg_buffer_cf65c07de34b9a08 = function(arg0) {
        const ret = getObject(arg0).buffer;
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_new_537b7341ce90bb31 = function(arg0) {
        const ret = new Uint8Array(getObject(arg0));
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_set_17499e8aa4003ebd = function(arg0, arg1, arg2) {
        getObject(arg0).set(getObject(arg1), arg2 >>> 0);
    };
    imports.wbg.__wbg_length_27a2afe8ab42b09f = function(arg0) {
        const ret = getObject(arg0).length;
        return ret;
    };
    imports.wbg.__wbg_newwithlength_b56c882b57805732 = function(arg0) {
        const ret = new Uint8Array(arg0 >>> 0);
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_subarray_7526649b91a252a6 = function(arg0, arg1, arg2) {
        const ret = getObject(arg0).subarray(arg1 >>> 0, arg2 >>> 0);
        return addHeapObject(ret);
    };
    imports.wbg.__wbindgen_throw = function(arg0, arg1) {
        throw new Error(getStringFromWasm0(arg0, arg1));
    };
    imports.wbg.__wbindgen_memory = function() {
        const ret = wasm.memory;
        return addHeapObject(ret);
    };

    return imports;
}

function initMemory(imports, maybe_memory) {

}

function finalizeInit(instance, module) {
    wasm = instance.exports;
    init.__wbindgen_wasm_module = module;
    cachedInt32Memory0 = null;
    cachedUint8Memory0 = null;


    return wasm;
}

function initSync(module) {
    const imports = getImports();

    initMemory(imports);

    if (!(module instanceof WebAssembly.Module)) {
        module = new WebAssembly.Module(module);
    }

    const instance = new WebAssembly.Instance(module, imports);

    return finalizeInit(instance, module);
}

async function init(input) {
    if (typeof input === 'undefined') {
        input = new URL('tfhe_bg.wasm', import.meta.url);
    }
    const imports = getImports();

    if (typeof input === 'string' || (typeof Request === 'function' && input instanceof Request) || (typeof URL === 'function' && input instanceof URL)) {
        input = fetch(input);
    }

    initMemory(imports);

    const { instance, module } = await load(await input, imports);

    return finalizeInit(instance, module);
}

export { initSync }
export default init;
