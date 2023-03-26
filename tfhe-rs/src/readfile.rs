use std::fs::File;
use std::io::Read;
use std::path::Path;
use base64;

fn main() {
    let path = Path::new("serverkey.txt");
    let mut file = match File::open(&path) {
        Err(why) => panic!("Could not open {}: {}", path.display(), why),
        Ok(file) => file,
    };

    let mut base64_str = String::new();
    match file.read_to_string(&mut base64_str) {
        Err(why) => panic!("Could not read {}: {}", path.display(), why),
        Ok(_) => println!("Successfully read serverkey.txt"),
    }

    let decoded = base64::decode(&base64_str).expect("Failed to decode base64 string");

    println!("Decoded uint8 array: {:?}", decoded);
}
