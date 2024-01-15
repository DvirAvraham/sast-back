const fs = require('fs');
const { v4: uuidv4 } = require('uuid');

const DATABASE_FILE = './data/recommendation.json';

module.exports = {
  readDatabase,
  writeDatabase,
  add,
  fetch,
  getById,
  updateById,
  removeById,
  }

function readDatabase() {
  try {
    const data = fs.readFileSync(DATABASE_FILE, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    return [];
  }
}

function writeDatabase(data) {
  fs.writeFileSync(DATABASE_FILE, JSON.stringify(data, null, 2), 'utf8');
}

function add(newObject) {
  const database = readDatabase();

  newObject.id = uuidv4();

  database.push(newObject);

  writeDatabase(database);

  return newObject;
}

function fetch() {
  return readDatabase();
}

function getById(id) {
  const database = readDatabase();
  return database.find(obj => obj.id === id);
}

function updateById(updatedObject) {
  const database = readDatabase();
  const index = database.findIndex(obj => obj.id === updatedObject.id);

  if (index !== -1) {
    database[index] = { ...database[index], ...updatedObject };

    writeDatabase(database);

    return database[index];
  } else {
    return null;
  }
}

function removeById(id) {
  const database = readDatabase();
  const updatedDatabase = database.filter(obj => obj.id !== id);

  if (updatedDatabase.length < database.length) {
    writeDatabase(updatedDatabase);

    return true;
  } else {
    return false;
  }
}