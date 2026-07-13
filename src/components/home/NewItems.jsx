import React, { useEffect, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";

const calcTime = useCallback(() => {
    const diff = expiryDate - Date.now();
    if (diff <= 0) return null;
    const h = Math.floor(diff / 3600000);
    const m = Math.floor((diff % 3600000) / 60000);
    const s = Math.floor((diff % 60000) / 1000);
    return `${h}h ${m}m ${s}s`;
  }, [expiryDate]);

  const [time, setTime] = useState(calcTime);

  useEffect(() => {
    const timer = setInterval(() => {
      const t = calcTime();
      setTime(t);
      if (!t) clearInterval(timer);
    }, 1000);
    return () => clearInterval(timer);
  }, []);
}, [calcTime]);

  if (!time) return null;
  return <div className="de_countdown">{time}</div>;
};

const NewItems = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://us-central1-nft-cloud-functions.cloudfunctions.net/newItems")
      .then((res) => res.json())
      .then((data) => {
        setItems(data);
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
    <section id="section-items" className="no-bottom">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center" data-aos="fade-in">
              <h2>New Items</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>

          {loading ? (
            skeletonItems.map((_, index) => (
              <div
                className="col-lg-3 col-md-6 col-sm-6 col-xs-12"
                key={index}
              >
                <div className="nft__item">
                  <div className="author_list_pp">
                    <div
                      className="skeleton-box"
                      style={{ width: "50px", height: "50px", borderRadius: "50%" }}
                    ></div>
                  </div>
                  <div
                    className="skeleton-box"
                    style={{ height: "220px", borderRadius: "8px", marginBottom: "12px" }}
                  ></div>
                  <div
                    className="skeleton-box"
                    style={{ width: "140px", height: "16px", marginBottom: "8px" }}
                  ></div>
                  <div
                    className="skeleton-box"
                    style={{ width: "80px", height: "14px" }}
                  ></div>
                </div>
              </div>
            ))
          ) : (
            <OwlCarousel className="owl-theme" {...owlOptions}>
              {items.map((item) => (
                <div className="item" key={item.id}>
                  <div className="nft__item">
                    <div className="author_list_pp">
                      <Link
                        to={`/author/${item.authorId}`}
                        data-bs-toggle="tooltip"
                        data-bs-placement="top"
                        title={`Creator: ${item.authorId}`}
                      >
                        <img className="lazy" src={item.authorImage} alt="" />
                        <i className="fa fa-check"></i>
                      </Link>
                    </div>

                    {item.expiryDate && (
                      <Countdown expiryDate={item.expiryDate} />
                    )}

                    <div className="nft__item_wrap">
                      <div className="nft__item_extra">
                        <div className="nft__item_buttons">
                          <button>Buy Now</button>
                          <div className="nft__item_share">
                            <h4>Share</h4>
                            <button type="button" className="social-icon-btn">
  <i className="fab fa-facebook fa-lg"></i>
</button>
<button type="button" className="social-icon-btn">
 <i className="fab fa-twitter fa-lg"></i>
</button>
<button type="button" className="social-icon-btn">
 <i className="fas fa-envelope fa-lg"></i>
</button>
                          </div>
                        </div>
                      </div>
                      <Link to={`/item-details/${item.nftId}`}>
                        <img
                          src={item.nftImage}
                          className="lazy nft__item_preview"
                          alt={item.title}
                        />
                      </Link>
                    </div>

                    <div className="nft__item_info">
                      <Link to={`/item-details/${item.nftId}`}>
                        <h4>{item.title}</h4>
                      </Link>
                      <div className="nft__item_price">{item.price} ETH</div>
                      <div className="nft__item_like">
                        <i className="fa fa-heart"></i>
                        <span>{item.likes}</span>
                      </div>
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

export default NewItems;