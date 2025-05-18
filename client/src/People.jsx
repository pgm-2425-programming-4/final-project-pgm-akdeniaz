export function People({ people }) {
  return (
    <div>
      <ul>
        {people.map((person) => {
          return <li key={person.uid}>{person.name}</li>;
        })}
      </ul>
    </div>
  );
}