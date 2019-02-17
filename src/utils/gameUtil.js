import data from '../data/teams.json';


export const getRandomNumberWithIn = (min, max) => Math.floor(Math.random() * (max - min) + min);

export const randomizeTeams = () => {
  const min = 0;
  const max = data.length;
  let start = getRandomNumberWithIn(min, max);
  const newData = {};
  for(let i = 0; i <= max ; i++, start++) {
    newData[i] = data[start % max];
  }
  return newData;
}

export const groupTeamsInTwo = teams => {
  var groups = [];
  while (teams.length) {
    groups.push(teams.splice(0, 2));
  }

  return groups;
}

export default {
  randomizeTeams
}