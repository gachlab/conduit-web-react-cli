import React from "react";

const ConduitTagsPopular = ({ tags, onSelected }) => (
  <div className="sidebar">
    <p>Popular Tags</p>

    {tags && tags.length === 0 && <div>No tags are here... yet.</div>}

    {tags && tags.length > 0 && (
      <div className="tag-list">
        {tags.map((tag) => (
          <a
            key={tag}
            className="tag-default tag-pill"
            onClick={() => onSelected(tag)}
          >
            {tag}
          </a>
        ))}
      </div>
    )}
  </div>
);

export default ConduitTagsPopular;
