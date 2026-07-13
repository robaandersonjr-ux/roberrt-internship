import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const AuthorItems = ({ authorId }) => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(
      `https://us-central1-nft-cloud-functions.cloudfunctions.net/authors?author=${authorId}`
    )
      .then((res) => res.json())
      .then((data) => {
        setItems(data.nftCollection || []);
        setLoading(false);
      });
  }, [authorId]);

  const skeletonItems = new Array(8).fill(0);

  return (
    <div className="de_tab_content">
      <div className="tab-1">
        <div className="row">
          {loading
            ? skeletonItems.map((_, index) => (
                <div
                  className="col-lg-3 col-md-6 col-sm-6 col-xs-12"
                  key={index}
                >
                  <div className="nft__item">
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
                    <div
                      className="skeleton-box"
                      style={{
                        height: "220px",
                        borderRadius: "8px",
                        marginBottom: "12px",
                      }}
                    ></div>
                    <div
                      className="skeleton-box"
                      style={{
                        width: "140px",
                        height: "16px",
                        marginBottom: "8px",
                      }}
                    ></div>
                    <div
                      className="skeleton-box"
                      style={{ width: "80px", height: "14px" }}
                    ></div>
                  </div>
                </div>
              ))
            : items.map((item, index) => (
                <div
                  className="col-lg-3 col-md-6 col-sm-6 col-xs-12"
                  key={index}
                >
                  <div className="nft__item">
                    <div className="author_list_pp">
                      <Link to={`/author/${authorId}`}>
                        <img
                          className="lazy"
                          src={item.authorImage}
                          alt=""
                        />
                        <i className="fa fa-check"></i>
                      </Link>
                    </div>
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
        </div>
      </div>
    </div>
  );
};

export default AuthorItems;