import NavBar from '../NavBar';
import Footer from '../Footer';
import { LayoutProps } from '../../../domain/Layout/layoutProps';

const Layout: LayoutProps = ({ children }) => {
  return (
    <>
      <NavBar />
      {children}
      <Footer />
    </>
  );
};

export default Layout;
