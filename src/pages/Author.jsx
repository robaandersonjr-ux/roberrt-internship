import React, { useEffect, useState } from "react";
import AuthorBanner from "../images/author_banner.jpg";
import AuthorItems from "../components/author/AuthorItems";
import { Link, useParams } from "react-router-dom";

const Author = () => {
  const { authorId } = useParams();
  const [author, setAuthor] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(
      `https://us-central1-nft-cloud-functions.cloudfunctions.net/authors?author=${authorId}`
    )
      .then((res) => res.json())
      .then((data) => {
        setAuthor(data);
        setLoading(false);
      });
  }, [authorId]);

  const handleCopy = () => {
    if (author?.walletAddress) {
      navigator.clipboard.writeText(author.walletAddress);
    }
  };

  return (
    <div id="wrapper">
      <div className="no-bottom no-top" id="content">
        <div id="top"></div>

        <section
          id="profile_banner"
          aria-label="section"
          className="text-light"
          style={{ background: `url(${AuthorBanner}) top` }}
        ></section>

        <section aria-label="section">
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <div className="d_profile de-flex">
                  <div className="de-flex-col">
                    <div className="profile_avatar">
                      {loading ? (
                        <>
                          <div
                            className="skeleton-box"
                            style={{
                              width: "150px",
                              height: "150px",
                              borderRadius: "50%",
                            }}
                          ></div>
                          <div className="profile_name">
                            <h4>
                              <div
                                className="skeleton-box"
                                style={{
                                  width: "160px",
                                  height: "20px",
                                  marginBottom: "8px",
                                }}
                              ></div>
                              <div
                                className="skeleton-box"
                                style={{ width: "120px", height: "14px" }}
                              ></div>
                            </h4>
                          </div>
                        </>
                      ) : (
                        <>
                          <img src={author.authorImage} alt={author.authorName} />
                          <i className="fa fa-check"></i>
                          <div className="profile_name">
                            <h4>
                              {author.authorName}
                              <span className="profile_username">
                                @{author.tag}
                              </span>
                              <span id="wallet" className="profile_wallet">
                                {author.walletAddress}
                              </span>
                              <button
                                id="btn_copy"
                                title="Copy Text"
                                onClick={handleCopy}
                              >
                                Copy
                              </button>
                            </h4>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                  <div className="profile_follow de-flex">
                    <div className="de-flex-col">
                      {loading ? (
                        <div
                          className="skeleton-box"
                          style={{ width: "100px", height: "16px" }}
                        ></div>
                      ) : (
                        <div className="profile_follower">
                          {author.followers} followers
                        </div>
                      )}
                      <Link to="#" className="btn-main">
                        Follow
                      </Link>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-md-12">
                <div className="de_tab tab_simple">
                  <AuthorItems authorId={authorId} />
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Author;