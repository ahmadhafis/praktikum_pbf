import React, { Component } from "react";
import Mahasiswa from "../../component/Mahasiswa/Mahasiswa";
import "./ListMahasiswa.css"

class ListMahasiswa extends Component {
  state = {
    ListMahasiswa: [],
    insertMahasiswa: {
      id: 1,
      nim: "",
      nama: "",
      alamat: "",
      hp: "",
      angkatan: "",
      status: "",
    },
  };

  ambilDataDariServerAPI() {
    fetch("http://localhost:3002/mahasiswa")
      .then((response) => response.json())
      .then((jsonHasilAmbilAPI) => {
        this.setState({
          ListMahasiswa: jsonHasilAmbilAPI,
        });
      });
  }

  componentDidMount() {
    this.ambilDataDariServerAPI();
  }

  handleTambahMahasiswa = (event) => {
    let formInsertMahasiswa = { ...this.state.insertMahasiswa };
    let timestamp = new Date().getTime();
    formInsertMahasiswa["id"] = timestamp;
    formInsertMahasiswa[event.target.name] = event.target.value;
    this.setState({
      insertMahasiswa: formInsertMahasiswa,
    });
  };

  handleHapusMahasiswa = (data) => {
    fetch(`http://localhost:3002/mahasiswa/${data}`, { method: "DELETE" }).then(
      (res) => this.ambilDataDariServerAPI()
    );
  };

  handleTombolSimpan = () => {
    fetch("http://localhost:3002/mahasiswa", {
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(this.state.insertMahasiswa),
    }).then((response) => {
      this.ambilDataDariServerAPI();
    });
  };

  render() {
    return(
    <div className="post-mahasiswa">
    <div className='form pb-2 border-bottom'>
        <div className='form-group row'>
            <label htmlFor="nim" className='col-sm-2 col-form-label'>Nim</label>
            <div className='col-sm-10'>
                <input type="text" className="form-control" id="nim" name="nim" onChange={this.handleTambahMahasiswa} />
            </div>
        </div>
        <div className='form-group row'>
            <label htmlFor="nama" className='col-sm-2 col-form-label'>Nama</label>
            <div className='col-sm-10'>
                <input type="text" className="form-control" id="nama" name="nama" onChange={this.handleTambahMahasiswa} />
            </div>
        </div>
        <div className='form-group row'>
            <label htmlFor="alamat" className='col-sm-2 col-form-label'>Alamat</label>
            <div className='col-sm-10'>
                <input type="text" className="form-control" id="alamat" name="alamat" onChange={this.handleTambahMahasiswa} />
            </div>
        </div>
        <div className='form-group row'>
            <label htmlFor="hp" className='col-sm-2 col-form-label'>Hp</label>
            <div className='col-sm-10'>
                <input type="text" className="form-control" id="hp" name="hp" onChange={this.handleTambahMahasiswa} />
            </div>
        </div>
        <div className='form-group row'>
            <label htmlFor="angkatan" className='col-sm-2 col-form-label'>Angkatan</label>
            <div className='col-sm-10'>
                <input type="text" className="form-control" id="angkatan" name="angkatan" onChange={this.handleTambahMahasiswa} />
            </div>
        </div>
        <div className='form-group row'>
            <label htmlFor="status" className='col-sm-2 col-form-label'>Status</label>
            <div className='col-sm-10'>
                <input type="text" className='form-control' id='status' name='status' onChange={this.handleTambahMahasiswa}></input>
            </div>
        </div>
        <button type='submit' className='btn btn-primary' onClick={this.handleTombolSimpan}>Simpan</button>
    </div>
    <h2>List Mahasiswa</h2>
    {
        this.state.ListMahasiswa.map(mahasiswa => {
            return <Mahasiswa key={mahasiswa.nim} nim={mahasiswa.nim} nama={mahasiswa.nama} alamat={mahasiswa.alamat} angkatan={mahasiswa.angkatan} hp={mahasiswa.hp} status={mahasiswa.status} id={mahasiswa.id} hapus={this.handleHapusMahasiswa} />
        })
    }
</div>
    )
  }
}

export default ListMahasiswa;