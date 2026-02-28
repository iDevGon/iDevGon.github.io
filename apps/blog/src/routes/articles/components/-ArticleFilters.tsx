import { Flex } from '@idevgon/design-system';
import { tagButtonStyle, tagFilterStyle } from '../-styles';

interface ArticleFiltersProps {
  allTags: string[];
  selectedTags: Set<string>;
  onTagClick: (tagName: string) => void;
}

export function ArticleFilters({ allTags, selectedTags, onTagClick }: ArticleFiltersProps) {
  if (allTags.length === 0) return null;

  return (
    <Flex className={tagFilterStyle}>
      {allTags.map((tagName) => (
        <button
          type="button"
          key={tagName}
          className={tagButtonStyle}
          data-selected={selectedTags.has(tagName.toLowerCase())}
          onClick={() => onTagClick(tagName)}
          aria-pressed={selectedTags.has(tagName.toLowerCase())}
        >
          #{tagName}
        </button>
      ))}
    </Flex>
  );
}
