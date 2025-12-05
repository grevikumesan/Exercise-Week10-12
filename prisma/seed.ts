import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  await prisma.order.deleteMany();
  await prisma.restaurant.deleteMany();
  await prisma.customer.deleteMany();

  console.log('Hapus data');

  //customer
  const cust1 = await prisma.customer.create({ data: { name: 'Andi Galau', phone: '08111' } });
  const cust2 = await prisma.customer.create({ data: { name: 'Budi Santuy', phone: '08222' } });
  const cust3 = await prisma.customer.create({ data: { name: 'Citra Kirana', phone: '08333' } });

  //restaurant
  const resto1 = await prisma.restaurant.create({ data: { name: 'Nasgor Gila', description: 'Pedas', isOpen: true } });
  const resto2 = await prisma.restaurant.create({ data: { name: 'Kopi Senja', description: 'Indie', isOpen: true } });
  const resto3 = await prisma.restaurant.create({ data: { name: 'Sate Madura', description: 'Enak', isOpen: false } });

  console.log('Berhasil');

  //order
  const ordersData = [
    { custId: cust1.id, restoId: resto1.id, items: 2 }, 
    { custId: cust2.id, restoId: resto2.id, items: 1 },  
    { custId: cust3.id, restoId: resto3.id, items: 5 },  
    { custId: cust1.id, restoId: resto2.id, items: 3 },  
    { custId: cust2.id, restoId: resto1.id, items: 10 }, 
  ];

  for (const o of ordersData) {
    await prisma.order.create({
      data: {
        customer_id: o.custId,
        restaurant_id: o.restoId,
        itemAmount: o.items,
        eta: (o.items * 10) + 10 
      }
    });
  }

  console.log('Seed selesai');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });