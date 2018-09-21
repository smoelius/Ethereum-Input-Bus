/*====================================================================================================*
 * eib.ts - Ethereum Input Bus constants
 *====================================================================================================*/

import * as math from "../../common/math"

/*====================================================================================================*/

export const IPFS_WITH_KECCAK256_MERKLE_ROOT = 0

export const N_WORDS_IPFSKEC256 = 3

export const IPFSKEC256_IPFS_HASH   = 0 // IPFS SHA-256 hash
export const IPFSKEC256_FILE_LENGTH = 1 // file length
export const IPFSKEC256_MERKLE_ROOT = 2 // Keccak-256 Merkle root

export const FLAGS_NONE = 0

export const I_FLAG_SUPPLY_SIMULATE = 0
export const FLAG_SUPPLY_SIMULATE = math.set_bit(0, I_FLAG_SUPPLY_SIMULATE)

export const LTIOV_NONE = 0

export const PAYEE_DEFAULT = 0

/*====================================================================================================*/

export const PROXY_CALLBACK_ZERO = 0
export const PROXY_CALLBACK_ONE  = 1
export const PROXY_CALLBACK_TWO  = 2

/*====================================================================================================*/