const reportService = require("./service")
const data = require("../../data/data.json")


module.exports = {
    generateReport,
  }

  async function generateReport(req, res) {
    try{
      const {body} = req
      reportService.fetch(data)
      // res.json(body);
        }catch(err){
       console.log('errrrrrr',err);
    }
  }

  

