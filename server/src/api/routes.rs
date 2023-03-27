use rocket::serde::{json::Json};
use crate::models::tfhe::{StoreServerKey};
use rocket::http::{ContentType, Status};
use tfhe::shortint::{prelude::*, CompressedServerKey};
use bincode;
use std::io::Cursor;
use rocket::form::Form;
use rocket::fs::TempFile;
use rocket::response::{Responder, Response};
use std::fmt::{self};
use base64::{decode, DecodeError};
use rocket::serde::json::{json, Value};
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
impl From<DecodeError> for CustomError {
    fn from(err: DecodeError) -> Self {
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

#[derive(FromForm)]
pub struct Upload<'r> {
 
    uuid: String,
    file: TempFile<'r>,
}
#[post("/upload",  data = "<upload>")]
pub async fn upload(upload: Form<Upload<'_>>) -> Result<Json<Value>, String>   {
    println!("Response: {:?}", upload.uuid);
    //let response_json = to_string(&response)?;
    Ok(Json(json!({
        "message": "File uploaded successfully",
        "uuid": upload.uuid,
        "size": "file_size",
    })))
}




#[options("/serverkey")]
pub fn serverkey_options() -> Status {
    Status::NoContent
}
#[post("/serverkey", format = "json", data = "<data>")]
pub async fn serverkey(data: Json<StoreServerKey>) -> Result<Json<Value>, CustomError>   {
    
    println!("ct1 length: {:?}", data.ct1.len());
    println!("sks length: {:?}", data.sks.len());
    let mut serialized_data = Cursor::new(&data.sks);
    println!("sks first 50: {:?}", &data.sks[0..50]);
    println!("curso set {:?}", "");
    let compressed_server_key: CompressedServerKey = match bincode::deserialize_from(&mut serialized_data){
        Ok(key) => {
            println!("Deserialization successful");
            key
        }
        Err(e) => {
            println!("Deserialization failed: {}", e);
            return Err(CustomError(e));
        }
    };

    let server_key: ServerKey = ServerKey::from(compressed_server_key);
    println!("sks deserialized: {:?}", 2);

    // println!("sks deserialized: {:?}", 1);
    // let mut serialized_ct1 = Cursor::new(&data.ct1);
    // let ct_1: Ciphertext = bincode::deserialize_from(&mut serialized_ct1)?;
    // println!("ciphertext deserialized: {:?}", 1);
    // let result = server_key.unchecked_add(&ct_1, &ct_1);
    // let serialized_result = bincode::serialize(&result)?;
    // println!("operation finished: {:?}", 1);
    // println!("Response: {:?}", serialized_result);

    Ok(Json(json!({
        "message": "File uploaded successfully",
        "uuid": "request_data.uuid.to_string()",
        "size": data.uuid,
    })))
}