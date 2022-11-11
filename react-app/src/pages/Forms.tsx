import { Select } from '../components/UI/Forms/Select';
import { TextInput } from '../components/UI/Forms/TextInput';
import React, { useCallback, useEffect, useState } from 'react';
import formsImg from './../assets/forms-img.webp';
import { Button } from 'components/UI/Button';
import { DateInput } from 'components/UI/Forms/DateInput';
import { Checkbox } from 'components/UI/Forms/Checkbox';
import { FileInput } from 'components/UI/Forms/FileInput';
import { IUserCharacter } from 'types/models';
import { Card } from 'components/Card';
import { Alert } from 'components/UI/Alert';
import { FieldValues, SubmitHandler, useForm, UseFormReturn } from 'react-hook-form';

export const Forms: () => JSX.Element = (): JSX.Element => {
  const [userCards, setUserCards] = useState<IUserCharacter[]>([]);
  const [alertVisibility, setAlertVisibility] = useState<boolean>(false);

  const form: UseFormReturn<FieldValues, unknown> =
    useForm(/* {
    mode: 'onChange',
  } */);
  const {
    handleSubmit,
    reset,
    formState: { isSubmitSuccessful, isDirty, errors },
  } = form;

  const onFormSubmit: SubmitHandler<FieldValues> = (data: FieldValues): void => {
    setAlertVisibility(true);
    setTimeout(() => setAlertVisibility(false), 2000);
    setUserCards((prevState: IUserCharacter[]): IUserCharacter[] => {
      return [
        ...prevState,
        {
          name: data.name,
          status: data.status,
          species: data.species,
          gender: data.gender,
          image: URL.createObjectURL(data.file[0]),
          created: data.date,
        },
      ];
    });
  };

  const resetForm: () => void = useCallback((): void => {
    reset({ file: '', name: '', status: '', species: '', gender: '', date: '', checkbox: '' });
  }, [reset]);

  useEffect((): void => {
    if (isSubmitSuccessful) {
      resetForm();
    }
  }, [isSubmitSuccessful, resetForm]);

  return (
    <div className="container py-6 px-6 mx-auto">
      {/* <!-- Section: Design Block --> */}
      <section className="text-gray-800">
        {/* <!-- Jumbotron --> */}
        <div className="container mx-auto xl:px-32 text-left">
          <div className="grid sm:grid-cols-2 items-center">
            <div className="-mb-12 sm:mb-0">
              <div className="jumbotron-forms block rounded-sm shadow-sm px-6 py-12 sm:py-6 xl:py-12 sm:px-12 sm:-mr-14">
                <h3 className="text-2xl font-bold text-blue-600 mb-3 ">Character generator</h3>
                <form
                  className="flex flex-col justify-center sm:justify-start xl:justify-start xl:w-96"
                  onSubmit={handleSubmit(onFormSubmit)}
                >
                  <FileInput form={form} subject="File">
                    Choose avatar for your character
                  </FileInput>

                  <TextInput form={form} subject="Name" />

                  <Select
                    form={form}
                    subject="Status"
                    options={['Alive', 'Dead', 'unknown']}
                    defaultValue=""
                  />

                  <TextInput form={form} subject="Species" />

                  <Select
                    form={form}
                    subject="Gender"
                    options={['Male', 'Female', 'unknown']}
                    defaultValue=""
                  />

                  <DateInput form={form} subject="Date" />

                  <Checkbox form={form} subject="Checkbox">
                    I consent to my personal data by Galactic Federation
                  </Checkbox>

                  <div className="flex gap-4">
                    <Button
                      role="submit"
                      color="primary"
                      disabled={!isDirty || Boolean(Object.keys(errors).length)}
                    >
                      Submit
                    </Button>

                    <Button role="reset" color="danger" disabled={false} onClick={resetForm}>
                      Reset
                    </Button>
                  </div>
                </form>
              </div>
            </div>

            <div>
              <img src={formsImg} className="w-full rounded-sm shadow-sm" alt="forms-img" />
            </div>
          </div>
          <div
            className="user-cards-container flex flex-wrap mx-auto items-center justify-center
             mt-6 bg-gray-100 rounded-sm shadow-smg"
          >
            {userCards.length > 0 &&
              userCards.map(
                (character: IUserCharacter, index: number): JSX.Element => (
                  <Card character={character} key={index} isButtonDisabled={true} />
                )
              )}
          </div>
        </div>
        {/* <!-- Jumbotron --> */}
      </section>
      {/* <!-- Section: Design Block --> */}
      <Alert visibility={alertVisibility} color={'success'}>
        User card is created
      </Alert>
    </div>
  );
};