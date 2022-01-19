import dbclient from "./main";
import faker from "faker";

const seedAuthors = async () => {
  const authors = [];
  let count = 1;
  while (count < 50) {
    authors.push({
      email: faker.internet.email(),
      password: "$2b$10$jVjDsrUukI914p8goB5YLepxAKD9t5bC17avbLgrriS.d4OzeBqyC",
      salt: "$2b$10$jVjDsrUukI914p8goB5YLe",
      jwt: null,
      username: faker.internet.userName(),
      first_name: faker.name.firstName(),
      last_name: faker.name.lastName(),
      countryId: count,
      orgId: count,
    });
    count++;
  }
  await dbclient.author.createMany({ data: authors }).then(() => {
    console.log("done seeding authors");
  });
};

export default seedAuthors;
