use serde::{Deserialize, Serialize};


#[derive(Deserialize, Serialize)]
pub struct DataForAddition {
    pub ciphertext: Vec<u8>,
    pub public_key: Vec<u8>,
}

#[derive(Deserialize, Serialize)]
pub struct AdditionResponse {
    pub message: String,
}
