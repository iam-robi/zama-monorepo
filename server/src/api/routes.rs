use rocket::serde::{Deserialize, Serialize};
use rocket::serde::json::Json;
use crate::models::tfhe::{AdditionResponse, DataForAddition};


#[get("/")]
pub fn index() -> &'static str {
    "Front end can query!"
}

#[post("/submit", format = "json", data = "<data>")]
pub async fn submit(data: Json<DataForAddition>) -> Result<Json<AdditionResponse>, String> {
    if data.ciphertext.len() > 38864 {
        return Err("Ciphertext is too large.".to_string());
    }

    if data.public_key.len() > 24395904 {
        return Err("Public key is too large.".to_string());
    }

    let response = AdditionResponse {
        message: "Data received successfully.".to_string(),
    };

    Ok(Json(response))
}
