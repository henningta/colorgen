import { forwardRef, useEffect, useMemo } from 'react';
import { List, RowComponentProps, ListImperativeAPI } from 'react-window';
import {
  ListSubheader,
  useMediaQuery,
  Typography,
  useTheme,
  Paper,
  Stack,
} from '@mui/material';

type ColorItem = { name: string; hex?: string };

const LISTBOX_PADDING = 8; // px

type ItemData = (
  | { key: number; group: string; children: React.ReactNode }
  | [React.ReactElement, ColorItem, number]
)[];

function RowComponent({
  index,
  itemData,
  style,
}: RowComponentProps & { itemData: ItemData }) {
  const dataSet = itemData[index];
  const inlineStyle = {
    ...style,
    top: ((style.top as number | undefined) ?? 0) + LISTBOX_PADDING,
  };

  if ('group' in dataSet) {
    return (
      <ListSubheader key={dataSet.key} component="div" style={inlineStyle}>
        {dataSet.group}
      </ListSubheader>
    );
  }

  const { key, ...optionProps } = dataSet[0];

  return (
    <Stack
      key={key}
      component="li"
      direction="row"
      alignItems="center"
      gap={2}
      {...optionProps}
      style={inlineStyle}
    >
      <Paper
        variant="outlined"
        sx={{
          width: 24,
          height: 24,
          bgcolor: dataSet[1].hex,
          borderRadius: '50%',
        }}
      />
      <Typography noWrap flex={1}>
        {dataSet[1].name}
      </Typography>
    </Stack>
  );
}

// Adapter for react-window v2
const ListboxComponent = forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLElement> & {
    internalListRef: React.Ref<ListImperativeAPI>;
    onItemsBuilt: (optionIndexMap: Map<string, number>) => void;
  }
>(function ListboxComponent(props, ref) {
  const { children, internalListRef, onItemsBuilt, ...other } = props;
  const itemData: ItemData = [];
  const optionIndexMap = useMemo(() => new Map<string, number>(), []);

  (children as ItemData).forEach((item) => {
    itemData.push(item);
    if ('children' in item && Array.isArray(item.children)) {
      // eslint-disable-next-line
      itemData.push(...item.children);
    }
  });

  // Map option values to their indices in the flattened array
  itemData.forEach((item, index) => {
    // eslint-disable-next-line
    if (Array.isArray(item) && item[1]) {
      // eslint-disable-next-line
      optionIndexMap.set(JSON.stringify(item[1]), index);
    }
  });

  useEffect(() => {
    // eslint-disable-next-line
    onItemsBuilt?.(optionIndexMap);
  }, [onItemsBuilt, optionIndexMap]);

  const theme = useTheme();
  const smUp = useMediaQuery(theme.breakpoints.up('sm'), { noSsr: true });
  const itemCount = itemData.length;
  const itemSize = smUp ? 36 : 48;

  const getChildSize = (child: ItemData[number]) => {
    if ('group' in child) {
      return 48;
    }
    return itemSize;
  };

  const getHeight = () => {
    if (itemCount > 8) {
      return 8 * itemSize;
    }
    return itemData.map(getChildSize).reduce((a, b) => a + b, 0);
  };

  // Separate className for List, other props for wrapper div (ARIA, handlers)
  const { className, style, ...otherProps } = other;

  return (
    <div ref={ref} {...otherProps}>
      <List
        className={className}
        listRef={internalListRef}
        key={itemCount}
        rowCount={itemCount}
        rowHeight={(index) => getChildSize(itemData[index])}
        rowComponent={RowComponent}
        rowProps={{ itemData }}
        style={{
          height: getHeight() + 2 * LISTBOX_PADDING,
          width: '100%',
          ...style,
        }}
        overscanCount={5}
        tagName="ul"
      />
    </div>
  );
});

export default ListboxComponent;
