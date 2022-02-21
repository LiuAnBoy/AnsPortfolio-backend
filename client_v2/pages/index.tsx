import Layout from '../presentation/components/Layout';
import Home from '../presentation/components/Home';
import Projects from '../presentation/components/Home/projects';

function Main() {
  return (
    <>
      <Home />
      <Projects />
    </>
  );
}

Main.layout = Layout;

export default Main;
