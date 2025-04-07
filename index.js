import { supabase } from './supabaseClient.js';

async function testDatabaseConnection() {
  const { data, error } = await supabase
    .from('Participants')  // your table name
    .select('*');          // select all rows

  if (error) {
    console.error('Failed to connect to Participants table:', error.message);
  } else {
    console.log('Successfully connected to Participants table. Data:', data);
  }
}

testDatabaseConnection();
