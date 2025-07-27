const todayDate = document.getElementById('todayDate');
const progressCount = document.getElementById('progressCount');
const habitList = document.getElementById('habitList');
const addHabitBtn = document.getElementById('addHabitBtn');
const settingsBtn = document.getElementById('settingsBtn');
const lightModeBtn = document.getElementById('lightModeBtn');

// Monday = 0 ... Sunday = 6  (so it matches our M T W T F S S order)
const TODAY_IDX = (new Date().getDay() + 6) % 7;

const habits = [
  { name: "Morning Workout", streak: 7, done: false },
  { name: "Read 30 Minutes", streak: 3, done: false },
  { name: "Meditation", streak: 14, done: false }
];

// Show today's date
todayDate.textContent = new Date().toLocaleDateString('en-US', {
  weekday: 'long', month: 'short', day: 'numeric'
});

function renderHabits() {
  habitList.innerHTML = "";
  let completed = 0;

  habits.forEach((habit) => {
    const card = document.createElement('div');
    card.className = 'habit-card';

    // Header
    const header = document.createElement('div');
    header.className = 'habit-header';

    const name = document.createElement('span');
    name.className = 'habit-name';
    name.textContent = habit.name;

    const streak = document.createElement('span');
    streak.className = 'streak';
    streak.textContent = `🔥 ${habit.streak} days`;

    const markBtn = document.createElement('button');
    markBtn.className = 'mark-btn';
    markBtn.textContent = habit.done ? '✓ Done' : 'Mark Done';
    markBtn.style.color = habit.done ? "#2CB67D" : "#7f5af0";
    markBtn.onclick = () => {
      habit.done = !habit.done;
      if (habit.done) habit.streak += 1; // simple streak bump
      renderHabits();
    };

    header.appendChild(name);
    header.appendChild(streak);
    header.appendChild(markBtn);

    // Week row (days + dots stacked = aligned)
    const weekRow = document.createElement('div');
    weekRow.className = 'week-row';

    const daysArr = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];
    daysArr.forEach((dayLetter, i) => {
      const dayColumn = document.createElement('div');
      dayColumn.className = 'day-column';

      const day = document.createElement('span');
      day.className = 'week-day';
      day.textContent = dayLetter;

      const dot = document.createElement('div');
      dot.className = 'week-dot';
      // If this habit is marked done, turn *today's* dot green
      if (habit.done && i === TODAY_IDX) {
        dot.classList.add('active');
      }

      dayColumn.appendChild(day);
      dayColumn.appendChild(dot);
      weekRow.appendChild(dayColumn);
    });

    card.appendChild(header);
    card.appendChild(weekRow);
    habitList.appendChild(card);

    if (habit.done) completed++;
  });

  progressCount.textContent = `${completed}/${habits.length}`;
}

renderHabits();

// Add new habit (streak starts at 0)
addHabitBtn.onclick = () => {
  const name = prompt("Enter habit name:");
  if (name) {
    habits.push({ name, streak: 0, done: false });
    renderHabits();
  }
};

// Upcoming features alerts
settingsBtn.onclick = () =>
  alert("Settings will be added in upcoming updates!");
lightModeBtn.onclick = () =>
  alert("Light mode will be added in upcoming updates!");
