# expresscrud

dungeons and databases: simple CRUD edition. Built with Express.js and sqlite3. Allows you to post a JSON Character with /create/character, get a JSON Character with /read/:playerName, update a Character with a JSON patch to /update/:characterName, and finally delete a Character with /delete/:characterName.

## Installing

`npm install`

## Running

`node index.js` or specify a port with `PORT=5002 node index.js`

## Testing

Running this command will remove the default database file(`rm -rf crud.db`) before running endpoint tests.

`npm test`
