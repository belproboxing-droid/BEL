export interface EventCard {
  id: string
  title: string
  status: string
  isLive?: boolean
  details: string
}

export interface TeamCard {
  id: string
  name: string
  roster: string
  corner: 'gold' | 'black'
  hasCornerBracket?: boolean
}
