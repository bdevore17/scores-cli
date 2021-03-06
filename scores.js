#!/usr/bin/env node

const program = require('commander');
const btoa = require('btoa');
var League = require('./nba');

function paddingOfSize(size) {
  let padding= '';
  for (var i = 0; i < size; i++) {
    padding += ' ';
  }
  return padding;
}

function printScores(games) {
  console.log();
  for (var i = 0; i < games.length; i++) {
    console.log(games[i].awayTeam + ' @ ' + games[i].homeTeam);
    if(games[i].isUnplayed) {
      console.log(paddingOfSize(games[i].awayTeam.length - 1) + games[i].time);
    }
    else {
      console.log(paddingOfSize(games[i].awayTeam.length - 3) + games[i].awayScore + ' - ' + games[i].homeScore);
    }
    if(games[i].inProgress) {
      console.log(paddingOfSize(games[i].awayTeam.length - 6) + 'In Progress');
    }
    else if(!games[i].isUnplayed){
      console.log(paddingOfSize(games[i].awayTeam.length - 1) + 'Final');
    }
    console.log();
  }
}

program
  .version('1.0.0')
  .description('Get sports scores from your favorite teams and leagues')
  .option('-l, --league <league abbrevation>','Scores for a specific league')
  .option('-t, --team <team name>','Score for a specific team')
  .option('-d, --date <date as YYYY-MM-DD>','Scores for a specific date')
  .parse(process.argv);

if (program.league) {
  League = require('./' + program.league.toLowerCase());
}

var league = new League();
league.getScores(program.team, program.date, printScores);