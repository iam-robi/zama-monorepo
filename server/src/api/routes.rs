use rocket::serde::{json::Json};
use crate::models::tfhe::{AdditionResponse, DataForAddition};
use rocket::http::{ContentType, Status};
use tfhe::shortint::prelude::*;
use bincode;
use std::io::Cursor;

use rocket::response::{Responder, Response};
use std::fmt::{self};

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
    println!("Response: {:?}", "hey");
    "Front end can query!"
}
#[options("/submit")]
pub fn submit_options() -> Status {
    Status::NoContent
}
#[post("/submit", format = "json", data = "<data>")]
pub async fn submit(data: Json<DataForAddition>) -> Result<Json<AdditionResponse>, CustomError>   {
    println!("Response: {:?}", "1");
    let mut serialized_data = Cursor::new(&data.sks);
    println!("Response: {:?}", "2");
    let server_key: ServerKey = bincode::deserialize_from(&mut serialized_data)?;
    println!("Response: {:?}", "3");
    println!("Received data: {:?}", &data.cyphertext);
    let ct_1: Ciphertext = bincode::deserialize(&data.cyphertext)?;
    println!("Response: {:?}", "4");
    let result = server_key.unchecked_add(&ct_1, &ct_1);
    println!("Response: {:?}", "5");
    let serialized_result = bincode::serialize(&result)?;
    println!("Response: {:?}", "6");
    let response = AdditionResponse {
        cyphertext: serialized_result,
    };
    println!("Response: {:?}", "7");
    //let response_json = to_string(&response)?;
    println!("Response: {:?}", response.cyphertext);
    Ok(Json(response))
}
