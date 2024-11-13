<script>

let weekrange = '';
let weekDates = []

function getWeekRange() {
    const today = new Date();
    
    const dayOfWeek = today.getDay();
    
    const daysToMonday = (dayOfWeek + 6) % 7;


    const startOfWeek = new Date(today);
    startOfWeek.setDate(today.getDate() - daysToMonday);
    
    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate() + 6);
    
    const getDayOrdinal = (day) => {
        const Ordinal = ["th", "st", "nd", "rd"];
        const value = day % 100;
        return Ordinal[(value - 20) % 10] || Ordinal[value] || Ordinal[0];
    };
    
    const formatDate = (date) => {
        const day = date.getDate();
        const month = date.toLocaleString('en-US', { month: 'short' });
        return `${month}. ${day}${getDayOrdinal(day)}`;
    };
    weekrange =  `${formatDate(startOfWeek)} - ${formatDate(endOfWeek)}, ${startOfWeek.getFullYear()}`;
}

getWeekRange();


function getWeekDatesFormatted(inputDate) {
  const date = new Date(inputDate);
  const dayOfWeek = date.getDay();
  const startOfWeek = date.getDate() - (dayOfWeek === 0 ? 6 : dayOfWeek - 1); 

  const weekDates = [];
  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  for (let i = 0; i < 7; i++) {
    const currentDay = new Date(date);
    currentDay.setDate(startOfWeek + i);

    const dayName = daysOfWeek[currentDay.getDay()];
    const formattedDate = `${dayName} ${currentDay.toLocaleDateString("en-GB", { day: "2-digit", month: "2-digit" })}`;
    weekDates.push(formattedDate);
  }

  return weekDates;
}

const date = new Date();
const week = getWeekDatesFormatted(date);

</script>

<div class="schedule-week-header">
  <div class="schedule-week-header-top">
    <div class="schedule-week-header-top-left">
      {weekrange}
    </div>
    <div class="schedule-week-header-middle">
      <a
        href="/html/schedule-day.html"
        class="schedule-week-header-day-button tooltippable tooltipText-Change-to-day-schedule"
        >Change to Day Schedule</a
      >
    </div>
    <div class="schedule-week-header-top-right">
      <button>Today</button>
      <button><i class="fa-solid fa-chevron-left"></i></button>
      <button><i class="fa-solid fa-chevron-right"></i></button>
    </div>
  </div>
  <div class="schedule-week-header-bottom">
    <div class="schedule-week-header-devices">Week 44</div>
    <a href="/html/schedule-day.html" class="schedule-week-header-day"
      > Mon 23/10</a
    >
    <a href="/html/schedule-day.html" class="schedule-week-header-day"
      >Tue 24/10</a
    >
    <a href="/html/schedule-day.html" class="schedule-week-header-day"
      >Wed 25/10</a
    >
    <a href="/html/schedule-day.html" class="schedule-week-header-day"
      >Thu 26/10</a
    >
    <a href="/html/schedule-day.html" class="schedule-week-header-day"
      >Fr 27/10</a
    >
    <a href="/html/schedule-day.html" class="schedule-week-header-day"
      >Sat 28/10</a
    >
    <a href="/html/schedule-day.html" class="schedule-week-header-day"
      >Sun 29/10</a
    >
  </div>
</div>