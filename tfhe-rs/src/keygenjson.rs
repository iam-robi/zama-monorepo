
use std::io::{Write, Read};
use tfhe::boolean::prelude::*;
use serde::{Serialize, Deserialize};
use uuid::Uuid;
use std::fs::{File, create_dir_all};

#[derive(Serialize, Deserialize)]
struct ServerKeyJson {
    data: Vec<u8>,
}

#[derive(Serialize, Deserialize)]
struct ClientKeyJson {
    data: Vec<u8>,
}

pub fn keygenjson() {
    // We generate a set of client/server keys, using the default parameters:
    let (client_key, server_key) = gen_keys();
    println!("keygen");
    let id = Uuid::new_v4();
    let path = format!("./keys/{}", id);
    create_dir_all(&path).expect("failed to create directory");
    // We serialize the keys to JSON:
    let encoded_server_key = serde_json::to_string(&ServerKeyJson { data: bincode::serialize(&server_key).unwrap() }).unwrap();
    let encoded_client_key = serde_json::to_string(&ClientKeyJson { data: bincode::serialize(&client_key).unwrap() }).unwrap();

    let server_key_file = format!("{}/server_key.json", &path);
    let client_key_file = format!("{}/client_key.json", &path);
    // We write the keys to files:
    let mut file = File::create(server_key_file.clone())
        .expect("failed to create server key file");
    file.write_all(encoded_server_key.as_bytes()).expect("failed to write key to file");
    let mut file = File::create(client_key_file.clone())
        .expect("failed to create client key file");
    file.write_all(encoded_client_key.as_bytes()).expect("failed to write key to file");

    // We retrieve the keys:
    let mut file = File::open(&server_key_file.clone())
        .expect("failed to open server key file");
    let mut encoded_server_key = String::new();
    file.read_to_string(&mut encoded_server_key).expect("failed to read the key");

    let mut file = File::open(client_key_file)
        .expect("failed to open client key file");
    let mut encoded_client_key = String::new();
    file.read_to_string(&mut encoded_client_key).expect("failed to read the key");

    // We deserialize the keys:
    let server_key_data: ServerKeyJson = serde_json::from_str(&encoded_server_key).expect("failed to deserialize");
    let client_key_data: ClientKeyJson = serde_json::from_str(&encoded_client_key).expect("failed to deserialize");
    let loaded_server_key: ServerKey = bincode::deserialize(&server_key_data.data[..]).expect("failed to deserialize");
    let loaded_client_key: ClientKey = bincode::deserialize(&client_key_data.data[..]).expect("failed to deserialize");

    let ct_1 = client_key.encrypt(false);

    // We check for equality:
    assert_eq!(false, loaded_client_key.decrypt(&ct_1));
}
