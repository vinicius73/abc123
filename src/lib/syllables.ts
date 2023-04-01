const REGEX_VOWELS = /[aeiouàáâãäåèéêëìíîïòóôõöøùúûüýÿ]/i;
const REGEX_VOWEL_CLUSTER = /(ae|oe|ei|au|æ|œ|ãe|ão)/i;
const VOWEL_CLUSTER = ['ae', 'oe', 'au', 'ei', 'æ', 'œ', 'ãe', 'ão'];
const REGEX_CONSONANTAL_CLUSTER =
  /(pl|pr|bl|br|tl|tr|dl|dr|cl|lh|cr|gl|gr|ph|ch|th|rh|nh|ps|fl|fr)/i;
const DOUBLE_CONSONANT = ['rr', 'ss', 'sc', 'sç', 'xc'];
const AFTER_VOWEL = ['r', 's'];

const GU_QU = ['gu', 'qu'];

const isVowel = (char: string): boolean => {
  return REGEX_VOWELS.test(char);
};

const separateSyllables = (original: string): string[] => {
  const res = original
    .trim()
    .toLowerCase()
    .split('')
    .reduce((acc: string[], char, index, array) => {
      if (index === 0) {
        return [char];
      }

      const last = acc[acc.length - 1];
      const rest = [...acc].slice(0, acc.length - 1);
      const combined = last + char;
      const maybeDouble = char + array[index + 1];

      if (last.length === 1 && REGEX_CONSONANTAL_CLUSTER.test(combined)) {
        return [...rest, combined];
      }

      if (DOUBLE_CONSONANT.some(val => val === maybeDouble)) {
        return [...rest, combined];
      }

      if (DOUBLE_CONSONANT.some(val => combined.endsWith(val))) {
        return [...rest, last, char];
      }

      if (GU_QU.some(val => last.startsWith(val))) {
        if (!isVowel(char)) {
          return AFTER_VOWEL.includes(char)
            ? [...rest, combined]
            : [...rest, last, char];
        }

        if (combined.length === 3) {
          return [...rest, combined];
        }

        if (!VOWEL_CLUSTER.some(val => combined.endsWith(val))) {
          return [...rest, last, char];
        }

        return [...rest, combined];
      }

      if (isVowel(last[last.length - 1]) && char === 'r') {
        return [...rest, combined];
      }

      if (
        isVowel(char) &&
        (!isVowel(last) || REGEX_VOWEL_CLUSTER.test(combined))
      ) {
        return [...rest, combined];
      }

      return [...rest, last, char];
    }, []);

  return res;
};

export { separateSyllables };
