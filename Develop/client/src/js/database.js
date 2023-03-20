import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// TODO: Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => {
  console.log('PUT to the database');
  //connection to db & version
  const jateDb = await openDB('jate', 1);
  //new transaction & db/data priveleges
  const tx = jateDb.transaction('jate', 'readwrite');
  //open desired object store
  const store = tx.objectStore('jate');
  //.put method to add content from db by id
  const request = store.put({ id: id, todo: content });
  //request confirmation
  const result = await request;
  //log results
  console.log('🚀 - data saved to the database', result);
}

// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => {
  console.log('GET from the database');
  //connection to db & version
  const contactDb = await openDB('jate', 1);
  //new transaction & db/data priveleges
  const tx = contactDb.transaction('jate', 'readonly');
  //open desired object store
  const store = tx.objectStore('jate');
  //.get method to get data from db by id 
  const request = store.get(id);
  //request confirmation
  const result = await request;
  //log results 
  console.log('result.value', result);
  return result;
};

initdb();
