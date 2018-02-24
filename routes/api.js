const express = require('express');
const sqlite3 = require('sqlite3');

const config = require('../config');
const dbFile = config.dbFile === "" ? 'crud.db' : config.dbFile;

var router = express.Router();
var db = new sqlite3.Database(dbFile, (error) => {
	if (error) {
		console.error(error.message);
	}
	console.log("Connected to " + dbFile);
});

db.run('CREATE TABLE IF NOT EXISTS Characters (PlayerName text UNIQUE, CharacterName text UNIQUE, Race text, Class text)', function(error) {
	if (error) {
		console.error(error.message);
	}
	console.log('Created table Characters');
});

router.post('/create/character', function(req, res, next) {
	if (Object.keys(req.body).length === 0 && obj.constructor === Object) {
		res.status(400).send('Empty JSON');
	} else {
		db.run('INSERT INTO Characters VALUES (?, ?, ?, ?)', req.body.playerName, req.body.characterName, req.body.race, req.body.class, function(error) {
			if (error) {
				console.error(error.message);
				res.status(400).send(`SQLite Error: ${error.message}`);
			} else {
				res.status(201).send(`Character created at rowid ${this.lastID}`);	
			}
		});
	}
});

router.get('/read/:playerName', function(req, res, next) {
	db.all('SELECT PlayerName, CharacterName, Race, Class FROM Characters WHERE PlayerName = ? GROUP BY CharacterName', req.params.playerName, function(error, rows) {
		if (error) {
			console.error(error.message);
			res.status(400).send(`SQLite Error: ${error.message}`);
		} else {
			let responseArray = [];
			rows.forEach((row) => {
				responseArray.push(JSON.stringify({'playerName': row.PlayerName, 'characterName': row.CharacterName, 'race': row.Race, 'class': row.Class}))
			});
			res.status(200).json(JSON.stringify({'playerName': responseArray}));
		}
	});	
});

router.post('/update/:characterName', function(req, res, next) {
	if (Object.keys(req.body).length === 0 && obj.constructor === Object) {
		res.status(400).send('Empty JSON');
	} else {
		db.run('UPDATE Characters SET PlayerName = ?, CharacterName = ?, Race = ?, Class = ? WHERE CharacterName = ?', req.body.playerName, req.body.characterName, req.body.race, req.body.class, req.params.characterName, function(error) {
			if (error) {
				console.error(error.message);
				res.status(400).send(`SQLite Error: ${error.message}`);
			} else {
				res.status(200).send(`Character updated!`);	
			}
		});
	}
})

module.exports = router;