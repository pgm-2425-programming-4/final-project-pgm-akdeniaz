import React from "react";

export function TaskFilters({ tagFilter, setTagFilter, searchTerm, setSearchTerm, tags }) {
  return (
    <div id="task-filters">
      <div className="select">
        <select value={tagFilter} onChange={(e) => setTagFilter(e.target.value)}>
          <option disabled value="">
            Filter by label
          </option>
          {tags.map((tag) => (
            <option key={tag} value={tag}>
              {tag}
            </option>
          ))}
        </select>
      </div>
      <input
        className="input"
        placeholder="Search by title"
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
    </div>
  );
}