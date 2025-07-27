/**
 * A Map with string keys that uses a "toLocaleLowerCase" transformation on all keys.
 */
class CaseInsensitiveMap<T> extends Map<string, T> {
  set(key: string, value: T) {
    return super.set(key.toLocaleLowerCase(), value);
  }

  get(key: string) {
    return super.get(key.toLocaleLowerCase());
  }

  has(key: string) {
    return super.has(key.toLocaleLowerCase());
  }

  delete(key: string) {
    return super.delete(key.toLocaleLowerCase());
  }
}

export default CaseInsensitiveMap;
