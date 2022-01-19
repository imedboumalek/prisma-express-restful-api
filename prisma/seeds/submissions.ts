import faker from "faker";
import dbclient from "./main";
const seedSubmissions = async () => {
  const submissions = [];
  let count = 1;
  while (count < 50) {
    submissions.push({
      title: faker.lorem.sentence(),
      resume: faker.lorem.paragraph(),
      url: faker.internet.url(),
      topicId: Math.floor(Math.random() * 50),
    });
    count++;
  }
  submissions.forEach(async (element) => {
    dbclient.submission
      .create({
        data: {
          ...element,
          tags: {
            connect: [
              {
                tagId: Math.floor(Math.random() * 50),
              },
              {
                tagId: Math.floor(Math.random() * 50),
              },
              {
                tagId: Math.floor(Math.random() * 50),
              },
            ],
          },
          authors: {
            connect: [
              {
                authorId: Math.floor(Math.random() * 50),
              },
              {
                authorId: Math.floor(Math.random() * 50),
              },
              {
                authorId: Math.floor(Math.random() * 50),
              },
            ],
          },
        },
      })
      .then(() => {
        console.log("done seeding submissions");
      });
  });
};
export default seedSubmissions;
