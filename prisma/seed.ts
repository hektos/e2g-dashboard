import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
//    const invoiceStatusPromise = prisma.$queryRaw<Number>(
  //     "SELECT
    //     SUM(CASE WHEN status = 'paid' THEN amount ELSE 0 END) AS paid,
      //   SUM(CASE WHEN status = 'pending' THEN amount ELSE 0 END) AS pending
        // FROM invoices"
 //   );
 //   console.log(invoiceStatusPromise);
	console.log(prisma.invoices.count());
}
main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
