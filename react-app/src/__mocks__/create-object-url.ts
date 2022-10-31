// Mock URL.createObjectURL

window.URL.createObjectURL = function (obj: Blob | MediaSource): string {
  return `${obj}`;
};

export default window.URL.createObjectURL;
