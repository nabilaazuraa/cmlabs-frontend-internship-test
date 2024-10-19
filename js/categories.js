function showCategories() {
    showLoading();
    $.ajax({
        url: 'https://www.themealdb.com/api/json/v1/1/categories.php',
        method: 'GET',
        success: function(response) {
            let output = '<div class="row g-4">';
            response.categories.forEach(function(category) {
                output += `
                    <div class="col-6 col-md-4 col-lg-3">
                        <div class="category-card" onclick="navigate('category', '${category.strCategory}')">
                            <img src="${category.strCategoryThumb}" alt="${category.strCategory}">
                            <div class="category-overlay">
                                <h5>${category.strCategory}</h5>
                            </div>
                        </div>
                    </div>
                `;
            });
            output += '</div>';
            $('#content').html(output);
        },
        error: function(xhr, status, error) {
            $('#content').html('<div class="alert alert-danger">Error loading categories. Please try again.</div>');
        }
    });
}