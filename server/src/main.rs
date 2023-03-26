#[macro_use] extern crate rocket;

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

use api::routes::{index, upload, serverkey , serverkey_options};
use middleware::cors::CORS;


#[launch]
fn rocket() -> _ {
    rocket::build().attach(CORS).mount("/", routes![index, upload , serverkey,serverkey_options])
}
