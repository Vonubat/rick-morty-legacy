import Card from 'components/Card';
import SearchBar from 'components/SearchBar';
import {
  ICharacter,
  ICharacterContent,
  ICharacterFilter,
  IEpisode,
  IFilter,
  ILocation,
  IPageIndicators,
} from 'types/models';
import React, { Component } from 'react';
import Api from 'api/api';
import LoadIndicator from 'components/UI/Indicators/Load';
import ErrorIndicator from 'components/UI/Indicators/Error';
import Modal from 'components/Modal';
import { EPISODES, LOCATIONS } from 'constants/constants';

type MyProps = Record<string, never>;

type MyState = ICharacterContent &
  IPageIndicators & {
    locations: ILocation[];
    episodes: IEpisode[];
    modalId: number;
  };

export default class Home extends Component<MyProps, MyState> {
  api: Api;
  constructor(props: MyProps) {
    super(props);
    this.api = new Api();

    this.state = {
      info: { count: 0, pages: 0, next: null, prev: null },
      results: [],
      error: false,
      loading: false,
      locations: [],
      episodes: [],
      modalId: 0,
    };

    this.fetchCharacters = this.fetchCharacters.bind(this);
    this.setModal = this.setModal.bind(this);
  }

  async fetchCharacters(filter?: IFilter): Promise<void> {
    try {
      this.setState({ results: [] });
      this.setState({ error: false });
      this.setState({ loading: true });

      const content: ICharacterContent = await this.api.getCharacters(1, {
        query: filter?.query || (localStorage.getItem('queryValue') as ICharacterFilter) || 'name',
        value: filter?.value || localStorage.getItem('searchValue') || '',
      });
      this.setState({ ...content });

      this.setState({ loading: false });
    } catch (error: unknown) {
      this.setState({ error: true });
      this.setState({ loading: false });
      console.error(error);
    }
  }

  async fetchDataForModal(): Promise<void> {
    try {
      this.setState({ error: false });
      this.setState({ loading: true });

      this.setState({ locations: (await this.api.getDataForModal(LOCATIONS)) as ILocation[] });
      this.setState({ episodes: (await this.api.getDataForModal(EPISODES)) as IEpisode[] });

      console.log(this.state.locations);

      this.setState({ loading: false });
    } catch (error: unknown) {
      this.setState({ error: true });
      this.setState({ loading: false });
      console.error(error);
    }
  }

  async componentDidMount(): Promise<void> {
    await this.fetchCharacters();
    await this.fetchDataForModal();
  }

  setModal(id: number): void {
    this.setState({ modalId: id });
  }

  render(): JSX.Element {
    return (
      <div className="flex flex-col">
        <SearchBar search={this.fetchCharacters.bind(this)} />
        <div className="flex flex-wrap mx-auto items-center justify-center">
          {this.state.loading && <LoadIndicator />}
          {this.state.error && <ErrorIndicator />}
          {this.state.results.map(
            (character: ICharacter): JSX.Element => (
              <Card
                character={character}
                key={character.id}
                isButtonDisabled={false}
                setModal={this.setModal}
              />
            )
          )}
        </div>

        <Modal
          modalId={this.state.modalId}
          locations={this.state.locations}
          episodes={this.state.episodes}
        />
      </div>
    );
  }
}
