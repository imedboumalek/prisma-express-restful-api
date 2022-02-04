import faker from "faker";
import dbclient from "./main";
const seedOrgs = async () => {
  const orgs = [];
  let count = 1;
  while (count < 50) {
    orgs.push({
      name: faker.company.companyName(),
      countryId: count++,
    });
  }
  await dbclient.organization.createMany({ data: orgs }).then(() => {});
};
export default seedOrgs;
