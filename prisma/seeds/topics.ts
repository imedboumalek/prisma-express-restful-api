import dbclient from "./main";
import faker from "faker";

const seedTopics = async () => {
  const topics = [];
  let count = 1;
  while (count < 50) {
    topics.push({
      name: faker.lorem.word(),
    });
    count++;
  }
  await dbclient.topic.createMany({ data: topics }).then(() => {
    console.log("done seeding topics");
  });
};
export default seedTopics;
