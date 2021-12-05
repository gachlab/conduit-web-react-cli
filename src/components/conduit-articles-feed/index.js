import React from "react";

 export default ({ feeds, selected, onSelected }) => (
  <div className="feed-toggle">
    <ul className="nav nav-pills outline-active">
      {feeds.map((feed) => (
        <li key={feed.id} className="nav-item">
          <a
            className={feed.id === selected ? "active nav-link" : "nav-link"}
            onClick={() => onSelected(feed)}
          >
            {feed.name}
          </a>
        </li>
      ))}
    </ul>
  </div>
);
