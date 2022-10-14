import Card from 'components/Card';
import SearchBar from 'components/SearchBar';
import {
  ICharacter,
  ICharacterContent,
  ICharacterFilter,
  IDataForModal,
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

type MyState = ICharacterContent & IPageIndicators & IDataForModal;

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
      nameModal: '',
      locationModal: { name: '', type: '', dimension: '' },
      episodesModal: [{ name: '', air_date: '', episode: '' }],
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
    this.setState({
      locationModal: { name: '', type: '', dimension: '' },
      episodesModal: [{ name: '', air_date: '', episode: '' }],
    });

    const character: ICharacter | undefined = this.state.results.find(
      (character: ICharacter): boolean => character.id == id
    );
    if (!character) {
      return;
    }

    const { name, location, episode } = character;

    this.setState({ nameModal: name });

    const currentLocation: ILocation | undefined = this.state.locations.find(
      (item: ILocation): boolean => location.url == item.url
    );
    if (currentLocation) {
      this.setState({
        locationModal: {
          name: currentLocation.name,
          type: currentLocation.type,
          dimension: currentLocation.dimension,
        },
      });
    }

    const currentEpisodes: IEpisode[] | undefined = this.state.episodes.filter(
      (item: IEpisode): boolean => episode.includes(item.url)
    );
    if (currentEpisodes.length && currentEpisodes !== null) {
      currentEpisodes.forEach((item: IEpisode): void =>
        this.setState((prevState: Readonly<MyState>) => ({
          episodesModal: [
            ...prevState.episodesModal,
            { name: item.name, air_date: item.air_date, episode: item.episode },
          ],
        }))
      );
    }
    // console.log(this.state.episodesModal);
    // console.log(this.state.locationModal);
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
          locationModal={this.state.locationModal}
          episodesModal={this.state.episodesModal}
          nameModal={this.state.nameModal}
        />
      </div>
    );
  }
}
