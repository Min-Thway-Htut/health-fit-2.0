document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('calorie-form');
  const breakfastDiv = document.getElementById('breakfast');
  const lunchDiv = document.getElementById('lunch');
  const dinnerDiv = document.getElementById('dinner');
  const snackDiv = document.getElementById('snack');

  let allBreakfasts, allLunches, allDinners, allSnacks;

  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    const totalCalories = parseInt(document.getElementById('calories').value);

    async function fetchAndParseCSV(filename) {
      const response = await fetch(filename);
      const text = await response.text();
      return Papa.parse(text, { header: true }).data;
    }

    function shuffleArray(array) {
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
      }
      return array;
    }

    function ensureCombinedCaloriesInRange(meals, targetCalories) {
      let totalCalories = 0;
      const selectedMeals = [];
      for (const meal of meals) {
        if (totalCalories + parseInt(meal.calories) <= targetCalories) {
          selectedMeals.push(meal);
          totalCalories += parseInt(meal.calories);
        }
      }
      return selectedMeals;
    }

    function displaySuggestions(suggestions, div) {
      div.innerHTML = '';
      suggestions.forEach(suggestion => {
        const mealName = suggestion.meal;
        const mealCalories = suggestion.calories;
        const suggestionDiv = document.createElement('div');
        suggestionDiv.textContent = `${mealName} - ${mealCalories} calories`;
        div.appendChild(suggestionDiv);
      });
    }

    if (!allBreakfasts) {
      allBreakfasts = await fetchAndParseCSV('breakfast.csv');
      allBreakfasts = shuffleArray(allBreakfasts);
    }
    if (!allLunches) {
      allLunches = await fetchAndParseCSV('lunch.csv');
      allLunches = shuffleArray(allLunches);
    }
    if (!allDinners) {
      allDinners = await fetchAndParseCSV('dinner.csv');
      allDinners = shuffleArray(allDinners);
    }
    if (!allSnacks) {
      allSnacks = await fetchAndParseCSV('snacks.csv');
      allSnacks = shuffleArray(allSnacks);
    }

    const breakfastCalories = Math.floor(totalCalories * 0.3);
    const lunchCalories = Math.floor(totalCalories * 0.375);
    const dinnerCalories = Math.floor(totalCalories * 0.25);
    const snackCalories = totalCalories - breakfastCalories - lunchCalories - dinnerCalories;

    const breakfastSuggestions = ensureCombinedCaloriesInRange([...allBreakfasts], breakfastCalories);
    const lunchSuggestions = ensureCombinedCaloriesInRange([...allLunches], lunchCalories);
    const dinnerSuggestions = ensureCombinedCaloriesInRange([...allDinners], dinnerCalories);
    const snackSuggestions = ensureCombinedCaloriesInRange([...allSnacks], snackCalories);

    displaySuggestions(breakfastSuggestions, breakfastDiv);
    displaySuggestions(lunchSuggestions, lunchDiv);
    displaySuggestions(dinnerSuggestions, dinnerDiv);
    displaySuggestions(snackSuggestions, snackDiv);
  });
});








