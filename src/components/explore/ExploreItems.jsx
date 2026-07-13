import React, { useEffect, useState, useCallback } from "react";
import { Link } from "react-router-dom";

const Countdown = ({ expiryDate }) => {
  const calcTime = () => {
    const diff = expiryDate - Date.now();
    if (diff <= 0) return null;
    const h = Math.floor(diff / 3600000);
    const m = Math.floor((diff % 3600000) / 60000);
    const s = Math.floor((diff % 60000) / 1000);
    return `${h}h ${m}m ${s}s`;
  };

 const calcTime = useCallback(() => {
    const diff = expiryDate - Date.now();
    if (diff <= 0) return null;
    const h = Math.floor(diff / 3600000);
    const m = Math.floor((diff % 3600000) / 60000);
    const s = Math.floor((diff % 60000) / 1000);
    return `${h}h ${m}m ${s}s`;
  }, [expiryDate]);

  if (!time) return null;
  return <div className="de_countdown">{time}</div>;
};

const ExploreItems = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("");
  const [visibleCount, setVisibleCount] = useState(8);

  useEffect(() => {
    setLoading(true);
    setVisibleCount(8);
    const url = filter
      ? `https://us-central1-nft-cloud-functions.cloudfunctions.net/explore?filter=${filter}`
      : `https://us-central1-nft-cloud-functions.cloudfunctions.net/explore`;

    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setItems(data);
        setLoading(false);
      });
  }, [filter]);

  const skeletonItems = new Array(8).fill(0);

  return (
    <>
      <div>
        <select
          id="filter-items"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="">Default</option>
          <option value="price_low_to_high">Price, Low to High</option>
          <option value="price_high_to_low">Price, High to Low</option>
          <option value="likes_high_to_low">Most Liked</option>
        </select>
      </div>

      {loading
        ? skeletonItems.map((_, index) => (
            <div
              key={index}
              className="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12"
              style={{ display: "block" }}
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
        : items.slice(0, visibleCount).map((item, index) => (
            <div
              key={index}
              className="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12"
              style={{ display: "block" }}
            >
              <div className="nft__item">
                <div className="author_list_pp">
                  <Link
                    to={`/author/${item.authorId}`}
                    data-bs-toggle="tooltip"
                    data-bs-placement="top"
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

      {!loading && visibleCount < items.length && (
        <div className="col-md-12 text-center">
          <button
            onClick={() => setVisibleCount((prev) => prev + 4)}
            className="btn-main lead"
          >
            Load more
          </button>
        </div>
      )}
    </>
  );
};

export default ExploreItems;