export async function hashPassword(password: string) {
  if (!password) {
    throw new Error("Password cannot be empty.");
  }
  const encoder = new TextEncoder();

  // 16-byte random salt
  const salt = crypto.getRandomValues(new Uint8Array(16));

  // Import the password as a key
  const key = await crypto.subtle.importKey(
    "raw",
    encoder.encode(password),
    { name: "PBKDF2" },
    false,
    ["deriveBits"]
  );

  // Derive a 32-byte hash
  const hashBuffer = await crypto.subtle.deriveBits(
    {
      name: "PBKDF2",
      salt,
      iterations: 100_000,
      hash: "SHA-256",
    },
    key,
    256
  );

  // Convert to base64 for storage
  const hash = btoa(String.fromCharCode(...new Uint8Array(hashBuffer)));
  const saltBase64 = btoa(String.fromCharCode(...salt));

  return { hash, salt: saltBase64 };
}

export async function verifyPassword(
  password: string,
  hash: string,
  saltBase64: string
) {
  if (!password) {
    throw new Error("Password cannot be empty.");
  }
  const encoder = new TextEncoder();
  const salt = Uint8Array.from(atob(saltBase64), (c) => c.charCodeAt(0));

  const key = await crypto.subtle.importKey(
    "raw",
    encoder.encode(password),
    { name: "PBKDF2" },
    false,
    ["deriveBits"]
  );

  const hashBuffer = await crypto.subtle.deriveBits(
    {
      name: "PBKDF2",
      salt,
      iterations: 100_000,
      hash: "SHA-256",
    },
    key,
    256
  );

  const computedHash = btoa(String.fromCharCode(...new Uint8Array(hashBuffer)));

  return computedHash === hash;
}
