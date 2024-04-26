const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhNTAzYWNjMTdhZjRhN2RhNDIzMGFjNzJiMTMxNGM5NSIsInN1YiI6IjY2MjhkYmI5ZTI5NWI0MDE4NzlkZjZkZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Orq013qKSJNxThVzu1GCoS-V1LS-I2iQ7REkBIzBtKw'
  }
};
let obj = {};
let targetdata = {};
fetch('https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1', options)
  .then(response => response.json())
  .then(data => {
    obj = data.results;
    console.log(data);
    targetdata = obj;
    makeCard();
  })
  .catch(err => console.error(err));

function makeCard() {
  targetdata.forEach(element => {
    document.querySelector('.row').innerHTML += `
            <div class="movie-card" id="${element.id}" onclick="alert('영화 ID: ${element.id}')"">
                <div class="card">
                    <img src=${`https://image.tmdb.org/t/p/w400` + element.backdrop_path} class="card-img-top" art="...">
                    <div class="card-body">
                        <h4 class="card-title" id="card-title">${element.title}</h4>
                        <p class="card-text">${element.overview}</p>
                        <p class="card-text"><small class="text-body-secondary">${`Rating : ` + element.vote_average}</small></p>
                    </div>
                </div>
            </div>
  `
  })
  console.log(obj);
}

function findCard() {
  let name = document.getElementById('moviefind').value;
  name = name.toLowerCase();
  //데이터 없이 입력했을 경우
  if (name === '') {
    for (let i = 0; i < targetdata.length; i++) {
      document.querySelector('.movie-card').remove();
    }
    targetdata = null;
    targetdata = obj;
    makeCard();
  }

  else {
    let foundname = obj.filter(item => item.title.toLowerCase().includes(name));
    for (let j = 0; j < targetdata.length; j++) {
      document.querySelector('.movie-card').remove();
    }
    if (foundname === null) {
      targetdata = null;
      targetdata = obj;
    }
    else {
      targetdata = '';
      targetdata = foundname;
      makeCard();
    }
  }
}

function clickenter() {
  //keycode 13은 enter key임
  if (window.event.keyCode == 13) {
    //버튼의 아이디를 가져와 해당 버튼을 클릭한 것과 같은 효과
    document.getElementById("button-addon2").onclick();
  }
}

document.getElementById("moviefind").focus();

// let btn = document.querySelector('.movie-card');

// btn.addEventListener('click', function() {
//   alert("클릭");
// });