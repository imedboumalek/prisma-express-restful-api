import faker from "faker";
import dbclient from "./main";
const seedTags = async () => {
  const tags = [];
  let count = 0;
  while (count < 50) {
    tags.push({
      title: faker.lorem.word(),
    });
    count++;
  }
  await dbclient.tag.createMany({ data: tags }).then(() => {
    console.log("Tags seeded");
  });
};
export default seedTags;
