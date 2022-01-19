import { PrismaClient } from "@prisma/client";
import seedAuthors from "./authors";
import seedCountries from "./countries";
import seedTopics from "./topics";

const dbclient = new PrismaClient();
export default dbclient;
const main = async () => {
  await dbclient.$connect();
  console.log("connected to prisma");
  await Promise.all([seedCountries(), seedTopics(), seedAuthors()]).then(() => {
    console.log("seeded");
  });
};

main().finally(() => {
  dbclient.$disconnect();
});
