const AboutPage = () => {
  return <div className="text-slate-200">
    <main>
      <header className="font-bold text-4xl py-10">Inspiration</header>
      <article className="text-left">
        <ul className="px-24 text-3xl">
          <li className="pb-5 list-disc">
            As tenants, background checks are performed. Tenants should know about what it is like to live under that landlord.
          </li>
          <li className="pb-5 list-disc">
            First viewing can hide many unexpected things that come up during daily living.
          </li>
          <li className="list-disc">
            We wanted to create an app to inform prospective tenants in their renting decisions by displaying reviews about living experiences. They can also create new reviews.
          </li>
        </ul>
      </article>
      <header className="font-bold text-4xl p-10">Tech Stack</header>
      <div className="flex flex-row justify-evenly pb-10">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/f9/Antu_mongodb.svg/64px-Antu_mongodb.svg.png"
          alt="MongoDB Logo"
          className="object-contain"
        >
        </img>
        <img
          src="../../public/icons8-mongoose.svg"
          alt="Mongoose Logo"
          className="object-contain"
        >
        </img>
        
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/64px-React-icon.svg.png"
          alt="React logo"
          className="object-contain"
        >
        </img>
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/6/67/NodeJS.png"
          alt="NodeJS Logo"
          className="object-contain"
        >
        </img>
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d5/Tailwind_CSS_Logo.svg/64px-Tailwind_CSS_Logo.svg.png"
          alt="Tailwind Logo"
          className="object-contain"
        >
        </img>
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Typescript_logo_2020.svg/64px-Typescript_logo_2020.svg.png"
          alt="TS logo"
          className="object-contain"
        >
        </img>
        
      </div>
      <h2 className="italic text-3xl px-14 pb-5">M E R N W I N D</h2>
      <article className="text-left">
        <ul className="text-3xl px-24">
          <li className="pb-5 list-disc">
            Frontend: JS, React, Framer-Motion, Tailwind.
          </li>
          
          <li className="list-disc pb-3">
            Backend:Express, NodeJS, Mongoose.
          </li>

          <li className="indent-7 pb-5">
            TypeScript: Allowed us to create interfaces for our backend workflow to help distinguish modules from one another.
          </li>

          <li className="list-disc pb-3">
            Database:
          </li>

          <li className="indent-7">
            MongoDB: Suited our needs to being adaptive with our development pace by removing the need to perform database upgrades whenever our models changed.
          </li>
        </ul>
      </article>
      <header className="font-bold text-4xl p-10">Challenges</header>
      <article className="flex flex-col">
        <ul className="text-3xl px-24 text-left ">
          <li className="list-disc pb-3">
            Frontend:
          </li>
          <li className="indent-7 pb-5">
            Using Framer-motion for the first time.
          </li>

          <li className="list-disc pb-3">
              Backend:
          </li>
          <li className="indent-7 pb-5">
            Getting used to TypeScript and MongoDB.
          </li>

          <li className="list-disc pb-3">
            API:
          </li>
          <li className="indent-7 pb-2">
            Getting sentiment value from Google Natural Language.
          </li>
          <li className="indent-7 pb-2">
            Adding pins on MapBox was a surprising challenge.
          </li>
          <li className="indent-7">
            Working around hourly limit for Mapbox API calls.
          </li>
        </ul>
        <section className="justify-center items-center flex pt-10">
          <img
            src="../../public/throttle_ok.png"
            className="object-contain w-[75rem] rounded-2xl"
          >
          </img>
        </section>
      </article>
      <header className="text-4xl p-10 font-bold">Teamwork</header>
      <article className="text-left flex flex-col">
        <ul className="text-3xl pl-24">
          <li className="pb-5"> Introduced AGILE tendencies:</li>
          <li className="list-disc pb-5"> Daily standups containing what we did yesterday, what we planned on doing today, and any blockers that we had encountered or would need help with.</li>
          <li className="list-disc pb-3"> During planning stage involved creating Figma wireframes of how we wanted the individual pages and forms to look.</li>
          <li className="indent-7 pb-2"> Figma allows us to work on the same screen at the same time.</li>
          <li className="list-disc pb-5"> Constant merge-calls on Discord to resolve merge conflicts / new features are on the latest codebase.</li>
          <li className="list-disc pb-5"> Created a GitHub project with a Kanban board containing our user stories as well as further subtasks that each user story might need.</li>
          <li className="list-disc pb-5"> Directly merging to the main branch was prohibited and all branches required a PR + review from another peer which helped facilitate knowledge of each other’s changes in addition to our own.</li>
        </ul>
      </article>
      <section className="flex flex-col items-center justify-center">
        <img
          src="../../public/kanban.png"
          className="object-contain scale-90 rounded-2xl"
        >
        </img>
        <img
          src="../../public/figma.png"
          className="object-contain scale-90 rounded-2xl"
        >
        </img>

      </section>
    </main>
  </div>;
};

export default AboutPage;