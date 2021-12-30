<template>
  <div class="container mx-auto py-4 px-6">
    <div class="bg-white rounded-lg shadow overflow-hidden">
      <div class="flex items-center justify-between py-4 px-6">
        <div>
          <span v-text="month_names[month]" class="text-lg font-bold text-gray-800"/>
          <span v-text="year" class="ml-1 text-lg text-gray-600 font-normal"/>
        </div>
        <div class="border rounded-lg px-1 pt-1">
          <button type="button"
                  class="leading-none rounded-lg transition ease-in-out duration-100 inline-flex cursor-pointer hover:bg-gray-200 p-1 items-center focus:outline-none"
                  :class="{'cursor-not-allowed opacity-25': month === 0 }" :disabled="month === 0"
                  @click="month-- && getNoOfDays()">
            <ArrowLeftIcon class="h-6 w-6 text-gray-500 inline-flex leading-none"/>
          </button>
          <div class="border-r inline-flex h-6"></div>
          <button type="button"
                  class="leading-none rounded-lg transition ease-in-out duration-100 inline-flex items-center cursor-pointer hover:bg-gray-200 p-1 focus:outline-none"
                  :class="{'cursor-not-allowed opacity-25': month === 11 }" :disabled="month === 11"
                  @click="month++ && getNoOfDays()">
            <ArrowRightIcon class="h-6 w-6 text-gray-500 inline-flex leading-none"/>
          </button>
        </div>
      </div>
      <div class="-mx-1 -mb-1">
        <div class="flex flex-wrap -mb-8" style="margin-bottom: -30px;">
          <template v-for="day in days">
            <div class="px-2 py-2 w-1/7">
              <div v-text="day" class="text-gray-600 text-sm uppercase tracking-wide font-bold text-left mb-1"></div>
            </div>
          </template>
        </div>

        <div class="flex flex-wrap border-t border-l">
          <template v-for="emptyDay in emptyDays">
            <div class="text-left border-r border-b px-4 pt-2 h-32 w-1/7"></div>
          </template>
          <template v-for="(date, dateIndex) in no_of_days">
            <div class="px-4 pt-2 border-r border-b relative h-32 w-1/7">
              <div @click="showDayModal(date)" v-text="date"
                   class="inline-flex w-6 h-6 items-center justify-center cursor-pointer text-center leading-none rounded-full transition ease-in-out duration-100"
                   :class="{'bg-blue-500 text-white': isToday(date) === true, 'text-gray-700 hover:bg-blue-200': isToday(date) === false }"></div>
              <div class="overflow-y-auto mt-1 h-20">
                <template
                    v-for="event in events.filter(e => new Date(e.event_date).toDateString() ===  new Date(year, month, date).toDateString() )">
                  <div class="px-2 py-1 rounded-lg mt-1 overflow-hidden border" :class="{
												'border-blue-200 text-blue-800 bg-blue-100': event.event_theme === 'blue',
												'border-red-200 text-red-800 bg-red-100': event.event_theme === 'red',
												'border-yellow-200 text-yellow-800 bg-yellow-100': event.event_theme === 'yellow',
												'border-green-200 text-green-800 bg-green-100': event.event_theme === 'green',
												'border-purple-200 text-purple-800 bg-purple-100': event.event_theme === 'purple'
											}">
                    <p v-text="event.event_title" class="text-sm truncate leading-tight"/>
                  </div>
                </template>
              </div>
            </div>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {ArrowRightIcon, ArrowLeftIcon} from '@heroicons/vue/solid'

export default {
  name: "Calendar",
  components: {
    ArrowRightIcon,
    ArrowLeftIcon
  },
  data() {
    return {
      month_names: [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December"
      ],
      month: "",
      year: "",
      no_of_days: [],
      emptyDays: [],
      days: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],

      events: [
        {
          event_date: new Date(2021, 9, 4),
          event_title: "My Birthday :)",
          event_theme: "red"
        },

        {
          event_date: new Date(2021, 11, 25),
          event_title: "Xmas Day",
          event_theme: "green"
        },
        {
          event_date: new Date(2021, 9, 31),
          event_title: "Halloween",
          event_theme: "yellow"
        },
        {
          event_date: new Date(2021, 11, 31),
          event_title: "New Years Eve",
          event_theme: "yellow"
        }
      ],

      themes: [
        {
          value: "blue",
          label: "Blue Theme"
        },
        {
          value: "red",
          label: "Red Theme"
        },
        {
          value: "yellow",
          label: "Yellow Theme"
        },
        {
          value: "green",
          label: "Green Theme"
        },
        {
          value: "purple",
          label: "Purple Theme"
        }
      ],

      openModal: false
    };
  },
  methods: {
    initDate() {
      let today = new Date();
      this.month = today.getMonth();
      this.year = today.getFullYear();
    },

    isToday(date) {
      const today = new Date();
      const d = new Date(this.year, this.month, date);

      return today.toDateString() === d.toDateString();
    },

    // Show what's planned for that day
    showDayModal(day) {
      console.log(this.month, day);
    },

    getNoOfDays() {
      let i;
      let daysInMonth = new Date(this.year, this.month + 1, 0).getDate();

      // find where to start calendar day of week
      let dayOfWeek = new Date(this.year, this.month).getDay();
      let emptyDaysArray = [];
      for (i = 1; i <= dayOfWeek; i++) {
        emptyDaysArray.push(i);
      }

      let daysArray = [];
      for (i = 1; i <= daysInMonth; i++) {
        daysArray.push(i);
      }

      this.emptyDays = emptyDaysArray;
      this.no_of_days = daysArray;
    }
  },
  mounted() {
    this.initDate();
    this.getNoOfDays();
    console.log(this.events);
  }
}
</script>

<style scoped>

</style>
