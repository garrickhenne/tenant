import AboutPage from "../components/AboutPage";
import { useEffect } from "react";

const AboutUs = () => {
  useEffect(() => {
    const oldTitle = document.title;
    document.title = 'tenant | About Us';

    return () => document.title = oldTitle;
  }, []);
  return <main>
    <AboutPage />
  </main>;
};

export default AboutUs;