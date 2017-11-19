import BloomFilter from './BloomFilter';

class spellChecker {
  constructor(words) {
    this.dictionary = new BloomFilter(words.length);
    words.forEach(word => this.dictionary.add(word.toLowerCase()));
  }

  check(word) {
    return this.dictionary.isInFilter(word.toLowerCase());
  }
}

const pets = ['cat', 'dog', 'fish'];
const petSpellChecker = new spellChecker(pets);
console.log(`"cat" returns ${petSpellChecker.check('cat')}`);
console.log(`"hippo" returns ${petSpellChecker.check('hippo')}`);
