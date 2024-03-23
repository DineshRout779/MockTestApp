const ServerResponse = require("../helpers/serverResponse");
const mockTestService = require("../services/mockTestService");

async function getUserDetails(req, res, next) {
  mockTestService
    .getUserDetails(req)
    .then(
      (response) => {
        ServerResponse.sendOk(res, response);
      },
      (error) => {
        ServerResponse.sendInvalidRequest(res, error);
      }
    )
    .catch(next);
}

module.exports = {
  getUserDetails,
};
