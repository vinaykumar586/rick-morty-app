import React from 'react';
import { createFileRoute, Link } from '@tanstack/react-router';

export const Route = createFileRoute('/')({
  component: CharacterDetails,
});

function CharacterDetails() {
  return (
    <>
      <div className="characters_home">
        <h1>Rick & Morty Universe</h1>
        <p>Explore your favorite characters from across the multiverse!</p>
        <Link to="/characters">
          <h2>Click here to view characters</h2>
        </Link>
      </div>
    </>
  );
}
