import { useAsyncState, useAsyncEffect } from "@hilma/tools";

const App: React.FC = () => {
  const [results, setResults, getResults] = useAsyncState<unknown[]>();

  useAsyncEffect(async () => {
    const res = await fetch(
      "https://jsonplaceholder.typicode.com/todos?_limit=5"
    );
    const data = await res.json();
    await setResults(data);

    // it's true that in this situation, this isn't necessary...
    const posts = await getResults();
    alert("Got results! Length is: " + posts?.length);
  }, []);

  return (
    <article>
      {results ? (
        <pre>{JSON.stringify(results, null, 2)}</pre>
      ) : (
        <b>Loading...</b>
      )}
    </article>
  );
};

export default App;
