class Collection extends Map {
  constructor(entries, baseObject) {
    super(entries);
    this.baseObject = baseObject;
  }
  
  find(fn) {
    for (const item of this.values()) {
      if (fn(item)) return item;
    }
    return undefined;
  }
  
  filter(fn) {
    const results = [];
    for (const item of this.values()) {
      if (fn(item)) results.push(item);
    }
    return results;
  }
  
  map(fn) {
    const results = [];
    for (const item of this.values()) {
      results.push(fn(item));
    }
    return results;
  }
}

module.exports = Collection;