import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../actions/productAction";
import ProductCard from "../components/ProductCard";
import { Button, Select, MenuItem, Grid, Pagination, Box } from "@mui/material";

const ProductList = ({ searchQuery }) => {
  const dispatch = useDispatch();
  const { products, total } = useSelector((state) => state.products);
  const [page, setPage] = useState(1);
  const [sortBy, setSortBy] = useState("price");
  const [order, setOrder] = useState("asc");
  const [quantities, setQuantities] = useState({});
  const limit = 10;

  useEffect(() => {
    dispatch(fetchProducts({ page, sortBy, order, limit }));
  }, [dispatch, page, sortBy, order]);

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const handleSortChange = (event) => {
    const selectedSort = event.target.value;
    setSortBy(selectedSort === "price-desc" ? "price" : selectedSort);
    setOrder(
      selectedSort === "createdAt"
        ? "desc"
        : selectedSort === "price-desc"
        ? "desc"
        : "asc"
    );
  };

  const handleAddAllToCart = () => {
    const userId = localStorage.getItem("userId") || "000000000000000000000000";
    if (!localStorage.getItem("userId")) {
      localStorage.setItem("userId", userId);
    }

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    Object.keys(quantities).forEach((productId) => {
      const quantity = quantities[productId];
      if (quantity > 0) {
        const existingProduct = cart.find(
          (item) => item.productId === productId
        );
        if (existingProduct) {
          existingProduct.quantity += quantity;
        } else {
          const product = products.find((p) => p._id === productId);
          cart.push({
            productId,
            quantity,
            name: product.name,
            price: product.price,
            imgLink: product.imageUrl,
          });
        }
      }
    });

    localStorage.setItem("cart", JSON.stringify(cart));

    // Trigger a custom event to notify Header
    window.dispatchEvent(new Event("cartUpdate"));

    alert("Products added to cart successfully!");
  };

  const handleQuantityChange = (productId, quantity) => {
    setQuantities((prev) => ({ ...prev, [productId]: quantity }));
  };

  // Filter products based on search query
  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Fill empty slots on the last page
  const filledProducts = [...filteredProducts];
  while (filledProducts.length < limit) {
    filledProducts.push({ _id: `placeholder-${filledProducts.length}`, placeholder: true });
  }

  return (
    <div style={{ padding: "20px" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "20px",
        }}
      >
        <h2 style={{ margin: 0 }}>Products</h2>
        <div style={{ display: "flex", gap: "10px" }}>
          <Select
            value={sortBy === "price" && order === "desc" ? "price-desc" : sortBy}
            onChange={handleSortChange}
            style={{ width: "200px" }}
          >
            <MenuItem value="createdAt">Last added</MenuItem>
            <MenuItem value="price">Price: low to high</MenuItem>
            <MenuItem value="price-desc">Price: high to low</MenuItem>
          </Select>
          <Button
            variant="contained"
            color="primary"
            onClick={handleAddAllToCart}
          >
            Add Product
          </Button>
        </div>
      </div>
      <Grid container spacing={2}>
        {filledProducts.map((product) =>
          product.placeholder ? (
            <Grid
              item
              xs={12}
              sm={6}
              md={4}
              lg={2.4}
              key={product._id}
              style={{
                display: "flex",
                justifyContent: "center",
                opacity: 0,
              }}
            >
              <Box style={{ width: "242px", height: "380px" }} />
            </Grid>
          ) : (
            <Grid
              item
              xs={12}
              sm={6}
              md={4}
              lg={2.4}
              key={product._id}
              style={{ display: "flex", justifyContent: "center" }}
            >
              <ProductCard
                product={product}
                onQuantityChange={handleQuantityChange}
              />
            </Grid>
          )
        )}
      </Grid>
      <Pagination
        count={Math.ceil(total / limit)}
        page={page}
        onChange={handlePageChange}
        style={{
          marginTop: "20px",
          display: "flex",
          justifyContent: "center",
        }}
      />
    </div>
  );
};

export default ProductList;