import React from "react";

const Mahasiswa = (props) => {
    return(
        <div className="mhs">
            <div className="foto-mhs">
                <img src="http://placeimg.com/90/90/people" alt="Foto Mhs" />
            </div>
            <div className="data-mhs">
                <div className="nim-mhs">NIM : {props.nim}</div>
                <p className="isi-mhs">Nama  : {props.nama}</p>
                <p className="isi-mhs">Alamat : {props.alamat}</p>
                <p className="isi-mhs">No.HP : {props.hp}</p>
                <p className="isi-mhs">Angkatan : {props.angkatan}</p>
                <p className="isi-mhs">Status : {props.status}</p>
                <button className="btn btn-sm btn-warning" onClick={() => props.hapus(props.id)}>Hapus</button>
        </div>
        </div>
    )
}

export default Mahasiswa;