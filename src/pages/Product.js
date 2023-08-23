import React, { useState, useEffect } from "react";
import axios from "axios";

const Product = () => {
  const [products, setProducts] = useState(null);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [pageCount, setPageCount] = useState(0);
  const [itemsPerPage, setitemsPerPage] = useState(0);
  const apiUrl = "https://www.demaisondecor.com/wp-json/wp/v3/allProducts";
  const consumerKey = "ck_7040550e1e0a43ed88ee1fab59796aed4bc2d130";
  const consumerSecret = "cs_1b71771605658203ece9808f686d2d4953c9cb7e";

  const fetchProducts = async (pageNumber) => {
    try {
      const response = await axios.post(apiUrl, {
        auth: {
          username: consumerKey,
          password: consumerSecret
        },
        page: pageNumber // Pass the page number as a parameter to the API
      });
      setProducts(response.data.product);
      setTotalCount(response.data.tcount);
      setPageCount(response.data.pagecount);
      setitemsPerPage(response.data.perpage);
      setCurrentPage(pageNumber); // Update the current page state
    } catch (error) {
      setError("Error fetching data");
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    if (!products) {
      fetchProducts(currentPage);
    }
    //fetchProducts(currentPage);
  }, [currentPage]);
  //console.log(products);
  // Function to truncate the product name to 20 characters
  const truncateProductName = (name) => {
    if (name.length > 20) {
      return name.slice(0, 20) + "...";
    }
    return name;
  };

  useEffect(() => {
    fetchProducts(currentPage); // Fetch data when the component mounts and whenever the currentPage state changes
  }, [currentPage]);

  const targetElement = document.querySelector(".newdata");
  const yOffset = -140;
  const handlePageChange = (pageNumber) => {
    fetchProducts(pageNumber); // Fetch new data when the pagination button is clicked with the selected page number
    scrollToElement(targetElement, yOffset);
  };
  const scrollToElement = (element, yOffset) => {
    const yCoordinate =
      element.getBoundingClientRect().top + window.pageYOffset;
    window.scrollTo({
      top: yCoordinate + yOffset,
      behavior: "smooth" // Add smooth scrolling animation
    });
  };

  const renderPaginationButtons = () => {
    if (!products) {
      return null;
    }
    const totalPages = Math.ceil(totalCount / itemsPerPage);

    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(i);
    }

    return (
      <ul className="pagination justify-content-center">
        {pageNumbers.map((number) => (
          <li
            key={number}
            className={`page-item${currentPage === number ? " active" : ""}`}
          >
            <button
              className="page-link"
              onClick={() => handlePageChange(number)}
            >
              {number}
            </button>
          </li>
        ))}
      </ul>
    );
  };

  return (
    <div>
      <h2>Product List</h2>

      {error && <p>{error}</p>}
      {!products ? (
        <p>Loading...</p>
      ) : (
        <div className="row newdata">
          <p>Total Count: {totalCount}</p>
          <p>Page Count: {pageCount}</p>
          {products.map((product) => (
            <div key={product.ID} className="col-md-3 mb-3">
              <div className="card">
                <img
                  src={product.image}
                  alt={product.name}
                  className="card-img-top"
                />
                <div className="card-body">
                  <h5 className="card-title">
                    {truncateProductName(product.name)}
                  </h5>
                  <p className="card-text">Price (Rs) : {product.prices}</p>
                </div>
              </div>
            </div>
          ))}
          {renderPaginationButtons()}
        </div>
      )}
    </div>
  );
};

export default Product;
