import { createClient } from '@libsql/client';
import { execSync } from 'child_process';
import dotenv from 'dotenv';

dotenv.config();

const url = process.env.DATABASE_URL;
const authToken = process.env.TURSO_AUTH_TOKEN;

if (!url || !authToken) {
  console.error('Missing DATABASE_URL or TURSO_AUTH_TOKEN');
  process.exit(1);
}

const client = createClient({ url, authToken });

async function push() {
  console.log('Generating SQL schema with Prisma...');
  let sql;
  try {
    sql = execSync('npx prisma migrate diff --from-empty --to-schema prisma/schema.prisma --script', { encoding: 'utf8' });
    console.log(`Generated SQL sample: ${sql.substring(0, 100)}`);
    console.log(`Generated SQL length: ${sql.length}`);
  } catch (error) {
    console.error('Failed to generate SQL:', error.stdout || error.message);
    process.exit(1);
  }

  const statements = sql
    .split(';')
    .map(s => s.trim())
    .map(s => s.split('\n').filter(line => !line.trim().startsWith('--')).join('\n').trim())
    .filter(s => s.length > 0);

  console.log(`Pushing ${statements.length} statements to Turso...`);

  try {
    for (const statement of statements) {
      console.log(`Executing: ${statement.substring(0, 50).replace(/\n/g, ' ')}...`);
      await client.execute(statement);
    }
    console.log('Successfully pushed schema to Turso!');
  } catch (error) {
    console.error('Failed to push schema:', error);
    process.exit(1);
  } finally {
    client.close();
  }
}

push();
