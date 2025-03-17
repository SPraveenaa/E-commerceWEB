import React, { useState } from "react";
import axios from "axios";
import { Form, Input, Select, InputNumber, DatePicker, Upload, Switch, Button, Row, Col, Typography } from "antd";
import { UploadOutlined } from "@ant-design/icons";

const { Title } = Typography;
const { Option } = Select;

const AddProduct = () => {
  const [product, setProduct] = useState({
    name: "",
    brand: "",
    description: "",
    price: "",
    category: "",
    stockQuantity: "",
    releaseDate: null,
    productAvailable: false,
  });
  const [image, setImage] = useState(null);

  const handleInputChange = (name, value) => {
    setProduct({ ...product, [name]: value });
  };

  const handleImageChange = (file) => {
    setImage(file);
  };

  const submitHandler = () => {
    const formData = new FormData();
    formData.append("imageFile", image);
    formData.append(
      "product",
      new Blob([JSON.stringify(product)], { type: "application/json" })
    );

    axios
      .post("http://localhost:8080/api/product", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })``
      .then((response) => {
        console.log("Product added successfully:", response.data);
        alert("Product added successfully");
      })
      .catch((error) => {
        console.error("Error adding product:", error);
        alert("Error adding product");
      });
  };

  return (
    <div style={{ padding: "30px", backgroundColor: "#f7f7f7", borderRadius: "8px" }}>
      <Title level={3} style={{ textAlign: "center", marginBottom: "20px" }}>
        Add New Product
      </Title>
      <Form
        layout="vertical"
        onFinish={submitHandler}
        style={{ maxWidth: "800px", margin: "0 auto" }}
      >
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item label="Name" required>
              <Input
                placeholder="Product Name"
                value={product.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Brand" required>
              <Input
                placeholder="Brand"
                value={product.brand}
                onChange={(e) => handleInputChange("brand", e.target.value)}
              />
            </Form.Item>
          </Col>
        </Row>
        <Form.Item label="Description" required>
          <Input.TextArea
            placeholder="Product Description"
            value={product.description}
            onChange={(e) => handleInputChange("description", e.target.value)}
            rows={3}
          />
        </Form.Item>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item label="Price ($)" required>
              <InputNumber
                placeholder="Price"
                value={product.price}
                onChange={(value) => handleInputChange("price", value)}
                style={{ width: "100%" }}
                min={0}
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Category" required>
              <Select
                placeholder="Select Category"
                value={product.category}
                onChange={(value) => handleInputChange("category", value)}
              >
                <Option value="Laptop">Laptop</Option>
                <Option value="Headphone">Headphone</Option>
                <Option value="Mobile">Mobile</Option>
                <Option value="Electronics">Electronics</Option>
                <Option value="Toys">Toys</Option>
                <Option value="Fashion">Fashion</Option>
              </Select>
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item label="Stock Quantity" required>
              <InputNumber
                placeholder="Stock Remaining"
                value={product.stockQuantity}
                onChange={(value) => handleInputChange("stockQuantity", value)}
                style={{ width: "100%" }}
                min={0}
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Release Date" required>
              <DatePicker
                style={{ width: "100%" }}
                value={product.releaseDate}
                onChange={(date) => handleInputChange("releaseDate", date)}
              />
            </Form.Item>
          </Col>
        </Row>
        <Form.Item label="Image">
          <Upload
            beforeUpload={(file) => {
              handleImageChange(file);
              return false;
            }}
            showUploadList={false}
          >
            <Button icon={<UploadOutlined />}>Upload Image</Button>
          </Upload>
        </Form.Item>
        <Form.Item label="Product Available">
          <Switch
            checked={product.productAvailable}
            onChange={(checked) => handleInputChange("productAvailable", checked)}
          />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" block>
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default AddProduct;