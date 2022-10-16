// Mock local storage

const localStorageMock = (function () {
  let store: { [index: string]: string } = {};

  return {
    getItem(key: string): string {
      return store[key];
    },

    setItem(key: string, value: string): void {
      store[key] = value;
    },

    clear() {
      store = {};
    },

    removeItem(key: string): void {
      delete store[key];
    },

    getAll(): {
      [index: string]: string;
    } {
      return store;
    },
  };
})();

Object.defineProperty(window, 'localStorage', { value: localStorageMock });

const setLocalStorage = (id: string, data: unknown): void => {
  window.localStorage.setItem(id, JSON.stringify(data));
};

export default setLocalStorage;
