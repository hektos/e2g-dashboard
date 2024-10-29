import prisma from '@/app/lib/db';
import { formatCurrency } from '@/app/lib/utils';
import { Prisma } from '@prisma/client';

export async function GET() {
  console.log("TEST");
  try {
    const invoiceCountPromise = prisma.invoices.count();
    const customerCountPromise = prisma.customers.count();
    const invoiceStatusPromise = prisma.$queryRaw<Number>(
      Prisma.sql `SELECT
         SUM(CASE WHEN status = 'paid' THEN amount ELSE 0 END) AS paid,
         SUM(CASE WHEN status = 'pending' THEN amount ELSE 0 END) AS pending
         FROM invoices`
    );

    const data = await Promise.all([
      invoiceCountPromise,
      customerCountPromise,
      invoiceStatusPromise,
    ]);

    console.log(data);
    const numberOfInvoices = Number(data[0] ?? '0');
    console.log(numberOfInvoices);
    const numberOfCustomers = Number(data[1] ?? '0');
    console.log(numberOfCustomers);
    const totalPaidInvoices = formatCurrency(Number(data[2][0].paid) ?? '0');
    console.log(totalPaidInvoices);
    const totalPendingInvoices = formatCurrency(Number(data[2][0].pending) ?? '0');
    console.log(totalPendingInvoices);
    const revenue = await prisma.revenue.findMany();
    console.log(revenue);

    return Response.json({ message: "data vedi console" });
  } catch (error) {
    return Response.json({ error }, { status: 500 });
  }
}
