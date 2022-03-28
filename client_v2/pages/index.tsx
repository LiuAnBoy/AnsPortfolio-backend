import Layout from '../presentation/components/Layout';
import Home from '../presentation/components/Home';
import Projects from '../presentation/components/Home/projects';
import Helmet from '../presentation/components/Helmet';

function Main() {
  return (
    <>
      <Helmet subtitle="Home" />
      <Home />
      <Projects />
    </>
  );
}

Main.layout = Layout;

export default Main;
