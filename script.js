$('.search-button').on('click', function(){
    $.ajax({
        url: 'http://www.omdbapi.com/?apikey=3e54c178&s=' + $('.input-keyword').val(),
        success: results => {
            const movies = results.Search;
            let cards = '';
    
            movies.forEach(m => {
                cards += showCards(m);
            });
    
            $('.movie-container').html(cards);
    
            $('.modal-detail-button').on('click', function() {
                
                $.ajax({
                    url: 'http://www.omdbapi.com/?apikey=3e54c178&i=' + $(this).data('imdbid'),
                    success: m => {
                        const movieDetail = showDetail(m);
    
                                        $('.modal-body').html(movieDetail);
                                        },
                                        error: (e) => {
                                            console.log(e.responseText);
                                        }
    
                });
    
            });
    
        },
        error: (e) => {
            console.log(e.responseText);
        }
    });
});




function showCards(m) {
    return `<div class="col-md-4 mr-3 mt-4 my-3">
                <div class="card">
                    <img src="${m.Poster}" class="card-img-top">
                    <div class="card-body">
                    <h5 class="card-title">${m.Title}</h5>
                    <h6 class="card-subtitle mb-2 text-body-secondary">${m.Year}</h6>
                    <a href="#" class="btn btn-primary modal-detail-button" data-bs-toggle="modal" data-bs-target="#movieDetailModal" data-imdbid="${m.imdbID}">See Details</a>
                    </div>
                </div>
            </div>`;
}

function showDetail(m) {
    return  ` <div class="container-fluid">
                    <div class="row">
                        <div class="col-md-3">
                            <img src="${m.Poster}" class="img-fluid">
                        </div>
                        <div class="col-md">
                            <ul class="list-group">
                                <li class="list-group-item"><h4>${m.Title} | ${m.Year}</h4></li>
                                <li class="list-group-item"><strong>${m.Director}</strong></li>
                                <li class="list-group-item"><strong>${m.Actors}</strong></li>
                                <li class="list-group-item"><strong>Plot : <br></strong>${m.Plot}</li>
                                <li class="list-group-item"><strong>${m.Runtime}</strong></li>
                            </ul>
                        </div>
                    </div>
                </div>`;
}