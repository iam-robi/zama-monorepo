use structopt::StructOpt;
use booltest::booltest;
use shortinttest::shortinttest;
use keygen::keygen;

mod booltest;
mod shortinttest;
mod keygen;

#[derive(StructOpt, Debug)]
#[structopt(name = "tests")]
enum Command {
    BoolTest,
    IntTest,
    Keygen
}

fn main() {
    let command = Command::from_args();

    match command {
        Command::BoolTest => booltest(),
        Command::IntTest => shortinttest(),
        Command::Keygen => keygen()
        }
}

// fn booltest() {
//     let (client_key, server_key) = gen_keys();

//     let ct_1 = client_key.encrypt(true);
//     let ct_2 = client_key.encrypt(false);

//     let ct_3 = server_key.not(&ct_2);
//     let ct_4 = server_key.and(&ct_1, &ct_2);
//     let ct_5 = server_key.nand(&ct_3, &ct_4);
//     let ct_6 = server_key.mux(&ct_5, &ct_3, &ct_4);

//     let output = client_key.decrypt(&ct_6);
//     assert_eq!(output, true);
// }

// fn inttest() {
//     let (client_key, server_key) = gen_keys(Parameters::default());

//     let msg1 = 1;
//     let msg2 = 0;

//     let modulus = client_key.parameters.message_modulus.0;

//     let ct_1 = client_key.encrypt(msg1);
//     let ct_2 = client_key.encrypt(msg2);

//     let ct_3 = server_key.unchecked_add(&ct_1, &ct_2);

//     let output = client_key.decrypt(&ct_3);
//     assert_eq!(output, (msg1 + msg2) % modulus as u64);
// }
