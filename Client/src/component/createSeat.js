import React, { Component } from 'react'
import axios from 'axios'
import './createSeat.css'
import { Link, withRouter } from 'react-router-dom';
class CreateSeat extends Component {
  constructor(props) {
    super(props)
    this.state = {
      totalRow: 0,
      totalCol: 0,
      numberFoor: '0',
      seatDiagram: [],
      idBus: null
    }
  }

  onChange = (e) => {
    if (e.target.name === 'totalRow') {
      this.setState({ totalRow: e.target.value })
    }
    else if (e.target.name === 'totalCol') {
      this.setState({ totalCol: e.target.value })
    }
    else {
      this.setState({ numberFoor: e.target.value })
    }
  }

  booking = (colum, row, floor) => {
    if (this.state.numberFoor === '1') {
      let temp = this.state.seatDiagram
      if (temp[colum][row] === 1) {
        temp[colum][row] = 0
        this.setState({ seatDiagram: temp })
      }
      else {
        temp[colum][row] = 1
        this.setState({ seatDiagram: temp })
      }

    }
    else {
      let temp = this.state.seatDiagram
      if (temp[floor][colum][row] === 1) {
        temp[floor][colum][row] = 0
        this.setState({ seatDiagram: temp })
      }
      else {
        temp[floor][colum][row] = 1
        this.setState({ seatDiagram: temp })
      }
    }
  }

  saveDiagramSeat = () => {
    const link = 'http://localhost:8000/saveSeatDiagram'
    axios.post(link, { idBus: this.state.idBus, seatDiagram: this.state.seatDiagram, numberFloor: this.state.numberFoor })
  }
  createSeatDemo = () => {
    if (this.state.totalRow !== 0 && this.state.totalCol !== 0 && this.state.numberFoor !== '0') {
      if (this.state.numberFoor === '1') {
        let listSeatDiagram = []
        for (let i = 0; i < this.state.totalCol; i++) {
          let seatDiagram = []
          for (let j = 0; j < this.state.totalRow; j++) {
            seatDiagram[j] = 0
          }
          listSeatDiagram.push(seatDiagram)
        }
        this.setState({ seatDiagram: listSeatDiagram });
      }
      else {
        let listSeatDiagram = []
        for (let k = 0; k < parseInt(this.state.numberFoor); k++) {
          let SeatDiagram = []
          for (let i = 0; i < this.state.totalCol; i++) {
            let seatDiagramRow = []
            for (let j = 0; j < this.state.totalRow; j++) {
              seatDiagramRow[j] = 0
            }
            SeatDiagram.push(seatDiagramRow)
          }
          listSeatDiagram.push(SeatDiagram)
        }
        this.setState({ seatDiagram: listSeatDiagram });
        // console.log(this.state.seatDiagram)
      }
    }
  }
  renderSeatDiagramOneFloor = () => {
    return (
      <div className='row'>
        <div className='col-sm-4'></div>
        <div className='col-sm-7'>
          {
            this.state.seatDiagram.map((items, key) => {
              return items.map((item, key2) => {
                return (
                  // <div>{console.log(item + ' - ' + key + key2)}</div>
                  key2 === items.length - 1 ? <span key><button onClick={() => this.booking(key, key2, 0)} key={key + '' + key2} className={item === 0 ? 'btn btn-black' : 'btn btn-success'}>{key < 9 ? String.fromCharCode(parseInt(key2) + 65) + '0' + ((key + 1)) : String.fromCharCode(parseInt(key2) + 65) + (key + 1)}</button> <br /></span> :
                    <button onClick={() => this.booking(key, key2, 0)} key={key + '' + key2} className={item === 0 ? 'btn btn-black' : 'btn btn-success'}>{key < 9 ? String.fromCharCode(parseInt(key2) + 65) + '0' + ((key + 1)) : String.fromCharCode(parseInt(key2) + 65) + (key + 1)}</button>
                )
              })

            })
          }
        </div>
      </div>

    )
  }

  renderSeatDiagramTwoFloor = () => {
    return (
      <div className='row'>
        <div className='col-sm-3'></div>
        <div className='col-sm-4 left'>
          {
            this.state.seatDiagram.length >= 2 ? this.state.seatDiagram[0].map((items, key) => {
              return items.map((item, key2) => {
                return (
                  // <div>{console.log(item + ' - ' + key + key2)}</div>
                  key2 === items.length - 1 ? <span key><button onClick={() => this.booking(key, key2, 0)} key={key + '' + key2} className={item === 0 ? 'btn btn-black' : 'btn btn-success'}>{key < 9 ? String.fromCharCode(parseInt(key2) + 65) + '0' + ((key + 1)) : String.fromCharCode(parseInt(key2) + 65) + (key + 1)}</button> <br /></span> :
                    <button onClick={() => this.booking(key, key2, 0)} key={key + '' + key2} className={item === 0 ? 'btn btn-black' : 'btn btn-success'}>{key < 9 ? String.fromCharCode(parseInt(key2) + 65) + '0' + ((key + 1)) : String.fromCharCode(parseInt(key2) + 65) + (key + 1)}</button>
                )
              })

            }) : ''
          }

        </div>
        <div className='col-sm-4 right'>

          {
            this.state.seatDiagram.length >= 2 ? this.state.seatDiagram[1].map((items, key) => {
              return items.map((item, key2) => {
                return (
                  // <div>{console.log(item + ' - ' + key + key2)}</div>
                  key2 === items.length - 1 ? <span key><button onClick={() => this.booking(key, key2, 1)} key={key + '' + key2} className={item === 0 ? 'btn btn-black' : 'btn btn-success'}>{key < 9 ? String.fromCharCode(parseInt(key2) + 65) + '0' + ((key + 1)) : String.fromCharCode(parseInt(key2) + 65) + (key + 1)}</button> <br /></span> :
                    <button onClick={() => this.booking(key, key2, 1)} key={key + '' + key2} className={item === 0 ? 'btn btn-black' : 'btn btn-success'}>{key < 9 ? String.fromCharCode(parseInt(key2) + 65) + '0' + ((key + 1)) : String.fromCharCode(parseInt(key2) + 65) + (key + 1)}</button>
                )
              })

            }) : ''
          }
        </div>
      </div>
    )
  }

  checkExistSeatDiagram = () => {
    let link = 'http://localhost:8000/checkExistSeatDiagram'
    axios.post(link, { idBus: this.state.idBus })
      .then(result => {

        let seatcode = JSON.parse(result.data.seatcode)
        this.setState({ seatDiagram: seatcode })
        this.setState({ numberFoor: result.data.numberfloor })
        console.log(result)
      })
  }
  componentDidMount = async () => {
    let idBus = this.props.match.params.id
    await this.setState({ idBus: idBus })
    this.checkExistSeatDiagram()
  }
  render() {
    return (
      <div className='container'>
        <h1> Tạo sơ đồ ghế</h1>
        <br />
        <div className='row'>
          <div className='col-sm-4'> <strong> Số cột xe </strong> </div>
          <div className='col-sm-4'> <strong> Số hàng xe </strong> </div>
          <div className='col-sm-4'> <strong> Số tầng </strong> </div>
        </div>
        <div className='row'>
          <div className='col-sm-4'> <input type='text' onChange={this.onChange} name='totalRow' /> </div>
          <div className='col-sm-4'> <input type='text' onChange={this.onChange} name='totalCol' /> </div>
          <select className="form-control form-control-sm col-sm-3" name='numberFoor' onChange={this.onChange}  >
            <option value='0'>  </option>
            <option value='1'> 1 </option>
            <option value='2'> 2 </option>
          </select>
        </div>
        <br />
        <button className='btn btn-success col-sm-12 btnCreateSeat' onClick={this.createSeatDemo}> Tạo ghế </button>
        <br />
        <div className='row seatMap'>
          {/* <div className='col-sm-5'></div> */}
          <div className='col-sm-12'>
            {this.state.numberFoor === '1' ? this.renderSeatDiagramOneFloor() : this.state.numberFoor === '2' ? this.renderSeatDiagramTwoFloor() : ''}
          </div>
        </div>
        <br />
        {this.state.seatDiagram.length > 0 ?
          <div className='buttonEnd row'>
            <div className='col-sm-3'></div>
            <button className='btn btn-success col-sm-3' onClick={this.saveDiagramSeat}> Lưu </button>
            <button className='btn btn-warning col-sm-3' > <Link to='/'  > Quay lại </Link> </button>
          </div> :
          <div className='buttonEnd row'>
            <div className='col-sm-3'></div>
            <button className='btn btn-warning col-sm-6' > <Link to='/'  > Quay lại </Link> </button>
          </div>}
      </div>
    )
  }
}

export default CreateSeat