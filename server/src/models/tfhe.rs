use serde::{Deserialize, Serialize};


#[derive(Deserialize, Serialize, Debug)]
pub struct DataForAddition {
    pub cyphertext: Vec<u8>,
    pub sks: Vec<u8>,
}

#[derive(Deserialize, Serialize)]
pub struct AdditionResponse {
    pub message: String,
}
