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
  // log env vars
  console.log(process.env.NODE_ENV);
  console.log(process.env.PORT);
  console.log(process.env.DATABASE_URL);
  console.log(process.env.JWT_SECRET);
  await dbclient.$connect();

  //NOTE: didn't use Promise.all on purpose.
  await seedCountries();
  await seedTopics();
  await seedTags();
  await seedOrgs();
  await seedAuthors();
  await seedSubmissions().then(() => console.log("Submissions seeded"));
};

main().finally(() => {
  dbclient.$disconnect();
});
