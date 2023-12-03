import '../App.css';
import { SearchBar } from '../components/SearchBar';

const Home = () => {
  return (
    <div>
      <header>
        <h2
          className='text-3xl text-left pb-10'
        >
          share past living experiences
        </h2>
        <h2 className='text-xl pb-5'>
          Choose a filter to search for landlord reviews.
        </h2>
      </header>
      <body className='min-h-76vh flex flex-col'>
        <SearchBar className="flex-1 flex-shrink-0"/>
        <footer
          className="w-full h-[4.5%] text-white space-x-2 p-10 mt-auto"
        >
          <h1 className="py-3 text-xl font-bold">Developers</h1>
          <a className="hover:underline" href="https://github.com/garrickhenne">@garrickhenne</a>
          <a className="hover:underline" href="https://github.com/dantan380">@dantan380</a>
          <a className="hover:underline" href="https://github.com/robertshum">@robertshum</a>
        </footer>
      </body>
    </div>
  );
};

export default Home;