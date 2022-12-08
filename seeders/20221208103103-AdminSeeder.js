'use strict';
const bcrypt = require('bcrypt');
const { v4: uuidv4 } = require('uuid');


/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const salt = await bcrypt.genSalt(10);
    await queryInterface.bulkInsert('Users', 
    [
      {

      id : uuidv4(),
      name : 'ADMIN',
      username : 'ADMIN',
      email : 'admin@test.com',
      password : await bcrypt.hash("P@ssw0rd", salt),
      roles : 'Admin',
      createdAt : new Date(),
      updatedAt : new Date(),
      
    }
  ]
  , {});

},

  async down (queryInterface, Sequelize) {
    
    await queryInterface.bulkDelete('Users', null, {});
     
  }
};


