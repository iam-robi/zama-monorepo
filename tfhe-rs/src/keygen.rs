use tfhe::shortint::prelude::*;
use std::fs::{File, create_dir_all};
use std::io::{Write};
use std::hash::{Hash,Hasher};
// use tfhe::boolean::prelude::*;
use std::collections::hash_map::DefaultHasher;
use uuid::Uuid;

pub fn keygen() {
    println!("keygen");
    let id = Uuid::new_v4();
    let path = format!("./keys/{}", id);
    create_dir_all(&path).expect("failed to create directory");

    // We generate a set of client/server keys, using the default parameters:
    let (client_key, server_key) : (ClientKey, ServerKey) = gen_keys(Parameters::default());
    let encoded_server_key: Vec<u8> = bincode::serialize(&server_key).unwrap();
    let encoded_client_key: Vec<u8> = bincode::serialize(&client_key).unwrap();
    let server_key_file = format!("{}/server_key.bin", &path);
    let client_key_file = format!("{}/client_key.bin", &path);
    // We write the keys to files:
    let mut file = File::create(server_key_file)
        .expect("failed to create server key file");
    file.write_all(encoded_server_key.as_slice()).expect("failed to write key to file");
    let mut file = File::create(client_key_file)
        .expect("failed to create client key file");
    file.write_all(encoded_client_key.as_slice()).expect("failed to write key to file");

}

fn hash_to_string<T: Hash>(t: &T) -> String {
    let mut hasher = DefaultHasher::new();
    t.hash(&mut hasher);
    hasher.finish().to_string()
}