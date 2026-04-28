let _cache = null;
let _promise = null;

export async function loadCurrencies() {
  if (_cache) return _cache;
  if (!_promise) {
    _promise = fetch("/data/currencies.json")
      .then(r => r.json())
      .then(d => { _cache = d; return d; });
  }
  return _promise;
}
