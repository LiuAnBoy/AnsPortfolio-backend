import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import {
  requestGetAllPortfolio,
  requestGetFeaturedPortfolio,
} from '../../services/portfolio/portfolioService';
import ProjectProps from '../../domain/Projects';

function useGetPortfolio() {
  const [portfolioList, setPortfolioList] = useState<ProjectProps[] | []>([]);
  const router = useRouter();

  const getAllPortfolio = async () => {
    const res = await requestGetAllPortfolio();
    if (res?.status === 200) {
      setPortfolioList(res.data);
    }
    return false;
  };

  const getFilterPortfolio = async (tag: string) => {
    const res = await requestGetAllPortfolio(tag);
    if (res?.status === 200) {
      setPortfolioList(res.data);
    }
    return false;
  };

  const getFeaturedPortfolio = async () => {
    const res = await requestGetFeaturedPortfolio();
    if (res?.status === 200) {
      setPortfolioList(res.data);
    }
    return false;
  };

  useEffect(() => {
    if (router.pathname === '/') {
      getFeaturedPortfolio();
    }
    if (router.pathname === '/portfolio') {
      getAllPortfolio();
    }
  }, []);

  return {
    portfolioList,
    getAllPortfolio,
    getFilterPortfolio,
  };
}

export default useGetPortfolio;
