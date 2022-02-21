import { useState } from 'react';
import { Button, Container } from '@mui/material';
import { useRouter } from 'next/router';

import Title from '../../layouts/Title';
import FeaturedProjectCard from '../../layouts/FeaturedProjectCard';
import styles from '../../../styles/components/Project.module.scss';

function Projects() {
  const router = useRouter();

  const [isExpand, setExpand] = useState(new Array(4).fill(false));

  const handleExpandClick = (index: number) => {
    const updateExpandStatus = isExpand.map((item, idx) => {
      const items = idx === index ? !item : item;
      return items;
    });

    setExpand(updateExpandStatus);
  };

  const goPage = () => {
    router.push('/portfolio');
  };

  return (
    <section className={styles.section}>
      <Container maxWidth="lg">
        <Title text="Featured Projects" />
        {projectsData.map((data, index) => {
          const isOpen = isExpand[index];
          return (
            <FeaturedProjectCard
              key={data.name}
              data={data}
              index={index}
              isExpand={isOpen}
              handleExpandClick={() => handleExpandClick(index)}
            />
          );
        })}
      </Container>
      <Button
        onClick={goPage}
        variant="contained"
        size="large"
        className={styles.button}
      >
        See More
      </Button>
    </section>
  );
}

export default Projects;

const projectsData = [
  {
    tags: [
      {
        _id: '60e60ab93a207b619a7d4dc3',
        name: 'rwd',
      },
      {
        _id: '60e60a843a207b619a7d4dbc',
        name: 'gatsbyjs',
      },
      {
        _id: '60deafb087f58d28810b79dc',
        name: 'react',
      },
      {
        _id: '60e60a9d3a207b619a7d4dc0',
        name: 'mui',
      },
    ],
    views: 0,
    _id: '60e60fb03a207b619a7d4df5',
    image:
      'https://res.cloudinary.com/cla/image/upload/v1625042838/Portfolio/Projects/DrEleken_wghanf.png',
    number: 8,
    name: '兒童顏值管理',
    company: 'Dr.Eleken',
    description:
      '兒童顏值管理？找Dr.Eleken就對了。Dr.Eleken兒童顏值管理專家為牙醫組成的團隊，創立的目的是為守護所有孩童的健康，讓各地的孩童皆能接受到最好的身心發育管理。致力於針對每一個獨一無二的孩子，打造專屬的治療計畫。',
    featured: true,
    url: '',
    createAt: '2021-07-07T20:33:52.471Z',
    __v: 0,
  },
  {
    tags: [
      {
        _id: '60e60ab93a207b619a7d4dc3',
        name: 'rwd',
      },
      {
        _id: '60e60ac23a207b619a7d4dc5',
        name: 'vue',
      },
    ],
    views: 0,
    _id: '60e60f3a3a207b619a7d4df0',
    image:
      'https://res.cloudinary.com/cla/image/upload/v1625042014/Portfolio/Projects/Qonver_bkm05o.png',
    number: 7,
    name: '視訊交友APP',
    company: '矽谷新創Qonver',
    description:
      'Qonver為一間矽谷新創公司，此APP應用於視訊聊天交友，即時依照興趣配對並且可於配對後與對方視訊聊天，管理帳號、好友資訊等等。此專案使用了Vue/ NuxtJs來建構，於此專案之中擔任前端協助製作為期兩個月，後由該公司取回完成剩下部分。',
    featured: true,
    url: '',
    createAt: '2021-07-07T20:31:54.733Z',
    __v: 0,
  },
  {
    tags: [
      {
        _id: '60e60ab93a207b619a7d4dc3',
        name: 'rwd',
      },
      {
        _id: '60e60e933a207b619a7d4de7',
        name: 'nextjs',
      },
      {
        _id: '60e60a923a207b619a7d4dbe',
        name: 'antdesign',
      },
      {
        _id: '60deafb087f58d28810b79dc',
        name: 'react',
      },
    ],
    views: 0,
    _id: '60e60ea13a207b619a7d4de9',
    image:
      'https://res.cloudinary.com/cla/image/upload/v1625042076/Portfolio/Projects/DrPani_map_pfdf2y.png',
    number: 6,
    name: '診所地圖',
    company: 'Dr. Pani',
    description:
      'Dr. Pani所做的診所地圖，旨在即時幫助想要看牙醫的人，提供他們周遭所有牙醫診所並且列出評價、營業時間細部資訊如可否刷卡、設備等...，也像591一樣依照地區列出所有牙醫診所資料。此診所地圖使用框架為React並且用上了AntDesign UI來做美化，NextJS做SSR來讓SEO更好。',
    featured: true,
    url: '',
    createAt: '2021-07-07T20:29:21.973Z',
    __v: 0,
  },
  {
    tags: [
      {
        _id: '60e60ab93a207b619a7d4dc3',
        name: 'rwd',
      },
      {
        _id: '60deb701fc6e5b29a7cc0efa',
        name: 'css',
      },
      {
        _id: '60deb6fcfc6e5b29a7cc0ef8',
        name: 'html',
      },
    ],
    views: 0,
    _id: '60e60d4a3a207b619a7d4ddb',
    image:
      'https://res.cloudinary.com/cla/image/upload/v1625041065/Portfolio/Projects/TemChanp_cpcu7f.png',
    number: 4,
    name: '官方網站',
    company: '騰強科技',
    description:
      '為騰強科技的官方網站，由於原先的網站為多年前製作，已不堪使用，因此決議重新製作具有RWD(響應式網頁設計)功能的新官方網站，以深色系的背景為主，深藍色為輔，搭配上亮眼的銘黃色，代表著人性化與科技化。',
    featured: true,
    url: '',
    createAt: '2021-07-07T20:23:38.926Z',
    __v: 0,
  },
];
