import { useQuery } from '@tanstack/react-query';
import { createFileRoute, useParams } from '@tanstack/react-router';
import { fetchCharactersById } from '../../Api/actions';

export const Route = createFileRoute('/characters/$characterId')({
  component: CharacterDetails,
});

function CharacterDetails() {
  const { characterId } = useParams({ from: '/characters/$characterId' });

  const { data, isLoading, error } = useQuery({
    queryKey: ['character', characterId],
    queryFn: () => fetchCharactersById(characterId),
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading character details.</div>;

  return (
    <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
      <div
        style={{
          border: '1px solid #ccc',
          borderRadius: '10px',
          padding: '20px',
          maxWidth: '400px',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
        }}
      >
        {data && (
          <img
            src={data.image}
            alt={data.name}
            style={{
              width: '100%',
              borderRadius: '10px',
              marginBottom: '20px',
            }}
          />
        )}
        <h2 style={{ marginBottom: '10px' }}>{data?.name}</h2>
        <p><strong>Status:</strong> {data?.status}</p>
        <p><strong>Species:</strong> {data?.species}</p>
        <p><strong>Gender:</strong> {data?.gender}</p>
        <p><strong>Origin:</strong> {data?.origin.name}</p>
        <p><strong>Location:</strong> {data?.location.name}</p>
      </div>
    </div>
  );
}