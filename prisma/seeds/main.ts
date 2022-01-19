import { PrismaClient } from "@prisma/client";
import seedAuthors from "./authors";
import seedCountries from "./countries";
import seedOrgs from "./organization";
import seedTopics from "./topics";

const dbclient = new PrismaClient();
export default dbclient;
const main = async () => {
  await dbclient.$connect();
  console.log("connected to prisma");
  await seedCountries();
  await seedTopics();
  await seedOrgs();
  await seedAuthors();
  console.log("done seeding");
};

main().finally(() => {
  dbclient.$disconnect();
});
