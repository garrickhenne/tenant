import '../App.css';
import { SearchBar } from '../components/SearchBar';
import { motion } from "framer-motion";

const Home = () => {
  const itemAnimProp = {
    visible: { opacity: 1, y: 0 },
    hidden: { opacity: 0, y: -50 },
  };
  return (
    <div>
      <header>
        <motion.h2
          className='text-3xl text-left pb-10 text-slate-200'
          variants={itemAnimProp}
          initial="hidden"
          animate="visible"
          transition={{ duration: 0.2, delay: 0.1 }}
        >
          share past living experiences
        </motion.h2>
        <motion.h2
          className='text-xl pb-12 text-slate-200'
          variants={itemAnimProp}
          initial="hidden"
          animate="visible"
          transition={{ duration: 0.2, delay: 0.3 }}
        >
          Choose a filter to search for landlord reviews.
        </motion.h2>
      </header>
      <div className='min-h-74vh flex flex-col'>
        <SearchBar className="flex-1 flex-shrink-0"/>
        <motion.footer
          className="w-full h-[4.5%] text-white space-x-2 p-10 mt-auto"
          initial={{opacity: 0}}
          animate={{opacity: 1}}
          transition={{ duration: 0.5, delay: 1 }}
        >
          <h1 className="py-3 text-xl font-bold">Developers</h1>
          <a className="hover:underline" href="https://github.com/garrickhenne">@garrickhenne</a>
          <a className="hover:underline" href="https://github.com/dantan380">@dantan380</a>
          <a className="hover:underline" href="https://github.com/robertshum">@robertshum</a>
        </motion.footer>
      </div>
    </div>
  );
};

export default Home;