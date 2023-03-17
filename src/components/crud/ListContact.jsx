import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { Api, Url } from "../../config/Api";

const ListContact = () => {
  // untuk menampung data contact
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  // ambil data dari API
  const getData = async () => {
    const res = await axios.get(Api);
    console.log(res.data.data);
    setContacts(res.data.data);
  };

  // hapus data
  const deleteContact = async (contactId) => {
    try {
      await Swal.fire({
        title: "Apkah anda yakin?",
        text: "Data yang dihapus tidak bisa dikembalikan!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      }).then(async (result) => {
        if (result.isConfirmed) {
          await axios.delete(`${Api}/${contactId}`);
          getData();
          Swal.fire("Deleted!", "File anda berhasil dihapus", "success");
        }
      });
    } catch (error) {
      // console.log(error);
      Swal.fire("Error!", "File anda gagal dihapus", "error");
    }
  };

  return (
    <Container>
      <div className="d-flex justify-content-between align-items-center">
        <h1 className="text-primary">List Contact</h1>
        <Link className="btn btn-primary my-3" to={"/create"}>
          Add Contact
        </Link>
      </div>
      <hr />
      <Row>
        {contacts.map((item) => (
          <div className="col-md-4" key={item.id}>
            <div className="card mb-4 shadow">
              <div className="card-body">
                <div className="card-img-top">
                  <img
                    src={`${Url}/${item.image}`}
                    alt={item.image}
                    style={{ height: 200 }}
                    width="100%"
                  />
                </div>
                <h5 className="card-title">{item.name}</h5>
                <small className="card-text">{item.email}</small>
                <p className="card-text">{item.phone}</p>
                <div className="d-flex justify-content-between align-items-center">
                  <div className="btn-group">
                    <Link
                      to={`/edit/${item.id}`}
                      className="btn btn-sm btn-outline-secondary"
                    >
                      Edit
                    </Link>
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => deleteContact(item.id)}
                    >
                      Delete
                    </Button>
                  </div>
                  <small className="text-muted">{item.id}</small>
                </div>
              </div>
            </div>
          </div>
        ))}
      </Row>
    </Container>
  );
};

export default ListContact;
