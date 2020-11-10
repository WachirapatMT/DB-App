const db = require('../db/mysql')

module.exports = app => {

  app.get('/temp', (req, res) => {
    const sql = 'SELECT * FROM temp;'
    const query = db.query(sql, (err, results) => {
      if (err) {
        console.log(err)
      }
      console.log(results)
      res.json(results)
    })
  })

}