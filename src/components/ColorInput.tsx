import { useEffect, useRef, useState } from 'react';
import {
  Autocomplete,
  autocompleteClasses,
  type FilterOptionsState,
  Popper,
  styled,
  TextField,
} from '@mui/material';
import { colornames } from 'color-name-list';
import ListboxComponent from './VirtualListAdapter';
import { getColorHex } from '~/utils';

type ColorItem = {
  name: string;
  hex?: string;
  normalized: string;
};

const options = colornames.map<ColorItem>((x) => ({
  name: x.name,
  hex: getColorHex(x.name),
  normalized: x.name
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]/g, ''),
}));

const filterOptions = (
  items: ColorItem[],
  state: FilterOptionsState<ColorItem>,
): ColorItem[] => {
  const input = state.inputValue
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]/g, '');

  if (!input) {
    return items;
  }

  const results: ColorItem[] = [];
  for (const item of items) {
    if (item.normalized.includes(input)) {
      results.push(item);
      if (results.length >= 100) break;
    }
  }
  return results;
};

const StyledPopper = styled(Popper)({
  [`& .${autocompleteClasses.listbox}`]: {
    boxSizing: 'border-box',
    '& ul': {
      padding: 0,
      margin: 0,
    },
  },
});

export type ColorInputProps = {
  value: string;
  onChange: (color: string) => void;
};

const ColorInput: React.FC<ColorInputProps> = ({ value, onChange }) => {
  const [inputDisplay, setInputDisplay] = useState(value);
  const inputDisplayRef = useRef(value);

  // Sync display from parent only when the resolved hex changes (external color change,
  // e.g. clicking a tint/shade), not when the parent just resolved our selected name to hex.
  useEffect(() => {
    const displayHex = getColorHex(inputDisplayRef.current);
    const valueHex = getColorHex(value);
    if (
      valueHex !== displayHex ||
      (!valueHex && value !== inputDisplayRef.current)
    ) {
      inputDisplayRef.current = value;
      setInputDisplay(value);
    }
  }, [value]);

  return (
    <Autocomplete
      options={options}
      filterOptions={filterOptions}
      isOptionEqualToValue={(a, b) =>
        a.name === (typeof b === 'string' ? b : b.name)
      }
      getOptionLabel={(option) =>
        typeof option === 'string' ? option : option.name
      }
      value={null}
      onChange={(_, selected) => {
        if (selected && typeof selected !== 'string') {
          inputDisplayRef.current = selected.name;
          setInputDisplay(selected.name);
          onChange(selected.hex ?? selected.name);
        }
      }}
      inputValue={inputDisplay}
      onInputChange={(_, newValue, reason) => {
        if (reason === 'input' || reason === 'clear') {
          inputDisplayRef.current = newValue;
          setInputDisplay(newValue);
          onChange(newValue);
        }
      }}
      freeSolo
      openOnFocus
      selectOnFocus
      disableListWrap
      slots={{
        popper: StyledPopper,
      }}
      slotProps={{
        listbox: {
          component: ListboxComponent,
        },
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          size="small"
          placeholder="Search by name, hex, rgb…"
        />
      )}
      renderOption={(props, option, state) =>
        [props, option, state.index] as React.ReactNode
      }
      renderGroup={(params) => params as unknown as React.ReactNode}
      sx={{
        width: 0,
        flex: 1,
        ml: { xs: 2, md: 0 },
      }}
    />
  );
};

export default ColorInput;
