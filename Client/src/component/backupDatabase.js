import React, { Component } from 'react'
import Dropzone from 'react-dropzone'
import axios from 'axios'
import './backupDatabase.css'
const Papa = require('papaparse')
var FileSaver = require('file-saver')
const readText = file =>
  new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsText(file)
    reader.onload = () => resolve(reader.result)
    reader.onerror = reject
  })

class BackupDatabase extends Component {
  constructor(props) {
    super(props)
    this.state = {
      lisAutoMarker: [],
      listBus: [],
      lisSeat: []
    }
  }

  exPort = () => {
    let link = 'http://localhost:8000/getAllDatabase'
    axios.post(link).then(result => {
      this.setState({ lisAutoMarker: result.data.listAutoMarker })
      this.setState({ lisSeat: result.data.listSeat })
      this.setState({ listBus: result.data.listBus })
      let lisAutoMarkerCsv = Papa.unparse(this.state.lisAutoMarker)
      let lisBusCsv = Papa.unparse(this.state.listBus)
      let listSeatCsv = Papa.unparse(this.state.lisSeat)
      FileSaver.saveAs(new Blob([lisBusCsv], { type: 'application/octet-stream' }), 'busdb.csv')
      FileSaver.saveAs(new Blob([lisAutoMarkerCsv], { type: 'application/octet-stream' }), 'automarkerdb.csv')
      FileSaver.saveAs(new Blob([listSeatCsv], { type: 'application/octet-stream' }), 'seatdb.csv')
    })
  }


  handleOnDrop = async (file, rejectedFiles) => {
    let contentString = await readText(file[0])
    console.log(file)
    let contentJson = Papa.parse(contentString)
    let link = 'http://localhost:8000/importDatabase'
    axios.post(link, { fileName: file[0].name, contentJson: contentJson })
      .then(result => {
        console.log(result)
      })
  }
  render() {
    return (
      <div className='container'>
        <h1>Backup Database</h1>
        <hr />
        <div>
          <div className='button' className='row'>
            <div className='col-sm-4'></div>
            <Dropzone className='col-sm-2' onDrop={this.handleOnDrop}>
              {({ getRootProps, getInputProps }) => (
                <section>
                  <div {...getRootProps()}>
                    <input {...getInputProps()} />
                    <button className='btn btn-success'>Import Database</button>
                  </div>
                </section>
              )}
            </Dropzone>

            <div className='col-sm-1'></div>
            <button className='btn btn-success col-sm-2' onClick={this.exPort}> Export Database </button>
            <div className='col-sm-3'></div>
          </div>

        </div>
      </div>
    )
  }
}

export default BackupDatabase