import prisma from '@/app/lib/db';
import { formatCurrency } from './utils';
import { Prisma } from '@prisma/client';

export async function fetchRevenue() {
    try {
        const data = await prisma.revenue.findMany();
        return data;
    } catch(error){
        console.error(`Database error: ${error}`);
        throw new Error('Failed to fetch revenue data.');
    }
}

export async function fetchLatestInvoices() {
    try {
        const data = await prisma.invoices.findMany({
            orderBy: {
                id: "desc"
            },
            take: 5,
            include: {
                customer: true
            }
        })
        const latestInvoices = data.map((invoice) => ({
          ...invoice,
          amount: formatCurrency(invoice.amount),
        }));
        return latestInvoices;
      } catch (error) {
        console.error('Database Error:', error);
        throw new Error('Failed to fetch the latest invoices.');
      }
    }
    export type InvoiceWithCustormer = Prisma.invoicesGetPayload<{
      include: {
        customer: true
      }
    }>

    export async function fetchCardData() {
        try {
          // You can probably combine these into a single SQL query
          // However, we are intentionally splitting them to demonstrate
          // how to initialize multiple queries in parallel with JS.
          const invoiceCountPromise = prisma.invoices.count();
          const customerCountPromise = prisma.customers.count();
          const invoiceStatusPromise = await prisma.invoicestatus.findUnique({
            where: {
              id: 1,
            },
          });

          const data = await Promise.all([
            invoiceCountPromise,
            customerCountPromise,
            invoiceStatusPromise,
          ]);
      
          const numberOfInvoices = Number(data[0] ?? '0');
          const numberOfCustomers = Number(data[1] ?? '0');
          const totalPaidInvoices = formatCurrency(Number(invoiceStatusPromise?.paid) ?? '0');
          const totalPendingInvoices = formatCurrency(Number(invoiceStatusPromise?.pending) ?? '0');
            
          return {
            numberOfCustomers,
            numberOfInvoices,
            totalPaidInvoices,
            totalPendingInvoices,
          };
        } catch (error) {
          console.error('Database Error:', error);
          throw new Error('Failed to fetch card data.');
        }
      }
      