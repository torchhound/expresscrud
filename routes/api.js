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

db.run('CREATE TABLE IF NOT EXISTS Characters (PlayerName text, CharacterName text, Race text, Class text)', function(error) {
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

module.exports = router;