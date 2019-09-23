const express = require('express')
const router = express.Router()
const bus = require('../models/bus')
const automarker = require('../models/automarker')
const seat = require('../models/seat')
const fs = require('fs')



router.post('/getAllDatabase', (req, res) => {
  console.log(req.query.page)
  let listBus = []
  bus.findAll()
    .then(listBus => {
      automarker.findAll()
        .then(listAutoMarker => {
          seat.findAll()
            .then(listSeat => {
              res.json({ listBus: listBus, listAutoMarker: listAutoMarker, listSeat: listSeat })
            })
        })
    })

})

router.post('/importDatabase', (req, res) => {
  let { fileName, contentJson } = req.body
  console.log(contentJson)
  if (fileName === 'busdb.csv') {
    bus.findAll()
      .then(result => {
        let maxId = 0
        for (let i = 0; i < contentJson.data.length; i++) {
          if (parseInt(contentJson.data[i][0]) > maxId) {
            maxId = parseInt(contentJson.data[i][0])
          }
        }
        for (let i = 1; i < contentJson.data.length; i++) {
          if (contentJson.data[i][0] !== '') {
            let checkupdate = 0
            for (let j = 0; j < result.length; j++) {
              if (parseInt(contentJson.data[i][0]) === result[j].id) {
                checkupdate = 1
                bus.update({
                  name: contentJson.data[i][1],
                  img: contentJson.data[i][2],
                  description: contentJson.data[i][3],
                  seattotal: contentJson.data[i][4],
                  createdAt: contentJson.data[i][5],
                  updatedAt: contentJson.data[i][6],
                  automarkerId: parseInt(contentJson.data[i][7])
                },
                  {
                    where: { id: parseInt(contentJson.data[i][0]), }
                  }
                )
              }
            }
            if (checkupdate === 0) {
              bus.create({
                id: parseInt(contentJson.data[i][0]),
                name: contentJson.data[i][1],
                img: contentJson.data[i][2],
                description: contentJson.data[i][3],
                seattotal: contentJson.data[i][4],
                createdAt: contentJson.data[i][5],
                updatedAt: contentJson.data[i][6],
                automarkerId: parseInt(contentJson.data[i][7])
              })
            }
          }
          else {
            if (contentJson.data[i][1] && contentJson.data[i][2] && contentJson.data[i][3] && contentJson.data[i][4] &&
              contentJson.data[i][5] && contentJson.data[i][6] && contentJson.data[i][7]) {
              maxId++
              bus.create({
                id: maxId,
                name: contentJson.data[i][1],
                img: contentJson.data[i][2],
                description: contentJson.data[i][3],
                seattotal: contentJson.data[i][4],
                createdAt: contentJson.data[i][5],
                updatedAt: contentJson.data[i][6],
                automarkerId: parseInt(contentJson.data[i][7])
              })
            }
          }
        }
      })
  }
  else if (fileName === 'automarkerdb.csv') {
    automarker.findAll()
      .then(result => {
        let maxId = 0
        for (let i = 0; i < contentJson.data.length; i++) {
          if (parseInt(contentJson.data[i][0]) > maxId) {
            maxId = parseInt(contentJson.data[i][0])
          }
        }
        for (let i = 1; i < contentJson.data.length; i++) {
          if (contentJson.data[i][0] !== '') {
            let checkupdate = 0
            for (let j = 0; j < result.length; j++) {
              if (parseInt(contentJson.data[i][0]) === result[j].id) {
                checkupdate = 1
                automarker.update({
                  name: contentJson.data[i][1],
                  createdAt: contentJson.data[i][2],
                  updatedAt: contentJson.data[i][3]
                },
                  {
                    where: { id: parseInt(contentJson.data[i][0]), }
                  }
                )
              }
            }
            if (checkupdate === 0) {
              automarker.create({
                id: parseInt(contentJson.data[i][0]),
                name: contentJson.data[i][1],
                createdAt: contentJson.data[i][2],
                updatedAt: contentJson.data[i][3]
              })
            }
          }
          else {
            if (contentJson.data[i][1] && contentJson.data[i][2] && contentJson.data[i][3]) {
              maxId++
              automarker.create({
                id: maxId,
                name: contentJson.data[i][1],
                createdAt: contentJson.data[i][2],
                updatedAt: contentJson.data[i][3]
              })
            }

          }
        }


      })


  }
  else if (fileName === 'seatdb.csv') {
    seat.findAll()
      .then(result => {
        let maxId = 0
        for (let i = 0; i < contentJson.data.length; i++) {
          if (parseInt(contentJson.data[i][0]) > maxId) {
            maxId = parseInt(contentJson.data[i][0])
          }
        }
        for (let i = 1; i < contentJson.data.length; i++) {
          if (contentJson.data[i][0] !== '') {
            let checkupdate = 0
            for (let j = 0; j < result.length; j++) {
              if (parseInt(contentJson.data[i][0]) === result[j].id) {
                checkupdate = 1
                seat.update({
                  seatcode: contentJson.data[i][1],
                  createdAt: contentJson.data[i][2],
                  updatedAt: contentJson.data[i][3],
                  busId: parseInt(contentJson.data[i][4])
                },
                  {
                    where: { id: parseInt(contentJson.data[i][0]) }
                  }
                )
              }
            }
            if (checkupdate === 0) {
              seat.create({
                id: parseInt(contentJson.data[i][0]),
                seatcode: contentJson.data[i][1],
                createdAt: contentJson.data[i][2],
                updatedAt: contentJson.data[i][3],
                busId: parseInt(contentJson.data[i][4])
              })
            }
          }
          else {
            if (contentJson.data[i][1] && contentJson.data[i][2] && contentJson.data[i][3] && contentJson.data[i][4]) {
              maxId++
              seat.create({
                id: maxId,
                seatcode: contentJson.data[i][1],
                createdAt: contentJson.data[i][2],
                updatedAt: contentJson.data[i][3],
                busId: parseInt(contentJson.data[i][4])
              })
            }

          }
        }


      })
  }
})

module.exports = router