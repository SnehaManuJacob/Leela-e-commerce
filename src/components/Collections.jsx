import React from "react";
import CollectionCard from "./CollectionCard";

export default function Collections() {
  const collections = [
    {
      image:
        "https://images.unsplash.com/photo-1671535108665-eeeb723ebebf?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      title: "Florals",
      subtitle: "These stocks won’t last forever.",
    },
    {
      image:
        "https://images.unsplash.com/photo-1700170928599-d7fc2d4ec97f?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      title: "BE FREE.",
      subtitle: "Express your wild side with these shirts.",
    },
  ];
  return (
    <div className="container collections-section my-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="section-title">COLLECTIONS</h2>
        <a href="#!" className="show-all">
          SHOW ALL COLLECTIONS
        </a>
      </div>
      <section className="collections container my-5">
        <div className="row g-4">
          {collections.map((item, index) => (
            <div className="col-md-6" key={index}>
              <CollectionCard {...item} />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
