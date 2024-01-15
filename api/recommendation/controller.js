const recommendationService = require("./service")
// const data = require("../../data/data.json")


module.exports = {
  fetch,
  add,
  update,
  remove
  }

  async function fetch(req, res) {
    try{
      const {query} = req
     const recs = recommendationService.fetch(query)
      res.json(recs);
        }catch(err){
       console.log('errrrrrr',err);
    }
  }
  async function add(req, res) {
    try{
      const {body} = req
      const newRec = recommendationService.add(body)
      res.json(newRec);
        }catch(err){
       console.log('errrrrrr',err);
    }
  }
  async function update(req, res) {
    try{
      const {body} = req
      console.log(body);
      const updatedRec = recommendationService.updateById(body)
      res.json(updatedRec);
        }catch(err){
       console.log('errrrrrr',err);
    }
  }
  async function remove(req, res) {
    try{
      const {body} = req
      const {id} = body
      const stat = recommendationService.removeById(id)
      res.json(stat);
        }catch(err){
       console.log('errrrrrr',err);
    }
  }

  

