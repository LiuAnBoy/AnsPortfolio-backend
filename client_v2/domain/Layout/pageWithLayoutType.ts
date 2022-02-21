import { NextPage } from 'next';
import Layout from '../../presentation/components/Layout';

export type pageWithLayoutType = NextPage & { layout: typeof Layout };
