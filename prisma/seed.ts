import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  const invoiceStatusPromise = await prisma.invoicestatus.findUnique({
    where: {
      id: 1,
    },
  })
	console.log(invoiceStatusPromise);
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
