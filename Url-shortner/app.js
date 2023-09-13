const token = "503bf5006708dc769617c571f07206858ef8c018";
const button = document.querySelector("#shorten");
const input = document.querySelector("#input-field");
const longUrl = document.querySelector("#input-url");
const shortUrl = document.querySelector("#new-url");
const resultDiv = document.querySelector("#output-div")
const errorDiv = document.querySelector("#error-div");
const errorMessage = document.querySelector("#error-text");
const clearButton = document.querySelector("#clear-btn");
const copyButton = document.querySelector("#copy-btn");


button.addEventListener("click", (event) => {
  event.preventDefault();
  if(input.value) {
    shorten(input.value);
  } else {
    showError();
    hideResult();
  }
})


const handleError = (response) => {
  console.log(response);
  if(!response.ok) {
    errorMessage.textContent = "Please enter a valid URL."
    showError();
    hideResult();
  } else {
  hideError();
  return response;
  }
}


const shorten = (input) => {
  fetch("https://api-ssl.bitly.com/v4/shorten", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${token}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({"long_url": input, "domain": "bit.ly"})
  })
  .then(handleError)
  .then(response => response.json())
  .then((json) => {
    shortUrl.innerHTML = json.link;
    showResult();
  })
  .catch(error => {
    console.log(error);
  })
}




const clipboard = new ClipboardJS("#copy-btn");

clipboard.on('success', function(e) {
    console.info('Action:', e.action);
    console.info('Text:', e.text);
    console.info('Trigger:', e.trigger);

    e.clearSelection();
});

clipboard.on('error', function(e) {
    console.error('Action:', e.action);
    console.error('Trigger:', e.trigger);
});


const clearFields = () => {
  input.value = '';
  hideResult();
  hideError();
}

clearButton.addEventListener("click", (event) => {
  event.preventDefault();
  clearFields();
})



const showResult = () => {
  shortUrl.style.display = "flex";
}

const hideResult = () => {
  shortUrl.style.display = "none";
}

const showError = () => {
  errorDiv.style.display = "block";
}

const hideError = () => {
  errorDiv.style.display = "none";
}