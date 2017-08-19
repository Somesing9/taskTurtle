'use strict';
var faker = require('faker');
var bCrypt = require('bcrypt-nodejs');

var generateHash = function(password) {
  return bCrypt.hashSync(password, bCrypt.genSaltSync(8), null);
};
var tempPassword = generateHash('test');

var userData = [];
for (var i = 0; i < 50; i++) {
  if (i < 25) {
    userData[i] = {
      firstname: faker.name.firstName(),
      lastname: faker.name.lastName(),
      email: 'user' + i + '@gmail.com',
      password: tempPassword,
      createdAt: new Date(),
      updatedAt: new Date()
    }
  }
  else {
    userData[i] = {
      firstname: faker.name.firstName(),
      lastname: faker.name.lastName(),
      email: 'contractor' + (i-24) + '@gmail.com',
      password: tempPassword,
      status: 'contractor',
      createdAt: new Date(),
      updatedAt: new Date()
    }
  }

}

var jobData = [];
var jobCreator = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
var zipCodes =[44022, 44023]
var category
for (var i = 0; i < 50; i++) {
  jobData[i] = {
    title: faker.lorem.words(),
    description: faker.lorem.sentence(),
    duration: 5,
    UserId: jobCreator[i % 10],
    location: zipCodes[i % 2],
    category: Math.floor(Math.random() * 5) + 1,
    createdAt: new Date(),
    updatedAt: new Date()
  }
}

module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Users', userData).then(() => {
      return queryInterface.bulkInsert('Jobs', jobData)
    });
  },

  down: function(queryInterface, Sequelize) {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('Person', null, {});
    */
    return queryInterface.bulkDelete('Users', null, {});
  }
};