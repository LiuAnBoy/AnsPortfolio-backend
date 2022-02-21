import { Typography } from '@mui/material';

interface TitleProps {
  text: string;
}

function Title({ text }: TitleProps) {
  return <Typography variant="title">{text}</Typography>;
}

export default Title;
