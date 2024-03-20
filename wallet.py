import hashlib
import base58

def hex_to_doge_wif(hex_priv_key, compressed=True):
    # Prefix for Dogecoin private keys in WIF, compressed
    prefix = '9E' if compressed else '9D'
    
    # Add the prefix and the compression flag if necessary
    step1 = prefix + hex_priv_key + ('01' if compressed else '')
    
    # Double SHA-256 hashing
    sha256_a = hashlib.sha256(bytes.fromhex(step1)).digest()
    sha256_b = hashlib.sha256(sha256_a).digest()
    
    # Take the first 4 bytes for the checksum
    checksum = sha256_b[:4]
    
    # Concatenate step1 and the checksum, and convert to Base58
    payload = bytes.fromhex(step1) + checksum
    wif = base58.b58encode(payload).decode('utf-8')
    
    return wif

# Example usage
hex_priv_key = "036b6579210200ce3aedb821b305b4a70aed94aef6cd3d6bd1c6a895ec56f0f48689789b3577"
wif_key = hex_to_doge_wif(hex_priv_key, compressed=True)
print("Dogecoin WIF Private Key:", wif_key)