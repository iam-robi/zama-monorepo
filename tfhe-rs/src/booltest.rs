use tfhe::boolean::prelude::*;

pub fn booltest() {
    println!("booltest");
    let (client_key, server_key) = gen_keys();

    let ct_1 = client_key.encrypt(true);
    let ct_2 = client_key.encrypt(false);

    let ct_3 = server_key.not(&ct_2);
    let ct_4 = server_key.and(&ct_1, &ct_2);
    let ct_5 = server_key.nand(&ct_3, &ct_4);
    let ct_6 = server_key.mux(&ct_5, &ct_3, &ct_4);

    let output = client_key.decrypt(&ct_6);
    assert_eq!(output, true);
}
