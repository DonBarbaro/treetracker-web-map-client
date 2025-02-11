import SearchIcon from '@mui/icons-material/Search';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import { useTheme } from '@mui/material/styles';
import { useEffect, useState } from 'react';
import { debounce } from 'models/utils';
import fakeCall from './mockApi';

export default function SearchInput({ keyword, setKeyword, setResults }) {
  const [inputState, setInputState] = useState('');
  const theme = useTheme();

  useEffect(() => {
    if (keyword.trim().length === 0) {
      setResults([]);
      return;
    }
    const result = fakeCall(keyword);
    setResults(result);
  }, [keyword, setResults]);

  const onChange = debounce((e) => {
    setKeyword(e.target.value);
  }, 300);

  return (
    <TextField
      id="input-with-icon-textfield"
      placeholder="search"
      value={inputState}
      onChange={(e) => {
        setInputState(e.target.value);
        onChange(e);
      }}
      InputProps={{
        startAdornment: (
          <InputAdornment position="">
            <SearchIcon sx={{ color: `${theme.palette.primary.main}` }} />
          </InputAdornment>
        ),
      }}
      variant="outlined"
      sx={{
        [`& fieldset`]: {
          borderRadius: '50px',
        },

        left: '16px',
        top: '16px',
        width: '448px',
        height: '48px',
      }}
    />
  );
}
