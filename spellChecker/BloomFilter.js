import murmurhash2 from './murmurhash2';

export default class BloomFilter {
  // Provide the number of items that will be hashed into the bloom filter and
  // the hash function to use.  If the hash function is omitted, then it defaults
  // to Murmurhash2.
  constructor(numberOfHashedItems, hashFunction) {
    this.numberOfBitsInFilter = 32;
    this.numberOfHashedItems = numberOfHashedItems;
    this.numberOfHashes = this.calculateOptimalNumberOfHashes();
    this.hashFunction = hashFunction || murmurhash2;
    this.filter = Array(numberOfHashedItems).fill(false);
  }

  // Calculate the optimal number of hashes for the expected number of hashed items:
  calculateOptimalNumberOfHashes() {
    return (this.numberOfBitsInFilter / this.numberOfHashedItems) * Math.log(2);
  }

  // Calculate all of the hashes for an item:
  calculateHashes(item) {
    let hashes = [];
    for (let salt = 0; salt < this.numberOfHashes; salt++) {
      hashes.push(this.hashFunction(item + salt));
    }
    return hashes;
  }

  // Adds an item to the bloom filter:
  add(item) {
    const hashes = this.calculateHashes(item);
    hashes.forEach(hash => this.filter[hash] = true);
  }

  // Returns true if the item is in the bloom filter; false if it is not:
  isInFilter(item) {
    const hashes = this.calculateHashes(item, this.numberOfHashes, 0x00000000, 1);
    return hashes.every(hash => this.filter[hash]);
  }
}

// Recursively apply all of the hashes to the item:
// calculateHash(item, numberOfHashes, currentHash, previousSalt) {
//   const salt = previousSalt + 1;
//   const newHash = currentHash && this.hashFunction(item + salt);
//   if (numberOfHashes === 1) {
//     return newHash;
//   } else {
//     return this.calculateHash(item, numberOfHashes - 1, newHash);
//   }
//
//   let hashes = [];
//   for (let salt = 0; salt < this.numberOfHashes; salt++) {
//     hashes.push(this.hashFunction(item + salt));
//   }
// }
