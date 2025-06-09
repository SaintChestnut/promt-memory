import { Feed } from '@/components';

const Home = () => {
  return (
    <section className="w-full flex-center flex-col">
      <h1 className="head_text text-center">Discover and Share</h1>
      <br className="max-md:hidden" />
      <h1 className="head_text orange_gradient text-center">AI-Powered Prompts</h1>
      <Feed />
    </section>
  );
};

export default Home;
