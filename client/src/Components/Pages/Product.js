import "bootstrap/dist/css/bootstrap.min.css";
import { Form, Row } from "react-bootstrap";
// import { useState } from 'react';
import axios from "axios";
import LoadingSpinner from "./LoadingSpinner";
import Table from "react-bootstrap/Table";
// import Button from 'react-bootstrap/Button';
import React, { useState, useEffect } from "react";
import { MDBCol } from "mdbreact";
import NavbarElem from "./Navbar";
import "./Product.css";

function ProductFunc(props) {
  const [data, setData] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [productName, setProductName] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [category, setCategory] = useState("");
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
  const [Image, setImage] = useState(null);
  const [toggleSubmit, setToggleSubmit] = useState(true);
  const [isEditedItem, setIsEditedItem] = useState(null);

  // const [productID, setProductId] = useState()

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formdata = new FormData();
    formdata.append("image", Image);
    formdata.append("UserId", user.id);
    formdata.append("productName", productName);
    formdata.append("productPrice", productPrice);
    formdata.append("category", category);

    setLoading(true);
    // jo backend se data aayega usko rakhega wo
    await axios
      .post("http://localhost:4500/addProducts", formdata, {
        headers: {
          "content-type": "multipart/form-data",
          Authorization: localStorage.getItem("token"),
        },
      })
      .then((res) => {
        if(res){
          console.log(res);
          fetchInfo();
          setLoading(false);
        }
        else{
          console.log("there is no response")
        }
      })
      .catch(() => {
        console.log("err");
        setLoading(false);
      });

    setTimeout(() => {
      setLoading(false);
    }, 2000);
  };

  const fetchInfo = () => {
    return axios
      .get(`http://localhost:4500/getProducts/${user.id}`)
      .then((response) => {
        console.log(response.data);
        setData(response.data.data);
      
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetchInfo();
  }, []);

  const handleDelete = async (id) => {
    try {
      const res = await axios.delete(
        `http://localhost:4500/deleteProduct/${id}`,
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      );
      fetchInfo();
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    handleDelete();
  }, []);

  useEffect(() => {
    const searchProduct = async () => {
      try {
        const res = await axios.get(
          `http://localhost:4500/searchapi?userId=${
            user.id
          }&productName=${searchInput.toLowerCase()}`
        );
        setData(res.data.products);
      } catch (error) {
        console.log(error);
      }
    };
    searchProduct();
  }, [searchInput]);

  const handleEdit = (id) => {
    const newEditedItems = data.find((obj) => {
      return obj.id ===id;
    });
    // console.log("edited product:", newEditedItems);
    setToggleSubmit(false);
    setProductName(newEditedItems.productName)
    setProductPrice(newEditedItems.productPrice)
    setCategory(newEditedItems.category)
    setIsEditedItem(id)
  };
  const doEdit = async(e)=> {

    e.preventDefault()
    const formdata = new FormData();
    formdata.append("image", Image);
    formdata.append("productName", productName);
    formdata.append("productPrice", productPrice);
    formdata.append("category", category);
    try {
      const edit =  await axios.post(`http://localhost:4500/edit/${isEditedItem}`,formdata,{
        headers: {
          "content-type": "multipart/form-data",
          Authorization: localStorage.getItem("token"),
        },
      })
      fetchInfo();
      
      console.log("edit:",edit)
    } catch (error) {
      console.log(error)
    }
       
       
  }

  return (
    <div>
      <NavbarElem />

      <div className="addProducts">
        <form className="container mt-3 mb-3 " onSubmit={toggleSubmit?handleSubmit:doEdit}>
          <Row className="mb-3">
            <Form.Group
              controlId="formBasicEmail"
              className="col col-sm-4 input"
            >
              <Form.Label className="txt">Product Name</Form.Label>
              <Form.Control
                type="name"
                name="first_name"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
                className="form-control"
              />
            </Form.Group>
            <Form.Group
              controlId="formBasicEmail"
              className="col col-sm-4 input"
            >
              <Form.Label className="txt">Product Price</Form.Label>
              <Form.Control
                type="number"
                name="last_name"
                value={productPrice}
                onChange={(e) => setProductPrice(e.target.value)}
                className="form-control"
              />
            </Form.Group>

            <Form.Group
              controlId="formGridCheckbox"
              className="col col-sm-2 input"
            >
              <Form.Label className="txt">Category</Form.Label>
              <Form.Select
                defaultValue="Choose..."
                className="form-control"
                name="menu"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="Choose...">Choose...</option>
                <option value="HouseKeeping">HouseKeeping</option>
                <option value="Kirana">Kirana</option>
                <option value="Medical">Medical</option>
                <option value="Ecommerce">Ecommerce</option>
              </Form.Select>
            </Form.Group>

            <Form.Group
              controlId="formBasicEmail"
              className="col col-sm-4 input"
            >
              <input
                class="form-control
                form-control-sm"
                id="SmallFile"
                type="file"
                name="profileImage"
                
                onChange={(e) => setImage(e.target.files[0])}
              />
            </Form.Group>
            <center>
              {loading ? <LoadingSpinner /> : fetchInfo}
              {toggleSubmit ? (
                <button
                  type="submit"
                  class="btn btn-primary btn-sm col col-sm-1.5"
                  disabled={loading}
                >
                  Add product
                </button>
              ) : (
                <button
                  type="submit"
                  class="btn btn-primary btn-sm col col-sm-1.5"
                  disabled={loading}
                >
                  Edit product
                </button>
              )}
            </center>
          </Row>
        </form>
      </div>

      <div className="App">
        <div className="searchProducts">
          <center>
            <MDBCol md="6">
              <label className="txt">search your product</label>
              <input
                className="form-control input"
                type="text"
                placeholder="Search"
                onChange={(e) => setSearchInput(e.target.value)}
                value={searchInput}
                aria-label="Search"
              />
              <button
                type="button"
                className="btn btn-primary input "
                onClick={(e) => setSearchInput("")}
              >
                Clear
              </button>
            </MDBCol>
          </center>
        </div>

        <section style={{ backgroundColor: "#eee;" }}>
          <div class="text-center  container py-5">
            <h4 class="mt-4 mb-5">
              <strong>your selected Product</strong>
            </h4>

            <div class="row showProducts">
              {data.length > 0 &&
                data.map((dataObj) => (
                  <div
                    class="card col-lg-3 col-sm-6 m-2"
                    style={{ position: "relative" }}
                  >
                    <div
                      class="bg-image hover-zoom ripple ripple-surface ripple-surface-light"
                      data-mdb-ripple-color="light"
                    >
                      <img src={dataObj.image} class="w-100" alt="jk" />
                      <button
                        class="btn btn-danger"
                        onClick={() => handleDelete(dataObj.id)}
                        style={{
                          fontSize: "0.8rem",
                          fontWeight: 800,
                          cursor: "pointer",
                          position: "absolute",
                          right: "0.5rem",
                          bottom: 0,
                        }}
                      >
                        Delete product
                      </button>
                      <div class="mask"></div>
                      <div class="hover-overlay">
                        <div
                          class="mask"
                          style={{
                            backgroundColor: "rgba(251, 251, 251, 0.15);",
                          }}
                        ></div>
                        <button
                          type="button"
                          class="btn btn-primary"
                          onClick={() => handleEdit(dataObj.id)}
                          style={{
                            fontSize: "0.8rem",
                            fontWeight: 800,
                            cursor: "pointer",
                            position: "absolute",
                            left: "0.5rem",
                            bottom: 0,
                          }}
                        >
                          Edit product
                        </button>
                      </div>
                    </div>
                    <div class="card-body">
                      <h5 class="card-title mb-3">{dataObj.productName}</h5>
                      <p>{dataObj.category}</p>

                      <h6 class="mb-3">{dataObj.productPrice}</h6>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default ProductFunc;
