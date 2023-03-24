use rocket::serde::{Deserialize, Serialize};
use rocket::serde::json::Json;
use crate::models::tfhe::{AdditionResponse, DataForAddition};
use rocket::http::{ContentType, Status};
use tfhe::shortint::prelude::*;
use bincode;
use std::io::Cursor;
use std::any::Any;
use rocket::response::{self, Responder, Response};
use std::fmt::{self, Display};


#[derive(Debug)]
pub struct CustomError(Box<dyn std::error::Error + Send + Sync>);
impl CustomError {
    pub fn new<E>(error: E) -> CustomError
    where
        E: Into<Box<dyn std::error::Error + Send + Sync>>,
    {
        CustomError(error.into())
    }
}
impl fmt::Display for CustomError {
    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
        write!(f, "{}", self.0)
    }
}
impl From<Box<bincode::ErrorKind>> for CustomError {

    fn from(err: Box<bincode::ErrorKind>) -> Self {
        CustomError(Box::new(err))
    }
}
impl std::error::Error for CustomError {}

impl<'r> Responder<'r, 'static> for CustomError {
    fn respond_to(self, _: &'r rocket::Request<'_>) -> rocket::response::Result<'static> {
        let message = format!("Error: {}", self.0);
        let mut response = Response::new();
        response.set_status(Status::InternalServerError);
        response.set_header(ContentType::Plain);
        response.set_sized_body(message.len(), Cursor::new(message));
        Ok(response)
    }
}

#[get("/")]
pub fn index() -> &'static str {
    "Front end can query!"
}
#[options("/submit")]
pub fn submit_options() -> Status {
    Status::NoContent
}
#[post("/submit", format = "json", data = "<data>")]
pub async fn submit(data: Json<DataForAddition>) -> Result<Json<AdditionResponse>, CustomError>   {

    println!("Received data: {:?}", data);
    let mut serialized_data = Cursor::new(&data.sks);
    let server_key: ServerKey = bincode::deserialize_from(&mut serialized_data)?;
    // if data.ciphertext.len() > 38864 {
    //     return Err("Ciphertext is too large.".to_string());
    // }

    // if data.public_key.len() > 24395904 {
    //     return Err("Public key is too large.".to_string());
    // }

    let response = AdditionResponse {
        message: "Data received successfully.".to_string(),
    };

    Ok(Json(response))
}
