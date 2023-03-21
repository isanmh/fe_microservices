import axios from "axios";
import React, { useState } from "react";
import { Col, Container, Figure } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { Api, Url } from "../../config/Api";

const Create = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [image, setImage] = useState("");
  const [preview, setPreview] = useState();
  const [previewName, setPreviewName] = useState("");
  const [errors, setErrors] = useState([]);
  // react router dom navigation
  const navigate = useNavigate();

  // preview image
  const loadImage = (e) => {
    // console.log(e.target.files[0]);
    const img = e.target.files[0];
    setImage(img); // nama image
    setPreview(URL.createObjectURL(img)); // preview image
  };

  // api untuk post
  const saveContact = async (e) => {
    e.preventDefault();
    // console.log(name, email, phone, image);
    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("phone", phone);
    formData.append("image", image);
    try {
      await axios.post(Api, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Data Berhasil Ditambahkan",
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
        Form Add Contacts Employee
      </h3>
      <hr />
      <div className="mt-3 d-lg-flex flex-lg-row justify-content-between d-sm-flex flex-sm-column">
        {/* untuk form */}
        <Col className="col-lg-6">
          <form onSubmit={saveContact}>
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
              <Figure.Caption className="text-center">
                {image.name}
              </Figure.Caption>
            </Figure>
          ) : (
            <Figure>
              <Figure.Image
                src="assets/images/default_img.svg"
                width="100%"
                style={{ height: 300 }}
              />
              <Figure.Caption className="text-center">
                No Image - Please Insert Image
              </Figure.Caption>
            </Figure>
          )}
        </Col>
      </div>
    </Container>
  );
};

export default Create;
