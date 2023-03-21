import axios from "axios";
import React, { useEffect, useState } from "react";
import { Col, Container, Figure } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import { Api, Url } from "../../config/Api";

const Edit = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [image, setImage] = useState("");
  const [preview, setPreview] = useState();
  const [errors, setErrors] = useState([]);
  // react router dom navigation
  const navigate = useNavigate();
  // ambil params id
  const { id } = useParams();

  useEffect(() => {
    getDataId();
  }, []);

  const getDataId = async () => {
    const res = await axios.get(`${Api}/${id}`);
    setName(res.data.data.name);
    setEmail(res.data.data.email);
    setPhone(res.data.data.phone);
    setImage(res.data.data.image);
    setPreview(`${Url}/${res.data.data.image}`);
  };

  // preview image
  const loadImage = (e) => {
    // console.log(e.target.files[0]);
    const img = e.target.files[0];
    setImage(img); // nama image
    setPreview(URL.createObjectURL(img)); // preview image
  };

  // api untuk post
  const updateContact = async (e) => {
    e.preventDefault();
    // console.log(name, email, phone, image);
    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("phone", phone);
    formData.append("image", image);
    try {
      await axios.put(`${Api}/${id}`, formData);
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Data Berhasil Diubah",
        showConfirmButton: true,
        // timer: 1500,
      });
      navigate("/contacts");
    } catch (error) {
      console.log(error.response.data.errors); // 422
      if (error.response.status === 422) {
        setErrors(error.response.data.errors);
      }
    }
  };

  return (
    <Container>
      <h3 className="text-center my-3 text-primary">
        Form Edit Contacts Employee
      </h3>
      <hr />
      <div className="mt-3 d-lg-flex flex-lg-row justify-content-between d-sm-flex flex-sm-column">
        {/* untuk form */}
        <Col className="col-lg-6">
          <form onSubmit={updateContact}>
            <div className="form-group">
              <label htmlFor="name">Full Name</label>
              <input
                type="text"
                className="form-control"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              {errors.length > 0 ? (
                <div className="text-danger">
                  {errors.map((error, i) => (
                    <small key={i}>
                      {error.param === "name" ? error.msg + ", " : ""}
                    </small>
                  ))}
                </div>
              ) : (
                ""
              )}
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="text"
                className="form-control"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              {errors.length > 0 ? (
                <div className="text-danger">
                  {errors.map((error, i) => (
                    <small key={i}>
                      {error.param === "email" ? error.msg + ", " : ""}
                    </small>
                  ))}
                </div>
              ) : (
                ""
              )}
            </div>
            <div className="form-group">
              <label htmlFor="phone">Phone</label>
              <input
                type="text"
                className="form-control"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
              {errors.length > 0 ? (
                <div className="text-danger">
                  {errors.map((error, i) => (
                    <small key={i}>
                      {error.param === "phone" ? error.msg + ", " : ""}
                    </small>
                  ))}
                </div>
              ) : (
                ""
              )}
            </div>
            <div className="form-group">
              <label htmlFor="image">Image</label>
              <input
                type="file"
                className="form-control"
                onChange={loadImage}
              />
            </div>
            <button className="btn btn-primary my-3">Submit</button>
          </form>
        </Col>
        {/* image preview */}
        <Col className="col-lg-5">
          {preview ? (
            <Figure>
              <Figure.Image
                src={preview}
                width="100%"
                style={{ height: 300 }}
              />
              <Figure.Caption className="text-center">{preview}</Figure.Caption>
            </Figure>
          ) : (
            ""
          )}
        </Col>
      </div>
    </Container>
  );
};

export default Edit;
