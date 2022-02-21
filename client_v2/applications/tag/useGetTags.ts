import { useEffect, useState } from 'react';
import { requestGetAllTags } from '../../services/tag/tagService';
import TagProps from '../../domain/Tag';

interface TagsProps {
  status: number;
  data: TagProps[];
}

function useGetTags() {
  const [tagsList, setTagList] = useState<TagsProps | null>();

  const getAllTags = async () => {
    const res = await requestGetAllTags();
    if (res.status) {
      setTagList(res.data);
    }
    return false;
  };

  useEffect(() => {
    getAllTags();
  }, []);

  return {
    tagsList,
    getAllTags,
  };
}

export default useGetTags;
