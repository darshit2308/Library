const addBook=document.querySelector(".newBook");
const formContainer=document.querySelector(".formContainer");
const body=document.querySelector("body");
const submitButton=document.querySelector(".submit");
const resetButton=document.querySelector(".reset");
const closeDialog=document.querySelector(".closeDialog");

addBook.addEventListener('click', () => {
    formContainer.showModal();
});


closeDialog.addEventListener('click', () => {
    formContainer.close();
});

const myLibrary=[];

function Book(title,author,pages,read) {
    this.title=title;
    this.author=author;
    this.pages=pages;
    this.read=read;
}

Book.prototype.info = function(){
    return `${this.title} `;
}
Book.prototype.writer = function(){
    return `${this.author}`;
}
Book.prototype.number = function(){
    return `${this.pages}`;
}
Book.prototype.right = function(){
    return `${this.read}`;
}

Book.prototype.toggleReadStatus = function(){
    this.read = !this.read;  // On toggling the button,read status is changed.
}

function addBookToLibrary(title,author,pages,read) {
    
    const newBook= new Book(title,author,pages,read);
    myLibrary.push(newBook);
    displayLibrary();
}
function displayLibrary() {
    const library = document.querySelector(".library");
    library.innerHTML=""; // We created a section in which details of books will be added.
    
    myLibrary.forEach((book,index) => {
        const bookDiv = document.createElement("div");
        bookDiv.classList.add("book");

        const info=document.createElement("p");
        info.textContent="Title: ";
        info.textContent += book.info();
        bookDiv.appendChild(info);

        const writer=document.createElement("p");
        writer.textContent="Author: ";
        writer.textContent += book.writer();
        bookDiv.appendChild(writer);

        const number=document.createElement("p");
        number.textContent="Pages: ";
        number.textContent += book.number();
        bookDiv.appendChild(number);

        const right=document.createElement("p");
        right.classList.add("option");
        right.textContent="Status: ";
        if(book.right() == "true") right.textContent += "✔ (Read)";
        else    right.textContent += "✕ (Not Read)";

        bookDiv.appendChild(right);
        
        const removeButton = document.createElement("button");
        removeButton.textContent = "Remove";
        removeButton.classList.add("remove");

        removeButton.addEventListener('click', () => {
            myLibrary.splice(index,1);
            displayLibrary();
        });
        bookDiv.appendChild(removeButton);

        const toggleButton = document.createElement("button");
        if(book.right() == "true")  
        {
            toggleButton.textContent = "Not Read";
            bookDiv.classList.add("readed");
        }
        else    
        {
            toggleButton.textContent = "Read";
            bookDiv.classList.add("notReaded");
        }
        toggleButton.classList.add("toggleRead");

        toggleButton.addEventListener('click' , () => {
            book.toggleReadStatus();
            displayLibrary();
        })
        bookDiv.appendChild(toggleButton);
        library.appendChild(bookDiv);
    });
}

submitButton.addEventListener('click' , (event) => {

    event.preventDefault();

    const title=document.querySelector("#title").value;
    const author=document.querySelector("#author").value;
    const pages=document.querySelector("#pages").value;
    const read=document.querySelector("#read").checked;

    addBookToLibrary(title,author,pages,read);

    document.querySelector("#title").value='';
    document.querySelector("#author").value='';
    document.querySelector("#pages").value='';
    document.querySelector("#read").checked= false;

    formContainer.close();

});


/*          For Changing of Dark Mode           */

let mode = document.querySelector(".myMode");
let cnt=0;
mode.addEventListener( 'click', () => {
    if(cnt % 2 == 0){
        body.style.backgroundColor = "white";
        console.log("white -> Black done");
    }
    else{
        body.style.backgroundColor = "black";
        console.log("black -> white done");
    }
    cnt++;
});

