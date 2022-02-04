import { PrismaClient } from "@prisma/client";
import seedAuthors from "./authors";
import seedCountries from "./countries";
import seedOrgs from "./organization";
import seedSubmissions from "./submissions";
import seedTags from "./tags";
import seedTopics from "./topics";

const dbclient = new PrismaClient();
export default dbclient;
const main = async () => {
  await dbclient.$connect();
 
  //NOTE: didn't use Promise.all on purpose.
  await seedCountries();
  await seedTopics();
  await seedTags();
  await seedOrgs();
  await seedAuthors();
  await seedSubmissions().then(() =>
 
};

main().finally(() => {
  dbclient.$disconnect();
});
