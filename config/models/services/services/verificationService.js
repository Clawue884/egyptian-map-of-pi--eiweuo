const crypto = require("crypto");

const verifySignature = (data, signature, publicKey) => {
  const verifier = crypto.createVerify("RSA-SHA256");
  verifier.update(JSON.stringify(data));
  return verifier.verify(publicKey, signature, "base64");
};

module.exports = { verifySignature };
