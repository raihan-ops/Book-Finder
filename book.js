

const getBook = () => {
    const inputValueText = document.getElementById('inputBox');
    const inputValue = inputValueText.value;
    if (inputValue === '') {
        alert('Your Input is Empty')
    }
    else {
        const url = `https://openlibrary.org/search.json?q=${inputValue}`;
        fetch(url)
            .then(responce => responce.json())
            .then(data => displayData(data, inputValue))
            .catch(error => displayErorr(error));

        inputValueText.value = '';



    }




}
document.getElementById('errorMassage').style.display = 'none';
const displayErorr = error => {
    document.getElementById('errorMassage').style.display = 'block';
}
const displayData = (details, text) => {


    // console.log(details.numFound);
    const display = document.getElementById('displayField')
    display.textContent = '';

    // Showing search result .....................................................................
    const result = document.getElementById('resultField')
    result.textContent = '';
    const p = document.createElement('p');
    p.innerHTML = `<p class="text-danger fw-bold"> ${details.numFound} Result Found Of <span class="text-success">"${text}" </span></p>`
    result.appendChild(p);

    const books = details.docs;


// get each item value........................................
    books.forEach(book => {


        const BookName = book.title;
        const authorName = book.author_name;
        const bookPublisher = book.publisher;

        const FirstPublish = book.first_publish_year;


        const imgUrl = book.cover_i;
        const div = document.createElement("div");
        div.classList.add("col");
        div.innerHTML = `

        <div class="card border border-2 border-dark rounded-3 mx-auto" >
        <img src="https://covers.openlibrary.org/b/id/${imgUrl}-M.jpg" class="card-img-top rounded-3  w-50 mt-2 mx-auto " alt="...">
        <div class="card-body">
        <h4 class="card-title"> ${BookName}</h4>
        <p class="card-text"><span class="fw-bold">Author Name: </span>${authorName}</p>
        <p class="card-text"><span class="fw-bold">Publisher: </span>${bookPublisher}</p>
        <p class="card-text"><span class="fw-bold">First Publish Year: </span>${FirstPublish}</p>
        
          </div>
      </div>`
        display.appendChild(div);

    });

}

