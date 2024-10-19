let navigationHistory = ['home'];

function init() {
    showCategories(); 
}


function navigate(page, param = '') {
    let state = { page: page, param: param };
    let title = '';
    let url = '';

    switch(page) {
        case 'home':
            title = 'Home';
            url = '/';
            showCategories();
            break;
        case 'category':
            title = param + ' Category';
            url = '/category/' + param;
            showCategoryDetail(param);
            break;
        case 'meal':
            title = 'Meal Details';
            url = '/meal/' + param;
            showMealDetail(param);
            break;
     
    }

    navigationHistory.push(page);
    history.pushState(state, title, url);
    document.title = 'mealapp - ' + title;
}


window.addEventListener('popstate', function(event) {
    if (navigationHistory.length > 1) {
        navigationHistory.pop();
        let previousPage = navigationHistory[navigationHistory.length - 1];
        if (event.state) {
            navigate(previousPage, event.state.param);
        } else {
            navigate(previousPage);
        }
    } else {
        navigate('home');
    }
});

function handleLogoClick(event) {
    event.preventDefault();
    navigationHistory = ['home'];
    navigate('home');
}


$('.navbar-brand').on('click', handleLogoClick);

function showLoading() {
    $('#content').html('<div class="text-center"><div class="spinner-border" role="status"><span class="visually-hidden">Loading...</span></div></div>');
}
function showCategories() {
    showLoading();
    $.ajax({
        url: 'https://www.themealdb.com/api/json/v1/1/categories.php',
        method: 'GET',
        success: function(response) {
            let categories = response.categories;
            let categoriesHtml = '<div class="row">';
            categories.forEach(function(category) {
                categoriesHtml += `
                    <div class="col-md-3 mb-4">
                        <div class="card">
                            <img src="${category.strCategoryThumb}" class="card-img-top" alt="${category.strCategory}">
                            <div class="card-body">
                                <h5 class="card-title">${category.strCategory}</h5>
                                <a href="#" class="btn btn-primary" onclick="navigate('category', '${category.strCategory}')">View Meals</a>
                            </div>
                        </div>
                    </div>
                `;
            });
            categoriesHtml += '</div>';
            $('#content').html(categoriesHtml);
        },
        error: function(xhr, status, error) {
            $('#content').html('<div class="alert alert-danger">Error loading categories</div>');
        }
    });
}$(document).ready(function() {
    $('.navbar-brand').on('click', handleLogoClick);
    init(); 
});
function goBack() {
    if (navigationHistory.length > 1) {
        navigationHistory.pop(); 
        let previousPage = navigationHistory.pop(); 
        navigate(previousPage); 
    } else {
        navigate('home');
    }
}