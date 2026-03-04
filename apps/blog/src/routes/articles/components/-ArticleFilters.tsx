import { Flex } from '@idevgon/design-system';
import { tagButtonStyle, tagFilterStyle } from '../-styles';

interface ArticleFiltersProps {
  allTags: string[];
  tagCounts: Map<string, number>;
  selectedTags: Set<string>;
  onTagClick: (tagName: string) => void;
}

export function ArticleFilters({ allTags, tagCounts, selectedTags, onTagClick }: ArticleFiltersProps) {
  if (allTags.length === 0) return null;

  return (
    <Flex className={tagFilterStyle}>
      {allTags.map((tagName) => {
        const count = tagCounts.get(tagName) ?? 0;
        return (
          <button
            type="button"
            key={tagName}
            className={tagButtonStyle}
            data-selected={selectedTags.has(tagName.toLowerCase())}
            onClick={() => onTagClick(tagName)}
            aria-pressed={selectedTags.has(tagName.toLowerCase())}
          >
            #{tagName}{count >= 2 && ` (${count})`}
          </button>
        );
      })}
    </Flex>
  );
}
