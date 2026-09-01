import type { PortfolioData } from '../types';
import portfolioJson from './portfolio.json';

export const portfolioData = portfolioJson as unknown as PortfolioData;
