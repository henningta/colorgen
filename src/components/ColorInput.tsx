import React, { useEffect, useMemo, useState } from 'react';
import { IconButton, TextField } from '@mui/joy';
import { Autocomplete } from '@mui/material';
import debounce from 'lodash.debounce';
import Icon from './Icon';
import colorNameList from 'color-name-list';
import { stripColorName } from '../utils';
import ListboxComponent, { StyledPopper } from './VirtualListAdapter';

export type ColorInputProps = {
  value: string;
  onChange: (color: string) => void;
};

const ColorInput: React.FC<ColorInputProps> = ({ value, onChange }) => {
  const [selected, setSelected] = useState<string | null>(null);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const debounceSuggestions = useMemo(
    () =>
      debounce((input: string) => {
        if (input?.length) {
          const filteredColors = colorNameList
            .map((x) => x.name)
            .filter((color) => {
              const strippedName = stripColorName(color);
              const strippedInput = stripColorName(input);
              return (
                strippedInput &&
                // strippedInput.length >= 3 &&
                strippedName?.includes(strippedInput)
              );
            }) as string[];
          setSuggestions(filteredColors);
        } else {
          setSuggestions([]);
        }
      }, 100),
    []
  );

  useEffect(() => {
    debounceSuggestions(value);
  }, [debounceSuggestions, value]);

  useEffect(() => {
    selected && onChange(selected);
    // setShowSuggestions(false);
  }, [selected, onChange]);

  return (
    <Autocomplete
      sx={(theme) => ({
        width: 0,
        flex: 1,
        [theme.breakpoints.down('md')]: { ml: 2 },
      })}
      value={selected}
      onChange={(_, selected) => setSelected(selected)}
      freeSolo
      options={suggestions}
      open={!!suggestions.length && showSuggestions}
      // disableCloseOnSelect
      // onClose={() => setShowSuggestions(false)}
      blurOnSelect
      ListboxComponent={ListboxComponent}
      PopperComponent={(popperProps) => (
        <StyledPopper {...popperProps} sx={{}} placement="top" />
      )}
      renderInput={(params) => (
        <TextField
          {...params}
          ref={params.InputProps.ref}
          type="text"
          sx={{ flex: 1 }}
          componentsProps={{ input: params.inputProps }}
          size="md"
          variant="soft"
          placeholder="Search by color, hex, rgb…"
          value={value}
          onChange={(e) => onChange(e.currentTarget.value)}
          onFocus={() => setShowSuggestions(true)}
          onBlur={() => setShowSuggestions(false)}
          // onFocus={(e) => e.target.select()}
          startDecorator={<Icon>search</Icon>}
          endDecorator={
            !!value?.length && (
              <IconButton onClick={() => onChange('')}>
                <Icon style={{ fontSize: 20 }}>close</Icon>
              </IconButton>
            )
          }
        />
      )}
      renderOption={(props, option) => [props, option] as React.ReactNode}
      renderGroup={(params) => params as unknown as React.ReactNode}
    />
  );
};

export default ColorInput;
