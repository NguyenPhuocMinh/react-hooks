import { memo } from 'react';

const Chart = ({ value, onChangeType }) => {
  console.log('Chart re-render');
  return <h1>There is chart component</h1>;
};

export default memo(Chart);
