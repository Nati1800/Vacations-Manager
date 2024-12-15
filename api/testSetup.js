// const axios = require('axios');

// jest.mock('axios', () => ({
//   post: jest.fn(),
//   get: jest.fn(),
//   put: jest.fn(),
//   delete: jest.fn(),
// }));

// jest.mock("api/src/db/connection.ts", () => ({
//   getConnection: jest.fn().mockResolvedValue({
//     execute: jest.fn().mockResolvedValue([{ insertId: 1 }]), 
//   }),
// }));

// jest.mock("api/src/queries/addVacationQuery.ts", () => ({
//   addVacationQuery: jest.fn(() => "INSERT INTO vacations (destination, description, start_date, end_date, price, image) VALUES (?,?,?,?,?,?)"),
// }));
