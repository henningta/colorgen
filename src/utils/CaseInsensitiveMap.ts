class CaseInsensitiveMap<K, V> extends Map<K, V> {
  set(key: K, value: V) {
    if (typeof key === 'string') {
      key = key.toLocaleLowerCase() as any as K;
    }
    return super.set(key, value);
  }

  get(key: K) {
    if (typeof key === 'string') {
      key = key.toLocaleLowerCase() as any as K;
    }

    return super.get(key);
  }

  has(key: K) {
    if (typeof key === 'string') {
      key = key.toLocaleLowerCase() as any as K;
    }

    return super.has(key);
  }

  delete(key: K) {
    if (typeof key === 'string') {
      key = key.toLocaleLowerCase() as any as K;
    }

    return super.delete(key);
  }
}

export default CaseInsensitiveMap;
