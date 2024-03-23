const Constants = require("../helpers/constants");

async function getUserDetails(req) {
  return new Promise(async (resolve, reject) => {
    try {
      resolve({ message: "Sucess" });
    } catch (error) {
      reject({ message: "Error getting user details" });
    }
  });
}

module.exports = {
  getUserDetails,
};
