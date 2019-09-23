const express = require('express')
const router = express.Router()
const Sequelize = require("sequelize");
const bus = require('../models/bus')
const automarket = require('../models/automarker')
const seat = require('../models/seat')
const seatCatogory = require('../models/seatCategory')
const Op = Sequelize.Op;
let itemPerPage = 8

router.get('/getAllBus', (req, res) => {
  let page = (req.query.page) || 1
  let start = (page - 1) * itemPerPage
  bus.findAll({
    offset: start,
    limit: itemPerPage
  })
    .then(data => {
      res.json({ data })
    })
})

router.post('/getAllSeatCatogory', (req, res) => {
  seatCatogory.findAll()
    .then(data => {
      res.json(data)
    })
})
router.get('/filterBus/:keySearch', async (req, res) => {
  data = await req.params.keySearch
  let page = await (req.query.page) || 1
  if (data !== '') {
    let start = await (page - 1) * itemPerPage
    bus.findAll({
      where: {
        [Op.and]: [{
          [Op.or]: [
            {
              name: {
                [Op.iLike]: `%${data}%`
              }
            },
            {
              seattotal: {
                [Op.iLike]: `%${data}%`
              }
            }

          ],
        }]
      },
      offset: start,
      limit: itemPerPage
    }).then(result => {
      res.json(result)
    })
  }
  else {
    bus.findAll({
      offset: start,
      limit: itemPerPage
    })
      .then(data => {
        res.json({ data })
      })
  }

})

router.post('/showSeatDiagram', (req, res) => {
  let id = req.body.id
  bus.findAll({
    include: [{
      model: seat
    }],
    where: {
      id: id
    }
  }).then(result => {
    res.json(result)
  })
})
router.post('/getAllAutoMarket', (req, res) => {
  data = req.body.data
  automarket.findAll().then(result => {
    res.json(result)
  })
})

router.get('/filter/:value_automarket/:value_seattotal', async (req, res) => {
  let value_automarket = await req.params.value_automarket
  let value_seattotal = await req.params.value_seattotal
  console.log(value_seattotal)
  console.log(value_seattotal)
  console.log(value_automarket)
  let page = await parseInt(req.query.page)
  let start = await (page - 1) * itemPerPage

  console.log('page:' + page)
  if (value_automarket === '0' && value_seattotal === '0') {
    bus.findAll({
      offset: start,
      limit: itemPerPage
    })
      .then(result => {
        res.json(result)
      })
  }
  else if (value_automarket === '0' && value_seattotal !== '0') {
    bus.findAll({
      where: {
        seattotal: value_seattotal
      },
      offset: start,
      limit: itemPerPage,
    }).then(result => {
      res.json(result)
    })
  }
  else if (value_automarket !== '0' && value_seattotal === '0') {
    automarket.findAll({
      include: [
        {
          model: bus,
          offset: start,
          limit: itemPerPage,
        }
      ],
      where: {
        name: value_automarket
      },
    }).then(result => {
      res.json(result)
    })
  }
  else if (value_automarket !== '0' && value_seattotal !== '0') {
    automarket.findAll({
      include: [
        {
          model: bus,
          offset: start,
          limit: itemPerPage,
          where: {
            seattotal: value_seattotal
          }
        }
      ],
      where: {
        name: value_automarket
      }
    }).then(result => {
      res.json(result)
    })
  }
})

router.post('/saveSeatDiagram', (req, res) => {
  let { idBus, seatDiagram, numberFloor } = req.body
  let seatDiagram2 = JSON.stringify(seatDiagram)
  // console.log(idBus)
  // console.log(seatDiagram)
  seat.findOne({
    where: {
      busId: idBus
    }
  }).then(result => {
    if (result) {
      seat.update({
        seatcode: seatDiagram2
      }, {
          where: {
            busId: idBus
          }
        }
      )
    }
    else {
      seat.create({
        id: idBus,
        seatcode: seatDiagram2,
        busId: idBus,
        numberfloor: numberFloor
      })
    }
  })
})

router.post('/checkExistSeatDiagram', (req, res) => {
  let idBus = req.body.idBus
  seat.findOne({
    where: {
      busId: idBus
    }
  }).then(result => {
    if (result) {
      res.json(result)
    }
  })
})

module.exports = router