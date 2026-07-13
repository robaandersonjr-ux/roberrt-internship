import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const TopSellers = () => {
  const [sellers, setSellers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://us-central1-nft-cloud-functions.cloudfunctions.net/topSellers")
      .then((res) => res.json())
      .then((data) => {
        setSellers(data);
        setLoading(false);
      });
  }, []);

  const skeletonItems = new Array(12).fill(0);

  return (
    <section id="section-popular" className="pb-5">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <h2>Top Sellers</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>
          <div className="col-md-12">
            <ol className="author_list">
              {loading
                ? skeletonItems.map((_, index) => (
                    <li key={index} data-aos="fade-up" data-aos-delay={index * 50}>
                      <div className="author_list_pp">
                        <div
                          className="skeleton-box"
                          style={{
                            width: "50px",
                            height: "50px",
                            borderRadius: "50%",
                          }}
                        ></div>
                      </div>
                      <div className="author_list_info">
                        <div
                          className="skeleton-box"
                          style={{
                            width: "100px",
                            height: "14px",
                            marginBottom: "6px",
                          }}
                        ></div>
                        <div
                          className="skeleton-box"
                          style={{ width: "60px", height: "12px" }}
                        ></div>
                      </div>
                    </li>
                  ))
                : sellers.map((seller, index) => (
    <li key={index} data-aos="fade-up" data-aos-delay={index * 50}>
                      <div className="author_list_pp">
                        <Link to={`/author/${seller.authorId}`}>
                          <img
                            className="lazy pp-author"
                            src={seller.authorImage}
                            alt={seller.authorName}
                          />
                          <i className="fa fa-check"></i>
                        </Link>
                      </div>
                      <div className="author_list_info">
                        <Link to={`/author/${seller.authorId}`}>
                          {seller.authorName}
                        </Link>
                        <span>{seller.price} ETH</span>
                      </div>
                    </li>
                  ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TopSellers;