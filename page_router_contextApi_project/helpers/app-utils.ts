export type EventItem = {
  id: string;
  title: string;
  image: string;
  date: string;
  location: string;
  description: string;
  isFeatured: boolean;
};

export const getAllEvents = async (): Promise<EventItem[]> => {
  const response = await fetch(
    'https://crypto-react-aa6fe-default-rtdb.firebaseio.com/events.json',
  );
  const data = await response.json();
  return data;
};

export async function getFeaturedEvents() {
  const allEvents = await getAllEvents();
  return allEvents.filter((event) => event.isFeatured);
}

export async function getEventById(id: string) {
  const allEvents = await getAllEvents();
  return allEvents.find((event) => event.id === id);
}

export async function getFilteredEvents(dateFilter: {
  year: number;
  month: number;
}) {
  const { year, month } = dateFilter;

  const allEvents = await getAllEvents();

  const filteredEvents = allEvents.filter((event) => {
    const eventDate = new Date(event.date);
    return (
      eventDate.getFullYear() === year && eventDate.getMonth() === month - 1
    );
  });

  return filteredEvents;
}
