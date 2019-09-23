import React, { Component } from 'react';
import axios from 'axios'
import './searchBus.css'
import { Link, withRouter } from 'react-router-dom';

class SearchBus extends Component {
  constructor(props) {
    super(props)
    this.state = {
      listBus: [],
      listAutoMarket: [],
      listSeat: [],
      autoMarket: '0',
      seatTotal: '0',
      seatDiagram: [],
      keyWordSearch: '',
      page: 1
    }
  }

  booking = (key) => {
  }

  searchBus = (value) => {
    let data = value + ''
    this.setState({ keyWordSearch: data });
    const link = 'http://localhost:8000/filterBus/' + data

    axios.get(link, { data: data })
      .then(result => {
        this.setState({ listBus: result.data });
      })
  }
  filterBy = () => {
    this.setState({ page: 1 });
    const link = 'http://localhost:8000/filter/' + this.state.autoMarket + '/' + this.state.seatTotal + '?page=' + this.state.page
    axios.get(link)
      .then(result => {
        if ((this.state.autoMarket === '0' && this.state.seatTotal === '0') || (this.state.autoMarket === '0' && this.state.seatTotal !== '0')) {
          // this.setState({ listBus: result.data }) 
          this.setState({ listBus: result.data });
        }

        else if ((this.state.autoMarket !== '0' && this.state.seatTotal === '0') || (this.state.autoMarket !== '0' && this.state.seatTotal !== '0')) {
          if (result.data.length > 0) {
            if (result.data[0].buses) {
              this.setState({ listBus: result.data[0].buses })
            }
          }
          else {
            this.setState({ listBus: [] });
          }
        }
      })
  }
  onChange = async (e) => {
    let name = e.target.name
    if (name === 'keySearch') {
      let value = e.target.value
      this.searchBus(value)
    }

    else {
      let value = e.target.value
      if (name === 'filterByAutoMarket') {
        console.log(value)
        await this.setState({ autoMarket: value });
        this.filterBy()
      }
      else if (name === 'filterBySeatTotal') {
        await this.setState({ seatTotal: value })
        const link = 'http://localhost:8000/filter/' + this.state.autoMarket + '/' + this.state.seatTotal + '?page=' + this.state.page
        this.filterBy()
      }
    }
  }

  getAllCar = () => {
    let link = 'http://localhost:8000/getAllBus?page=' + this.state.page
    axios
      .get(link)
      .then(async result => {
        this.setState({ listBus: result.data.data })
        let linkSeatCatogory = 'http://localhost:8000/getAllSeatCatogory'
        axios.post(linkSeatCatogory)
          .then(listSeatCatogory => {
            this.setState({ listSeat: listSeatCatogory.data });
          })
      })

  }

  getAllCarBack = () => {
    let link = 'http://localhost:8000/getAllBus'
    axios
      .post(link)
      .then(async result => {
        this.setState({ listBus: result.data.data })
        let temp = result.data.data;
        for (let i = 0; i < temp.length - 1; i++) {
          for (let j = i + 1; j < temp.length; j++) {
            if (temp[i].seattotal > temp[j].seattotal) {
              let x = temp[i]
              temp[i] = temp[j]
              temp[j] = x
            }
            if (temp[j].seattotal === temp[i].seattotal) {
              temp.splice(j, 1)
            }
          }
        }
        this.setState({ listSeat: temp });
        this.setState({ seatDiagram: [] });
      })

  }
  getAllAutoMarket = () => {
    let link = 'http://localhost:8000/getAllAutoMarket'
    axios
      .post(link)
      .then(result => {
        this.setState({ listAutoMarket: result.data })
      })
  }

  SeatDiagram = () => {

  }
  renderBus = () => {
    return this.state.listBus.map((item, key) => (
      <div>
        <div className='row Bus'>
          <div key={key} className='aBus'>
            <div className='col-sm-5 float-sm-left' >
              <img src={`../lib/images/${item.img}`} className="img-fluid" alt="avatar" />
            </div>
            <div className='col-sm-7 float-sm-left '>
              <div><strong className='nameBus'>{item.name} - {item.seattotal} chổ </strong></div>
              <div className='descriptionBus'>{item.description}</div>
              <button className='btn-outline-success'><Link to={'/createSeat/' + item.id}  >Seat Diagram</Link></button>
            </div>
          </div>
        </div>
        <br />
      </div>
    ))
  }

  async componentDidMount() {
    await this.getAllCar()
    await this.getAllAutoMarket()
  }

  renderAutoMarker = () => {
    return this.state.listAutoMarket.map((item) => (
      <option key={item.id} value={item.name}>{item.name}</option>
    ))
  }

  renderSeatTotal = () => {
    return this.state.listSeat.map((item) => (
      <option key={item.id} value={item.seattotal}>{item.seattotal}</option>
    ))
  }

  renderSeatDiagram = () => {
    return this.state.seatDiagram.map((items, key) => {
      return items.map((item, key2) => {
        return (
          // <div>{console.log(item + ' - ' + key + key2)}</div>
          key2 === items.length - 1 ? <span key><button onClick={() => this.booking(key + '' + key2)} key={key + '' + key2} className={item === 0 ? 'btn btn-black' : 'btn btn-success'}>x</button> <br /></span> : <button onClick={() => this.booking(key + '' + key2)} key={key + '' + key2} className={item === 0 ? 'btn btn-black' : 'btn btn-success'}>x</button>
        )
      })

    })
  }

  previousPage = async () => {
    // if(this.state.autoMarket === '' || this.state.seatTotal === '')
    let { page } = this.state
    if (page >= 2) {
      await this.setState({ page: page - 1 })
      await this.getAllCar()
    }
  }

  nextPage = async () => {
    let { page } = this.state
    if (this.state.keyWordSearch === '') {
      await this.setState({ page: page + 1 })
      await this.getAllCar()
    }
    else {

    }
  }

  render() {
    return (
      <div>
        <div className='container'>
          <h1>Search Car</h1>
          <div className='row'>
            <input className='col-sm-11' type='text' name='keySearch' onChange={this.onChange}></input>
            <button className='btn btn-success col-sm-1'><i className="fas fa-search"></i></button>
          </div>
          <br />
          <div className='row select'>
            <div className='col-sm-3'></div>
            <select className="form-control form-control-sm col-sm-3" onChange={this.onChange} name='filterByAutoMarket'>
              <option value='0'>Hãng</option>
              {this.renderAutoMarker()}
            </select>
            <select className="form-control form-control-sm col-sm-3" onChange={this.onChange} name='filterBySeatTotal'  >
              <option value='0'> Số ghế </option>
              {this.renderSeatTotal()}
            </select>
          </div>

          <br />
          <hr />
          <div className='listBus'>
            {this.renderBus()}
          </div>
          {this.state.seatDiagram.length > 0 ? <div className='seatDiagram'>
            <h3> Sơ đồ xe </h3>
            {this.renderSeatDiagram()}
            <button className='btn btn-warning' onClick={this.getAllCarBack}> Back </button>
          </div> : ''}
          <br />
          <nav aria-label="Page navigation example">
            <ul className="pagination justify-content-center row">
              <li className="page-item col-sm-2" >
                <button className='btn btn-success' onClick={this.previousPage} > {`<<`} </button>
              </li>
              <li className="page-item col-sm-2" >
                <button className='btn btn-success' onClick={this.nextPage} > {`>>`} </button>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    )
  }
}


export default SearchBus