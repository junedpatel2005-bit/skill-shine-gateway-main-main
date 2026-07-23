import { prisma } from "./src/lib/prisma";

async function main() {
  try {
    const tables = await prisma.$queryRawUnsafe("SELECT table_name FROM information_schema.tables WHERE table_schema = 'public'");
    console.log("Tables in database:", JSON.stringify(tables, null, 2));
  } catch (error) {
    console.error("Error fetching tables:", error);
  } finally {
    await prisma.$disconnect();
  }
}

main();
