<script>
    
let weekrange = '';
let weekDates = []

//import TimeSlotCard from "./timeslot"


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


function ScheduleDates(date){
    const startOfWeek = date.getDate() - date.getDate() +  1; 
    const days = [];

    for (let i = 0; i < 7; i++) {
        const currentDay = new Date(date.setDate(startOfWeek + i))
        days.push(new Date(currentDay));
    }

    return days;
}
const date = Date();
const week = ScheduleDates(date)

const monday = week[0];
console.log(monday);

</script>


    <div class="grid-container">
      <div class="main-content">
        <div class="schedule-week">
          <!--HEADER-->
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
                > j</a
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
          <div class="schedule-week-schema">
            <div class="schedule-week-schema-row">
              <div class="schedule-week-schema-row-device">Reception Left</div>
              <div class="schedule-week-schema-row-day">
                <div class="schedule-week-schema-row-item-add">
                  <i class="fa-solid fa-plus"></i>
                </div>
              </div>
              <div class="schedule-week-schema-row-day">
               
              </div>
              <div class="schedule-week-schema-row-day">
                
                <div class="schedule-week-schema-row-item-add">
                  <i class="fa-solid fa-plus"></i>
                </div>
              </div>
              <div class="schedule-week-schema-row-day">
                
                <div class="schedule-week-schema-row-item-add">
                  <i class="fa-solid fa-plus"></i>
                </div>
              </div>
              <div class="schedule-week-schema-row-day">
                
                <div class="schedule-week-schema-row-item-add">
                  <i class="fa-solid fa-plus"></i>
                </div>
              </div>
              <div class="schedule-week-schema-row-day">
               
                <div class="schedule-week-schema-row-item-add">
                  <i class="fa-solid fa-plus"></i>
                </div>
              </div>
              <div class="schedule-week-schema-row-day">
                <div class="schedule-week-schema-row-item-add">
                  <i class="fa-solid fa-plus"></i>
                </div>
              </div>
            </div>
            <div class="schedule-week-schema-row">
              <div class="schedule-week-schema-row-device">Reception Right</div>
              <div class="schedule-week-schema-row-day">
                

                <div class="schedule-week-schema-row-item-add">
                  <i class="fa-solid fa-plus"></i>
                </div>
              </div>
              <div class="schedule-week-schema-row-day">
                <div class="schedule-week-schema-row-item-add">
                  <i class="fa-solid fa-plus"></i>
                </div>
              </div>
              <div class="schedule-week-schema-row-day">
                
                <div class="schedule-week-schema-row-item-add">
                  <i class="fa-solid fa-plus"></i>
                </div>
              </div>
              <div class="schedule-week-schema-row-day">
                
                <div class="schedule-week-schema-row-item-add">
                  <i class="fa-solid fa-plus"></i>
                </div>
              </div>
              <div class="schedule-week-schema-row-day">
                
                <div class="schedule-week-schema-row-item-add">
                  <i class="fa-solid fa-plus"></i>
                </div>
              </div>
              <div class="schedule-week-schema-row-day">

                
                <div class="schedule-week-schema-row-item-add">
                  <i class="fa-solid fa-plus"></i>
                </div>
              </div>
              <div class="schedule-week-schema-row-day">
                
                <div class="schedule-week-schema-row-item-add">
                  <i class="fa-solid fa-plus"></i>
                </div>
              </div>
            </div>
            <div class="schedule-week-schema-row">
              <div class="schedule-week-schema-row-device">
                Reception Middel
              </div>
              <div class="schedule-week-schema-row-day">
                
                <div class="schedule-week-schema-row-item-add">
                  <i class="fa-solid fa-plus"></i>
                </div>
              </div>
              <div class="schedule-week-schema-row-day">
                
                <div class="schedule-week-schema-row-item-add">
                  <i class="fa-solid fa-plus"></i>
                </div>
              </div>
              <div class="schedule-week-schema-row-day">
                
                <div class="schedule-week-schema-row-item-add">
                  <i class="fa-solid fa-plus"></i>
                </div>
              </div>
              <div class="schedule-week-schema-row-day">
                
                <div class="schedule-week-schema-row-item-add">
                  <i class="fa-solid fa-plus"></i>
                </div>
              </div>
              <div class="schedule-week-schema-row-day">
                
                <div class="schedule-week-schema-row-item-add">
                  <i class="fa-solid fa-plus"></i>
                </div>
              </div>
              <div class="schedule-week-schema-row-day">
                
               
                <div class="schedule-week-schema-row-item-add">
                  <i class="fa-solid fa-plus"></i>
                </div>
              </div>
              <div class="schedule-week-schema-row-day">
                
                <div class="schedule-week-schema-row-item-add">
                  <i class="fa-solid fa-plus"></i>
                </div>
              </div>
            </div>
            <div class="schedule-week-schema-row">
              <div class="schedule-week-schema-row-device">Restaurant</div>
              <div class="schedule-week-schema-row-day res-week-add-here">
                
                <div class="schedule-week-schema-row-item-add res-add">
                  <i class="fa-solid fa-plus"></i>
                </div>
              </div>
              <div class="schedule-week-schema-row-day">
                
                <div class="schedule-week-schema-row-item-add">
                  <i class="fa-solid fa-plus"></i>
                </div>
              </div>
              <div class="schedule-week-schema-row-day">
                
                <div class="schedule-week-schema-row-item-add">
                  <i class="fa-solid fa-plus"></i>
                </div>
              </div>
              <div class="schedule-week-schema-row-day">
                
                <div class="schedule-week-schema-row-item-add">
                  <i class="fa-solid fa-plus"></i>
                </div>
              </div>
              <div class="schedule-week-schema-row-day">
               
                <div class="schedule-week-schema-row-item-add">
                  <i class="fa-solid fa-plus"></i>
                </div>
              </div>
              <div class="schedule-week-schema-row-day">
               
                <div class="schedule-week-schema-row-item-add">
                  <i class="fa-solid fa-plus"></i>
                </div>
              </div>
              <div class="schedule-week-schema-row-day">
                <div class="schedule-week-schema-row-item-add">
                  <i class="fa-solid fa-plus"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>


 <style>
    @import "./page.css";
</style>