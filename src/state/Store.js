import _ from 'lodash';
const uuid = require('uuid/v4');

class Store {
  constructor(initialState = {}) {
    this._store = initialState;
    this._watchers = {};
  }

  get(path, defaultValue)
  {
    let value = _.get(this._store, path, defaultValue);
    return value === defaultValue ? defaultValue : _.cloneDeep(value);
  }

  set(path, newValue)
  {
    let oldValue = _.get(this._store, path);

    if(!_.isEqual(oldValue, newValue)) {
      _.set(this._store, path, _.cloneDeep(newValue));

      Object.entries(this._watchers).forEach(([key, watchers]) => {
        if (key.startsWith(path)) {
          watchers.forEach(watcher => {
            const fn = watcher[1];
            fn(newValue, oldValue);
          })
        }
      });
    }
  }

  watch(path, fn)
  {
    if(!this._watchers[path]) {
      this._watchers[path] = [];
    }
    let id = uuid();
    this._watchers[path].push([id, fn]);
    let unwatch = () => {
      this._watchers[path] = this._watchers[path].filter(watcher => watcher[0] !== id);
    };
    return unwatch;
  }
}

export default Store;
