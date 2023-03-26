use serde::{Deserialize, Serialize};
use serde_bytes;

// #[derive(Deserialize, Serialize, Debug)]
// pub struct DataForAddition {
//     #[serde(with = "serde_bytes")]
//     pub cyphertext: Vec<u8>,
//     #[serde(with = "serde_bytes")]
//     pub sks: Vec<u8>,
// }
#[derive(Deserialize, Serialize, Debug)]
pub struct DataForAddition {
    pub cyphertext: String,
    pub sks: String,
}


// #[derive(Deserialize, Serialize, Debug)]
// pub struct TfheOperation {
//     pub ciphertext: Vec<u8>,
//     pub sks: Vec<u8>,
// }
// #[derive(Debug)]
// enum Error {
//     TooLarge,
//     NoColon,
//     InvalidAge,
//     Io(std::io::Error),
// }

// #[rocket::async_trait]
// impl<'r> FromData<'r> for TfheOperation {

//     type Error = serde_json::Error;
//     async fn from_data(req: &'r Request<'_>, data: Data<'r>) -> data::Outcome<'r, Self> {
//         use rocket::outcome::Outcome::*;
//         use Error::*;

//         // Use a configured limit with name 'person' or fallback to default.
//         let limit = req.limits().get("operations").unwrap_or(50.megabytes());
//         // Read the data into a string.
//         if let Err(e) = data.open(limit).read_to_end(&mut buffer).await {
//             return Outcome::Failure((rocket::http::Status::InternalServerError, e));
//         }
//                 // Ensure the content type is correct before opening the data.
//                 // let person_ct = ContentType::new("application", "x-person");
//                 // if req.content_type() != Some(&person_ct) {
//                 //     return Forward(data);
//                 // }


    

//         Success(TfheOperation);

//     }
// }



#[derive(Deserialize, Serialize, Debug)]
#[serde(crate = "rocket::serde")]
pub struct AdditionResponse {
    #[serde(with = "serde_bytes")]
    pub cyphertext: Vec<u8>
}

