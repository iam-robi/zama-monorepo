use serde::{Deserialize, Serialize};
use serde_bytes;

#[derive(Deserialize, Serialize, Debug)]
pub struct DataForAddition {
    pub cyphertext: String,
    pub sks: String,
}


#[derive(Deserialize, Serialize, Debug)]
#[serde(crate = "rocket::serde")]
pub struct AdditionResponse {
    #[serde(with = "serde_bytes")]
    pub cyphertext: Vec<u8>
}

#[derive(Deserialize, Serialize, Debug)]
pub struct StoreServerKey {
    pub sks: Vec<u8>,
    pub ct1: Vec<u8>,
    pub ct2: Vec<u8>,
    pub uuid: String,
}