const fs = require('fs');
const ceoFile = require('./src/ceo.json');
const farmerDetails = require('./src/farmerDetails.json');
const farmerGroup = require('./src/farmerGroup.json');
const founders = require('./src/founders.json');
const resolutions = require('./src/resolutions.json')
const mdDetails = require('./src/mdDetails.json')

const handleJSONFile = ()=>{
    const key = ['ceo','farmerDetails','mdDetails','farmerGroup','founders','resolutions']
    const values = [ceoFile,farmerDetails,mdDetails,farmerGroup,founders,resolutions];
    
    const file = {};

    key.forEach((item,index)=>{
        file[item] = values[index]
    });
    fs.writeFile('db.json',JSON.stringify(file),err=>{
        if(err){
            console.log(err);
            return;
        }
    })
  }

  handleJSONFile();