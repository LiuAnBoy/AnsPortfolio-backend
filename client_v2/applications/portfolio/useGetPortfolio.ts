import { useEffect, useState } from 'react';
import { requestGetAllPortfolio } from '../../services/porfolio/portfolioService';
import { PortfolioListProps } from '../../domain/Portfolio/portfolioListProps';

interface PortfolioProps {
  status: number;
  data: PortfolioListProps[];
}

function useGetPortfolio() {
  const [portfolioList, setPortfolioList] = useState<PortfolioProps | null>();

  const getAllPortfolio = async () => {
    const res = await requestGetAllPortfolio();
    if (res.status) {
      setPortfolioList(res.data);
    }
    return false;
  };

  const getFilterPortfolio = async (tag: string) => {
    const res = await requestGetAllPortfolio(tag);
    if (res.status) {
      setPortfolioList(res.data);
    }
    return false;
  };

  useEffect(() => {
    getAllPortfolio();
  }, []);

  return {
    portfolioList,
    getAllPortfolio,
    getFilterPortfolio,
  };
}

export default useGetPortfolio;
