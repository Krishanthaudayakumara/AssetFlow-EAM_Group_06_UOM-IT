import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import { useEffect, useState } from 'react';

const Calendar = () => {
    const [events, setEvents] = useState([]);
  
    useEffect(() => {
      // Fetch events from backend and set to state
      const fetchedEvents = fetch('http://localhost:5087/api/Events')
        .then(response => response.json())
        .then(data => setEvents(data));
    }, []);
  
    return (
      <FullCalendar
        plugins={[dayGridPlugin]}
        initialView="dayGridMonth"
        events={events}
      />
    );
  };
  
  export default Calendar;