import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

import "./products.css";

export default function Products({ user, setUser }) {
  let [review, setReview] = useState("");
  let [rating, setRating] = useState("");
  let [products, setProducts] = useState([]);
  let [items, setItems] = useState([]);
  let [all, setAll] = useState([]);

  function handleDelete() {
    fetch("https://gadgets-production.up.railway.app/logout", {
      method: "DELETE",
      mode: "cors",
    }).then((res) => {
      if (res.ok) {
        setUser(null);
      }
    });
  }

  useEffect(() => {
    fetch("https://gadgets-production.up.railway.app/products")
      .then((res) => res.json())
      .then((res) => {
        setProducts(res);
      });
  }, []);

  useEffect(() => {
    fetch("https://gadgets-production.up.railway.app/reviews")
      .then((res) => res.json())
      .then((res) => {
        setAll(res);
      });
  }, []);

  let dis_all = all.map((item) => {
    return (
      <div className="review" key={item.id}>
        {item.comment}
      </div>
    );
  });

  console.log(all);

  let render_products = products.map((product) => {
    return (
      <div
        className="product-card"
        onClick={() => {
          setItems(product);
        }}
      >
        <span className="product-card-image">
          <img src={product.image_url} alt="product" />
        </span>
        <span className="product-card-name">{product.title}</span>
        <span className="product-card-desc">{product.description}</span>
        <span className="product-card-buttons">
          <button className="price">Ksh{product.price}</button>
          <button className="add-to-cart">View</button>
        </span>
      </div>
    );
  });

  function handleReview(e) {
    e.preventDefault();
    fetch("https://gadgets-production.up.railway.app/reviews", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user_id: user.id,
        comment: review,
        rating,
        product_id: items.id,
      }),
    }).then((r) => {
      if (r.ok) {
        r.json().then((user) => {
          console.log("success", user);
        });
      } else {
        r.json().then((err) => console.log("failed", err));
      }
    });
  }

  let prod_view = [items].map((item) => {
    return (
      <section id="products-view" key={item.id}>
        <span className="product-view-name">{item.title}</span>
        <span className="product-view-image">
          <img src={item.image_url} alt={item.title} />
        </span>
        <span className="product-view-cats">
          <button className="product-view-category">{item.category}</button>
          <button className="product-view-category">Ksh{item.price}</button>
          <button className="product-view-category">
            Quantity{item.quantity}
          </button>
        </span>
        <span className="product-view-desc">{item.description}</span>
        <div className="product-view-reviews">{dis_all}</div>
        <form className="product-view-add" onSubmit={handleReview}>
          <input
            type="number"
            placeholder="enter rating"
            value={rating}
            onChange={(e) => setRating(e.target.value)}
          />
          <textarea
            type="text"
            placeholder="Add review"
            value={review}
            onChange={(e) => setReview(e.target.value)}
          />
          <button type="submit">Add review</button>
        </form>
      </section>
    );
  });

  function ProdCont() {
    return (
      <main id="products">
        <main id="product-main-title">
          <button id="logout" onClick={handleDelete}>
            Logout
          </button>
        </main>

        {/* <section id="peoduct-create">
          <form id="product-form" onSubmit={handleProduct}>
            <div id="form-title">Post Product</div>

            <span>
              <label>Name of product?</label>
              <input
                type="text"
                name="name"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </span>
            <span>
              <label>Product description</label>
              <input
                type="text"
                name="name"
                required
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </span>
            <span>
              <label>Price of product</label>
              <input
                type="number"
                name="number"
                required
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </span>

            <span>
              <label>Number of products</label>
              <input
                type="number"
                name="number"
                required
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
              />
            </span>
            <span>
              <label>Image url of the product.</label>
              <input
                type="text"
                name="name"
                required
                value={image_url}
                onChange={(e) => setImage_url(e.target.value)}
              />
            </span>
            <button type="submit">Post Product</button>
          </form>
        </section> */}

        <section id="products-title">
          <div className="product-title">Top products</div>
          {/* <form id="search">
            <input type="text" placeholder="Search..." />
            <button type="submit">Search</button>
          </form> */}
        </section>

        <section id="products-container">
          <section id="products-list">{render_products}</section>
          {prod_view}
        </section>
      </main>
    );
  }

  function ProdError() {
    return <main id="prod-error">Please login or create an account</main>;
  }

  // return <>{user ? <ProdCont /> : <ProdError />}</>;
  return <>{user ? <ProdCont /> : <ProdCont />}</>;
}
