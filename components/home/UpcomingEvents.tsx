import { getPublishedEvents } from '@/app/actions/events'
import UpcomingEventsClient from './UpcomingEventsClient'

const UpcomingEvents = async () => {
  // Fetch data on the server
  const response = await getPublishedEvents({ limit: 10 })
  
  // Filter and sort to get upcoming events
  const now = new Date()
  const upcomingEvents = response.data
    .filter(event => new Date(event.eventDetails.startDate) >= now)
    .sort((a, b) => 
      new Date(a.eventDetails.startDate).getTime() - 
      new Date(b.eventDetails.startDate).getTime()
    )
    .slice(0, 3)

  return <UpcomingEventsClient events={upcomingEvents} />
}

export default UpcomingEvents

