import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";

const HotCollections = () => {
  const [collections, setCollections] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections")
      .then((res) => res.json())
      .then((data) => {
        setCollections(data);
        setLoading(false);
      });
  }, []);

  const skeletonItems = new Array(4).fill(0);

  const owlOptions = {
    loop: true,
    margin: 10,
    nav: true,
    dots: false,
    responsive: {
      0: { items: 1 },
      600: { items: 2 },
      900: { items: 3 },
      1200: { items: 4 },
    },
  };

  return (
    <section id="section-collections" className="no-bottom">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center" data-aos="fade-in"> 
              <h2>Hot Collections</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>

          {loading ? (
            skeletonItems.map((_, index) => (
              <div
                className="col-lg-3 col-md-6 col-sm-6 col-xs-12"
                key={index}
              >
                <div className="nft_coll">
                  <div className="nft_wrap">
                    <div className="skeleton-box" style={{ height: "200px", borderRadius: "8px" }}></div>
                  </div>
                  <div className="nft_coll_pp">
                    <div className="skeleton-box" style={{ width: "50px", height: "50px", borderRadius: "50%" }}></div>
                  </div>
                  <div className="nft_coll_info">
                    <div className="skeleton-box" style={{ width: "120px", height: "16px", marginBottom: "8px" }}></div>
                    <div className="skeleton-box" style={{ width: "80px", height: "12px" }}></div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <OwlCarousel className="owl-theme" {...owlOptions}>
              {collections.map((item) => (
                <div className="item" key={item.id}>
                  <div className="nft_coll">
                    <div className="nft_wrap">
                      <Link to={`/item-details/${item.nftId}`}>
                        <img
                          src={item.nftImage}
                          className="lazy img-fluid"
                          alt={item.title}
                        />
                      </Link>
                    </div>
                    <div className="nft_coll_pp">
                      <Link to={`/author/${item.authorId}`}>
                        <img
                          className="lazy pp-coll"
                          src={item.authorImage}
                          alt=""
                        />
                      </Link>
                      <i className="fa fa-check"></i>
                    </div>
                    <div className="nft_coll_info">
                      <Link to="/explore">
                        <h4>{item.title}</h4>
                      </Link>
                      <span>ERC-{item.code}</span>
                    </div>
                  </div>
                </div>
              ))}
            </OwlCarousel>
          )}
        </div>
      </div>
    </section>
  );
};

export default HotCollections;