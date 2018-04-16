import React from 'react';
import { shallow } from 'enzyme';
import App from './App';
import PlayersList from './components/PlayersList/PlayersList';
import AddPlayer from './components/AddPlayer/AddPlayer';

it('renders without crashing', () => {
  shallow(<App />);
});

it('should update player score', () => {
  const players = [
    {
      name: 'Kunegunda',
      score: 5
    }
  ];
  const playerScoreExpected = 10;
  const appComponent = shallow(<App />);
  appComponent.setState({ players });
  const onScoreUpdate = appComponent.find(PlayersList).prop('onScoreUpdate');
  onScoreUpdate(0, 5);
  const playersAfterUpdate = appComponent.state('players');
  const playersScoreAfterUpdate = playersAfterUpdate[0].score;
  expect(playersScoreAfterUpdate).toEqual(playerScoreExpected);
});

it('should be add new player', () => {
  const appComponent = shallow(<App />);
  const onPlayerAdd = appComponent.find(AddPlayer).prop('onPlayerAdd');
  onPlayerAdd('Ania');
  const players = appComponent.state('players');
  expect(players.length).toEqual(1);
  expect(players[0].name).toEqual('Ania');
  expect(players[0].score).toEqual(0);
});

it('should delete player', () => {
  const appComponent = shallow(<App />);
  const players = [
    {
      name: 'Kunegunda',
      score: 0
    },
    {
      name: 'Antoś',
      score: 0
    }
];
  appComponent.setState({ players });
  const onPlayersRemove = appComponent.find(PlayersList).prop('onPlayerRemove');
  onPlayersRemove(players[0].name);
  const expectedPlayersNumber = appComponent.state('players').length;
  expect(expectedPlayersNumber).toEqual(2);
});
