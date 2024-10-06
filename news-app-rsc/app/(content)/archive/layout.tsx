import React from "react";

type ArchiveLayoutType = {
  archive: React.ReactNode;
  latest: React.ReactNode;
};
const ArchiveLayout: React.FC<ArchiveLayoutType> = ({ archive, latest }) => {
  return (
    <div style={{ padding: "2rem" }}>
      <h1>News Archive</h1>
      <section id="archive-filter">{archive}</section>
      <section id="archive-latest">{latest}</section>
    </div>
  );
};

export default ArchiveLayout;
