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
      topicId: count++,
    });
  }
  submissions.forEach(async (element) => {
    const sub = await dbclient.submission.create({
      data: element,
    });
    await dbclient.submission.update({
      where: { id: sub.id },
      data: {
        tags: {
          connect: [
            {
              id: 3,
            },
            {
              id: 5,
            },
          ],
        },
        authors: {
          connect: [
            {
              id: 1,
            },
            {
              id: 5,
            },
          ],
        },
      },
    });
  });
};
export default seedSubmissions;
