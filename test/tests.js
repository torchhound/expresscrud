const test = require('tape');
const request = require('supertest');

const app = require('../index');

test('post /create/character', assert => {
	request(app)
		.post('/create/character')
		.send({"playerName": "testPlayer", "characterName": "testCharacter", "race": "Human", "class": "Warrior"})
		.expect(201)
		.end((err, res) => {
			if (err) return assert.fail(err);
			assert.pass('Created a new character successfully, test passed!');
			assert.end();
		})
});