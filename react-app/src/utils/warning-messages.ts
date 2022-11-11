const warningMessages: { [key: string]: { [key: string]: string } } = {
  file: {
    emptyInput: 'Please, choose avatar for your character',
    wrongImgFormat: 'Please, upload only jpg, png, jpeg, gif files!',
  },
  name: {
    emptyInput: 'Name of your character should contains at least 3 chars',
  },
  status: {
    emptyInput: 'Please, select status of your character',
  },
  species: {
    emptyInput: 'Species of your character should contains at least 3 chars',
  },
  gender: {
    emptyInput: 'Please, select gender of your character',
  },
  date: {
    emptyInput: 'Please, choose a date',
    nonExistingDate: 'Please, back from the future',
  },
  checkbox: {
    emptyInput: 'Checkbox is required',
  },
};

export default warningMessages;
