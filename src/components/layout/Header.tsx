import SearchInput from './SearchInput'
import ThemeToggle from './ThemeToggle'
import type { CitySearchResult } from '../../types/weather'

interface HeaderProps {
  onSearch: (city: CitySearchResult) => void
  onQueryChange: (query: string) => void
  suggestions: CitySearchResult[]
  theme: 'light' | 'dark'
  onToggleTheme: () => void
}

export default function Header({
  onSearch,
  onQueryChange,
  suggestions,
  theme,
  onToggleTheme
}: HeaderProps) {
  return (
    <header>
      <SearchInput
        onSearch={onSearch}
        onQueryChange={onQueryChange}
        suggestions={suggestions}
      />

      <ThemeToggle
        theme={theme}
        onToggle={onToggleTheme}
      />
    </header>
  )
}