"use strict";
var bcrypt = require("bcrypt");
const { faker } = require('@faker-js/faker');
const { v4: uuidv4 } = require('uuid');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {

    const items = generateFakerItems(10);
    await queryInterface.bulkInsert("Users", items, {});

  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Users", null, {});
  },
};

function generateFakerItems(rowCount) {
  const data = [];
  const salt = bcrypt.genSaltSync(10)

  for (let i = 0; i < rowCount; i++) {
    const newItem = {

      id : uuidv4(),
      name: faker.name.fullName(),
      username: faker.internet.userName(),
      email: faker.internet.email(),
      password:  bcrypt.hashSync('P@ssw0rd', salt),
      roles: "Author",
      createdAt: new Date(),
      updatedAt: new Date(),

    };

    data.push(newItem);
  }

  return data;
}
