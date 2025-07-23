import React, { useEffect, useState } from 'react';
import {
  Autocomplete,
  autocompleteClasses,
  Popper,
  styled,
  TextField,
} from '@mui/material';
import { colornames } from 'color-name-list';
import ListboxComponent from './VirtualListAdapter';

const options = colornames.map((x) => x.name);

// const normalizeString = (str: string, removeSpaces = false) => {
//   let normal = str
//     .normalize('NFD')
//     .replace(/[\u0300-\u036f]/g, '')
//     .toLowerCase();

//   if (removeSpaces) {
//     normal = normal.replaceAll(' ', '');
//   }

//   return normal;
// };

// // const filterOptions = createFilterOptions<string>({
// //   matchFrom: 'any',
// //   trim: true,
// // });

// const buildFilterOptions = (options: string[]) => {
//   const normalizedOptions = options.map((x) => normalizeString(x, true));
//   const mappedOptions = options.map((option, i) => ({
//     option,
//     normalized: normalizedOptions[i],
//   }));

//   return (options: string[], state: FilterOptionsState<string>) =>
//     mappedOptions
//       .filter(({ normalized }) =>
//         normalized.includes(normalizeString(state.inputValue, true)),
//       )
//       .map((x) => x.option);
// };

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
  const [selected, setSelected] = useState<string | null>(null);

  useEffect(() => {
    if (selected) {
      onChange(selected);
    }
  }, [selected, onChange]);

  return (
    <Autocomplete
      options={options}
      value={selected}
      onChange={(_, selected) => setSelected(selected)}
      inputValue={value}
      onInputChange={(_, value) => onChange(value)}
      freeSolo
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
