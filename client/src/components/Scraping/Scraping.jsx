import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getNoticias } from "../../redux/actions/actions";

import "./Scraping.css";

const Scraping = () => {
  const dispatch = useDispatch();

  const scraping = useSelector((state) => state.scraping);

  useEffect(() => {
    dispatch(getNoticias());
  }, []);

  const handleRefresh = () => {
    scraping.length && console.log(scraping[0].data);
  };

  return (
    <div className="scraping">
      <button
        className="btn btn-primary"
        onClick={() => {
          handleRefresh();
        }}
      >
        Refresh and log
      </button>
      <div className="titles-container">
        {scraping.length
          ? scraping[0].data.map((title) => {
              return <h2 className="title">{title}</h2>;
            })
          : null}
      </div>
    </div>
  );
};

export default Scraping;
