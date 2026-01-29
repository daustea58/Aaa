import React from 'react';

export const FloatingPetals = () => {
  return (
    <div className="floating-petals">
      {[...Array(10)].map((_, i) => (
        <div key={i} className="petal" />
      ))}
    </div>
  );
};
