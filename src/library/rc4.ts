export function rc4(data:String, key:String) {
    const sbox: Array<number> = [];
	const skey: Array<number> = [];
    const ciphertext: Array<number> = data.split(",").map(Number);
    const plaintext: Array<String> = [];
	const cipher: Array<String> = [];

    let index, tmp, pointer, indexKeyStream, indexPlaintext;
	for(index = 0; index < 256; index++) {
		skey[index] = key.charCodeAt(index%key.length)
	}

	for (index = 0; index < 256; index++) {
		sbox[index] = index;
	}

	for(index = tmp = pointer = 0; index < 256; index++) {
		pointer = (pointer + sbox[index] + skey[index]) % 256;
		tmp = sbox[index];
		sbox[index] = sbox[pointer];
		sbox[pointer] = tmp;
	}

	for(index = pointer = indexPlaintext = 0; indexPlaintext < ciphertext.length; indexPlaintext++) {
		index = (index + 1) % 256;
		pointer = (pointer + sbox[index]) % 256;
		tmp = sbox[index];
		sbox[index] = sbox[pointer];
		sbox[pointer] = tmp;
		indexKeyStream = (sbox[index] + sbox[pointer]) % 256;
		plaintext.push(String.fromCharCode(ciphertext[indexPlaintext] ^ sbox[indexKeyStream]));
	}

	for(index = 0; index < ciphertext.length; index++) {
		cipher.push(String.fromCharCode(ciphertext[index]));
	}

	const encrypt = cipher.join("");
    const decrypt = plaintext.join("");

	const value = decrypt.split(",");
	const suhu = (value[0].indexOf("suhu=") != -1) ? value[0].split("suhu=").pop() : null;
	const kelembaban = (value[1].indexOf("kelembaban=") != -1) ? value[1].split("kelembaban=").pop() : null;

    return { encrypt, decrypt, suhu, kelembaban }
    // return { encrypt, decrypt }
}