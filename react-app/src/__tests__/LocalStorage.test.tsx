import { setLocalStorage } from '__mocks__/local-storage';

describe('LocalStorage', (): void => {
  beforeEach((): void => {
    window.localStorage.clear();
  });

  it('data is added into local storage', (): void => {
    const mockId = '1';
    const mockJson = { data: 'json data' };
    setLocalStorage(mockId, mockJson);
    expect(localStorage.getItem(mockId)).toEqual(JSON.stringify(mockJson));
  });

  it('data in local storage which is overwritten', (): void => {
    const mockId = '222';
    const mockOldData = { data: 'json data' };
    const mockNewData = { data: 'new data' };

    window.localStorage.setItem(mockId, JSON.stringify(mockOldData));
    expect(localStorage.getItem(mockId)).toEqual(JSON.stringify(mockOldData));

    setLocalStorage(mockId, mockNewData);
    window.localStorage.setItem(mockId, JSON.stringify(mockNewData));
  });

  it('only one ID is in localStorage', (): void => {
    const mockId = '333';
    const mockOldData = { data: 'json data' };
    const mockNewData = { data: 'new data' };

    window.localStorage.setItem(mockId, JSON.stringify(mockOldData));
    setLocalStorage(mockId, mockNewData);

    const allItems: {
      [index: string]: string;
    } = window.localStorage.getAll();

    expect(Object.keys(allItems).length).toBe(1);
  });
});
