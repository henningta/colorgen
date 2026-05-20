import debounce from 'lodash.debounce';
import { useEffect, useMemo, useState } from 'react';
import { useShallow } from 'zustand/shallow';
import { useColorStore } from '~/context';

export function useSelectedColor() {
  const { colorHex, setColor } = useColorStore(
    useShallow((state) => ({
      colorHex: state.colorHex,
      setColor: state.setColor,
    })),
  );

  const [selectedColor, setSelectedColor] = useState(colorHex);

  useEffect(() => {
    setSelectedColor(colorHex);
  }, [colorHex]);

  const debouncedSetColor = useMemo(
    () => debounce((color: string) => setColor(color), 200),
    [setColor],
  );

  useEffect(() => {
    debouncedSetColor(selectedColor);
  }, [selectedColor, debouncedSetColor]);

  return { colorHex, selectedColor, setSelectedColor };
}
