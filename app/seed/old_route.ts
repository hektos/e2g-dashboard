// LANCIATO!!!
// DOPO AVERLO LANCIATO E POPOLATO IL DATABASE SI PUO RIMUOVERE

import bcrypt from 'bcrypt';
import { pool } from '@/app/lib/db_pool';

import { invoices, customers, revenue, users } from '../lib/placeholder-data';

async function seedUsers() {

  await pool.query(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`);
  
  const insertedUsers = await Promise.all(
    users.map(async (user) => {
      const hashedPassword = await bcrypt.hash(user.password, 10);
      const sql = `INSERT INTO users (name, email, password)
        VALUES ('${user.name}', '${user.email}', '${hashedPassword}')
        ON CONFLICT (id) DO NOTHING;`;

      console.log(sql);
      return pool.query(sql);
    }),
  );

  return insertedUsers;
}

async function seedInvoices() {

  await pool.query(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`);

  const insertedInvoices = await Promise.all(
    invoices.map(
      (invoice) => {
        const sql = `INSERT INTO invoices (customer_id, amount, status, date)
          VALUES ('${invoice.customer_id}', ${invoice.amount}, '${invoice.status}', '${invoice.date}')
          ON CONFLICT (id) DO NOTHING;`; 
          
          console.log(sql);
          pool.query(sql);
      }
    ),
  );

  return insertedInvoices;
}

async function seedCustomers() {

  await pool.query(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`);

  const insertedCustomers = await Promise.all(
    customers.map(
      (customer) => {
        const sql= `
          INSERT INTO customers (id, name, email, image_url)
          VALUES ('${customer.id}', '${customer.name}', '${customer.email}', '${customer.image_url}')
          ON CONFLICT (id) DO NOTHING;`;

        console.log(sql);
        pool.query(sql);
        }
    ),
  );

  return insertedCustomers;
}

async function seedRevenue() {

  const insertedRevenue = await Promise.all(

    revenue.map(
      (rev) => {
        const sql = `INSERT INTO revenue (month, revenue)
          VALUES ('${rev.month}', ${rev.revenue})
          ON CONFLICT (month) DO NOTHING;`;

        console.log(sql);
        pool.query(sql);
      }
    ),
  );

  return insertedRevenue;
}

export async function GET() {
  console.log("GET");
  try {
    // await pool.query(`BEGIN`);
    // console.log("BEGIN");
    // await seedUsers();
    // await seedCustomers();
    // await seedInvoices();
    // await seedRevenue();
    // await pool.query(`COMMIT`);
    // console.log("COMMIT");
    return Response.json({ message: 'Database seeded successfully' });
  } catch (error) {
    // await pool.query(`ROLLBACK`);
    return Response.json({ error }, { status: 500 });
  }
}
