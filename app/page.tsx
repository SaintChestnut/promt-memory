import { Feed } from '@/components';
import { messages } from '@/resources';

const Home = () => {
  return (
    <section className="w-full flex-center flex-col">
      <h1 className="head_text text-center">{messages.mainHeader}</h1>
      <br className="max-md:hidden" />
      <h1 className="head_text orange_gradient text-center">{messages.mainSubHeader}</h1>
      <Feed />
    </section>
  );
};

export default Home;
