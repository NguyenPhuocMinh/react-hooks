import { useCallback, useMemo, useState } from 'react';
import './App.css';
import { Button, Typography, TextField, Box, List, ListItem, ListItemText, ListItemIcon } from '@mui/material';
import FolderIcon from '@mui/icons-material/Folder';
import Chart from './components/Chart';

const App = () => {
  /**
   * useMemo
   */
  const [count, setCount] = useState(0);
  const [increment, setIncrement] = useState(0);
  // => Use case 1: Chart not re-render when dependencies is empty array
  // const value = useMemo(() => {
  //   return {
  //     count,
  //   };
  // }, []);

  const handleClickCount = () => {
    setCount(count + 1);
  };
  // => Use case 2: Chart will re-render when dependencies is increment
  const value = useMemo(() => {
    return {
      count,
    };
  }, [increment]);

  const handleClickIncrement = () => {
    setIncrement(increment + 1);
  };
  // => Another case: Calculate price
  const [productName, setProductName] = useState('');
  const [productPrice, setProductPrice] = useState('');
  const [products, setProducts] = useState([]);

  const handleClickAddProduct = useCallback(() => {
    setProducts([
      ...products,
      {
        productName: productName || 'product-name',
        productPrice: parseInt(productPrice) || 0,
      },
    ]);
  }, [productName, productPrice]);

  const total = useMemo(() => {
    return products.reduce((prev, cur) => {
      console.log('total re-render');
      return prev + cur.productPrice;
    }, 0);
  }, [products]);

  return (
    <div className="App">
      <header className="App-header">
        <h1 className="App-title">Welcome to React hooks useMemo and useCallback</h1>
        <Box display="flex" flexDirection="row">
          <Button
            sx={{ marginRight: '1rem', textTransform: 'capitalize' }}
            variant="contained"
            onClick={handleClickCount}
          >
            Count me
          </Button>
          <Button
            sx={{ marginLeft: '1rem', textTransform: 'capitalize' }}
            variant="contained"
            onClick={handleClickIncrement}
          >
            Increment me
          </Button>
        </Box>
        <Chart value={value} />
        <Typography variant="body1">Value: {value.count}</Typography>
        <Typography variant="body1">Count: {count}</Typography>
        <Typography variant="body1">Increment: {increment}</Typography>
        <Box m={2} display="flex" flexDirection="column">
          <Box sx={{ m: 1, width: '400px' }}>
            <TextField
              label="Product Name"
              fullWidth
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
            />
          </Box>
          <Box sx={{ m: 1, width: '400px' }}>
            <TextField
              label="Product Price"
              fullWidth
              value={productPrice}
              onChange={(e) => setProductPrice(e.target.value)}
            />
          </Box>
          <Button variant="contained" sx={{ m: 1, textTransform: 'capitalize' }} onClick={handleClickAddProduct}>
            Add Product
          </Button>
          <Typography variant="body1">Total: {total}</Typography>
          <List>
            {products?.map((e, index) => {
              return (
                <ListItem key={index}>
                  <ListItemIcon>
                    <FolderIcon />
                  </ListItemIcon>
                  <ListItemText primary={`${e.productName} - ${e.productPrice}`} />
                </ListItem>
              );
            })}
          </List>
        </Box>
      </header>
    </div>
  );
};

export default App;
