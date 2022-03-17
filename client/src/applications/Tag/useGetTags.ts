import { useEffect, useState } from 'react';
import { TagProps } from '../../domain/Tag/TagProps';
import { requestGetAllTags } from '../../services/tag/getTagService';

function useGetTags() {
  const [tagsList, setTagsList] = useState<TagProps[]>([]);

  const getAllTags = async () => {
    const res = await requestGetAllTags();
    if (res?.status === 200) {
      setTagsList(res.data);
    }
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
