import faker from "faker";
import dbclient from "./main";
const seedTags = async () => {
  const tags = [];
  let count = 0;
  while (count < 50) {
    tags.push({
      name: faker.lorem.word(),
    });
    count++;
  }
  await dbclient.tag.createMany({ data: tags }).then(() => {
    console.log("done seeding tags");
  });
};
export default seedTags;
