#[macro_use] extern crate rocket;
use rocket::{Request, Response};
use rocket::fairing::{Fairing, Info, Kind};
use rocket::serde::json::Json;
use rocket::serde::{Deserialize, Serialize};


// pub struct CORS;
mod api {
    pub mod routes;
}

mod middleware {
    pub mod cors;
}

mod models {
    pub mod tfhe;
}

use api::routes::{index, submit};
use middleware::cors::CORS;


#[launch]
fn rocket() -> _ {
    rocket::build().attach(CORS).mount("/", routes![index])
}
