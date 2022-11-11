import React from 'react';
import { useFormsContextState } from 'context/FormsContext';
import { Button } from './UI/Button';
import { RadioBtn } from './UI/Forms/RadioBtn';
import { Select } from './UI/Forms/Select';

export const Settings: () => JSX.Element = (): JSX.Element => {
  const { searchBarForm: form } = useFormsContextState();

  return (
    <div
      className="modal fade fixed top-0 left-0 hidden w-full h-full outline-none overflow-x-hidden overflow-y-auto"
      id="settings"
      tabIndex={-1}
      aria-labelledby="settings"
      aria-modal="true"
      role="dialog"
      data-bs-backdrop="static"
      data-bs-keyboard="false"
    >
      <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable relative w-auto pointer-events-none">
        <div className="modal-content border-none shadow-lg relative flex flex-col w-full pointer-events-auto bg-white bg-clip-padding rounded-md outline-none text-current overflow-x-hidden">
          <div className="modal-header flex flex-shrink-0 items-center justify-between px-4 pb-2 border-b border-gray-200 rounded-t-md">
            <h2
              className="text-3xl font-medium leading-normal text-gray-800 mt-3"
              id="settingsLabel"
            >
              Settings
            </h2>
            <Button role="submit" color="danger" disabled={false} dataBsDismiss="modal">
              Save
            </Button>
          </div>
          {/* Status filter */}
          <div className="modal-body relative py-2 px-4">
            <h3 className="text-2xl text-blue-600 font-mono text-center mt-3">Status filter</h3>
            <div className="flex justify-center items-center flex-wrap">
              <RadioBtn form={form} name="status" subject="any" />
              <RadioBtn form={form} name="status" subject="alive" />
              <RadioBtn form={form} name="status" subject="dead" />
              <RadioBtn form={form} name="status" subject="unknown" />
            </div>
            {/* Gender filter */}
            <h3 className="text-2xl text-blue-600 font-mono text-center mt-3">Gender filter</h3>
            <div className="flex justify-center items-center flex-wrap">
              <RadioBtn form={form} name="gender" subject="any" />
              <RadioBtn form={form} name="gender" subject="female" />
              <RadioBtn form={form} name="gender" subject="male" />
              <RadioBtn form={form} name="gender" subject="genderless" />
              <RadioBtn form={form} name="gender" subject="unknown" />
            </div>
            {/* Select search query */}
            <div className="flex justify-center items-center flex-wrap mt-2 mb-6">
              <h3 className="text-2xl text-blue-600 font-mono text-center mt-3 mx-3">
                Search query:
              </h3>
              <Select
                form={form}
                subject="search query"
                options={['name', 'species']}
                defaultValue="name"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
