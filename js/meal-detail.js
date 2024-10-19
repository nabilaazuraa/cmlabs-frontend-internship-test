function showMealDetail(mealId) {
    $.ajax({
        url: `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`,
        method: 'GET',
        success: function(response) {
            const meal = response.meals[0];
            let ingredients = '';
            for (let i = 1; i <= 20; i++) {
                if (meal[`strIngredient${i}`]) {
                    ingredients += `<li>${meal[`strIngredient${i}`]} - ${meal[`strMeasure${i}`]}</li>`;
                }
            }
            let output = `
                <div class="meal-detail">
                    <h2>${meal.strMeal}</h2>
                    <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
                    <h3>Ingredients:</h3>
                    <ul>${ingredients}</ul>
                    <h3>Instructions:</h3>
                    <p>${meal.strInstructions}</p>
                    ${meal.strYoutube ? `<h3>Video Tutorial:</h3>
                    <iframe width="560" height="315" src="https://www.youtube.com/embed/${meal.strYoutube.split('v=')[1]}" frameborder="0" allowfullscreen></iframe>` : ''}
                </div>
            `;
            $('#content').html(output);
        },
        error: function(xhr, status, error) {
            $('#content').html('<div class="alert alert-danger">Error loading meal details. Please try again.</div>');
        }
    });
}