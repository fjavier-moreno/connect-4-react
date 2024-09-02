export const Token = ({ player, isSelected }) => {
  const className = `player-${player} ${isSelected ? 'is-selected' : ''}`

  return (
    <div className={className} />
  )
}