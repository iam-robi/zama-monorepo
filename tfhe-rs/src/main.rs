use structopt::StructOpt;
use booltest::booltest;
use shortinttest::shortinttest;
use keygen::keygen;
use keygenjson::keygenjson;
use bincode;

mod booltest;
mod shortinttest;
mod keygen;
mod keygenjson;

#[derive(StructOpt, Debug)]
#[structopt(name = "tests")]
enum Command {
    BoolTest,
    IntTest,
    Keygen,
    KeygenJson,
}

fn main() {
    let command = Command::from_args();

    match command {
        Command::BoolTest => booltest(),
        Command::IntTest => shortinttest(),
        //TODO: factorize keygen && keygenjson
        Command::Keygen => keygen(),
        Command::KeygenJson => keygenjson(),
        }
}
