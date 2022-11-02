// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';

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

export const setLocalStorage = (id: string, data: unknown) => {
  window.localStorage.setItem(id, JSON.stringify(data));
};
