const fs = require("fs");
const ceoFile = require("./src/ceo.json");
const farmerDetails = require("./src/farmerDetails.json");
const farmerGroup = require("./src/farmerGroup.json");
const founders = require("./src/founders.json");
const resolutions = require("./src/resolutions.json");
const mdDetails = require("./src/mdDetails.json");

const handleJSONFile = () => {
  const file = {
    ceo: Object.values(ceoFile),
    farmerDetails: Object.values(farmerDetails),
    mdDetails: Object.values(mdDetails),
    farmerGroup: Object.values(farmerGroup),
    founders: Object.values(founders),
    resolutions: Object.values(resolutions),
  };

  fs.writeFile("db.json", JSON.stringify(file), (err) => {
    if (err) {
      console.log(err);
      return;
    }
  });
};

handleJSONFile();
