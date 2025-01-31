import { format, isToday, isYesterday } from 'date-fns';
import { StyledDay } from '../styles/ChatPage.styled';

type DayProps = {
  day: Date;
};

function Day({ day }: DayProps) {
  function renderDate() {
    if (isToday(day)) return 'Today';
    if (isYesterday(day)) return 'Yesterday';
    return format(day, 'dd/MM/yy');
  }

  return (
    <StyledDay>
      <p title={format(day, 'd MMMM y')}>{renderDate()}</p>
    </StyledDay>
  );
}

export default Day;
