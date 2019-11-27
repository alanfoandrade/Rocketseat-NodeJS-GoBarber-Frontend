import React, { useState, useMemo, useEffect } from 'react';
import { parseISO, format, subDays, addDays, isBefore } from 'date-fns';
import pt from 'date-fns/locale/pt';
import { MdChevronLeft, MdChevronRight } from 'react-icons/md';
import api from '~/services/api';

import { Container, Time } from './styles';

export default function Dashboard() {
  const [schedule, setSchedule] = useState([]);
  const [date, setDate] = useState(new Date());

  const dateFormatted = useMemo(
    () => format(date, "d 'de' MMMM", { locale: pt }),
    [date]
  );

  useEffect(() => {
    async function loadSchedule() {
      const response = await api.get('schedule', {
        params: { date },
      });

      const data = response.data.schedule.map(sched => {
        const past = isBefore(parseISO(sched.value), new Date());

        return {
          ...sched,
          past,
        };
      });

      setSchedule(data);
    }

    loadSchedule();
  }, [date]);

  function handlePrevDay() {
    setDate(subDays(date, 1));
  }

  function handleNextDay() {
    setDate(addDays(date, 1));
  }

  return (
    <Container>
      <header>
        <button type="button" onClick={handlePrevDay}>
          <MdChevronLeft size={40} color="#fff" />
        </button>
        <strong>{dateFormatted}</strong>
        <button type="button" onClick={handleNextDay}>
          <MdChevronRight size={40} color="#fff" />
        </button>
      </header>

      <ul>
        {schedule.map(sched => (
          // console.tron.log(sched),
          <Time key={sched.date} past={sched.past} available={sched.available}>
            <strong>{sched.hours}</strong>
            <span>{sched.user}</span>
          </Time>
        ))}
      </ul>
    </Container>
  );
}
