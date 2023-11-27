import { useState } from "react";

const Home = () => {
  const [count, setCount] = useState(0);

  return (
    <>
      <div>
        {/* Tailwind */}
        <h1 className='text-3xl font-bold underline'>
          Home page
        </h1>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
    </>
  );
};

export default Home;