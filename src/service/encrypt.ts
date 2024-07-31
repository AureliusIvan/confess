// encrypt.ts
"use server"

import crypto from 'crypto';

async function encrypt(text: string): Promise<string> {
  try {
    const algorithm = 'aes-256-cbc';

    // Ensure ENCRYPTION_KEY is defined in your environment
    const encryptionKey = process.env.ENCRYPTION_KEY;
    if (!encryptionKey) {
      throw new Error('ENCRYPTION_KEY is not defined in the environment.');
    }

    // Key should be exactly 32 bytes for AES-256
    const key = crypto.createHash('sha256')
        .update(String(encryptionKey))
        .digest(); // Hash the key for added security

    // IV should be exactly 16 bytes
    const iv = crypto.randomBytes(16);

    const cipher = crypto.createCipheriv(algorithm, key, iv);

    let encrypted = cipher.update(text);
    encrypted = Buffer.concat([encrypted,
      cipher.final()]);

    return `${iv.toString('base64')}:${encrypted.toString('hex')}`;

  } catch (error) {
    console.error('Encryption error:', error);
    throw new Error('Error encrypting data');
  }
}

async function decrypt(encryptedText: string): Promise<string> {
  try {
    const algorithm = 'aes-256-cbc';

    // Ensure ENCRYPTION_KEY is defined in your environment
    const encryptionKey = process.env.ENCRYPTION_KEY;
    if (!encryptionKey) {
      throw new Error('ENCRYPTION_KEY is not defined in the environment.');
    }

    const [ivBase64, encryptedDataHex] = encryptedText.split(':');

    // Convert the base64 IV back to binary
    const iv = Buffer.from(ivBase64, 'base64');

    // Hash the key the same way it was done during encryption
    const key = crypto.createHash('sha256')
        .update(String(encryptionKey))
        .digest();

    // Convert the hexadecimal encrypted data back to binary
    const encryptedData = Buffer.from(encryptedDataHex, 'hex');

    const decipher = crypto.createDecipheriv(algorithm, key, iv);
    let decrypted = decipher.update(encryptedData);
    decrypted = Buffer.concat([decrypted, decipher.final()]);
    return decrypted.toString();

  } catch (error) {
    console.error('Decryption error:', error);

    throw new Error('Error decrypting data');
  }
}

export {
  encrypt,
  decrypt
}