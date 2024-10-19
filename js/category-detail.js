function showCategoryDetail(category) {
    showLoading();
    $.ajax({
        url: `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`,
        method: 'GET',
        success: function(response) {
            let meals = response.meals;
            let mealsHtml = `
                <h2>${category} Meals</h2>
                <button class="btn btn-secondary mb-3" onclick="goBack()">Back to Categories</button>
                <div class="row">
            `;
            meals.forEach(function(meal) {
                mealsHtml += `
                    <div class="col-md-3 mb-4">
                        <div class="card">
                            <img src="${meal.strMealThumb}" class="card-img-top" alt="${meal.strMeal}">
                            <div class="card-body">
                                <h5 class="card-title">${meal.strMeal}</h5>
                                <a href="#" class="btn btn-primary" onclick="navigate('meal', '${meal.idMeal}')">View Details</a>
                            </div>
                        </div>
                    </div>
                `;
            });
            mealsHtml += '</div>';
            $('#content').html(mealsHtml);
        },
        error: function(xhr, status, error) {
            $('#content').html('<div class="alert alert-danger">Error loading meals</div>');
        }
    });
}