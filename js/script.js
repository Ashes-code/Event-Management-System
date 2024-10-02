let localData = localStorage.getItem('attendeeNames');
let attendeeNames = !localData ? [] : JSON.parse(localData);
let addbtn = document.getElementById('add-btn');
let addinput = document.getElementById('add-input');
let error1 = document.getElementById('error1');
let error11 = document.getElementById('error11');
let searchinput = document.getElementById('search-input');
let error2 = document.getElementById('error2');
let error21 = document.getElementById('error21');
let searchbtn = document.getElementById('search-btn');
let searchoutput = document.getElementById('search-output');
let listbtn = document.getElementById('list-btn');
let listspace = document.getElementById('list-div');
let removeattendee = document.getElementById('remove-input');
let error3 = document.getElementById('error3');
let error31 = document.getElementById('error31');
let removebtn = document.getElementById('remove-btn');
let removediv = document.getElementById('remove-div');



addbtn.addEventListener('click', () => {
  let nameinputed = addinput.value.trim().toUpperCase();
  let regexp = /^[a-zA-Z ]*$/;

  if (nameinputed == "") {
    error1.style.display = 'block';
    error11.style.display = 'none';
  } else if (!regexp.test(nameinputed)) {
    error11.style.display = 'block';
    error1.style.display = 'none';
    let addinput = document.getElementById('add-input');
    addinput.addEventListener('input', () => {
      error1.style.display = 'none';
      error11.style.display = 'none';
    });
  } else {
    let attendee = attendeeNames.find(x => x.name === nameinputed);
    
    if (attendee) {
      alert("Attendee has already RSVP'd");
    } else {

      let attendeeRecord = {
        name: nameinputed
      };

      attendeeNames.push(attendeeRecord);
      updateLocalStorage();
      addinput.value = "";
      alert('Attendee added successfully');
    }
  }
});


function updateLocalStorage() {
  localStorage.setItem('attendeeNames', JSON.stringify(attendeeNames));
}


searchbtn.addEventListener('click', () => {

  let searchValue = searchinput.value.trim().toUpperCase();
  let regexp = /^[a-zA-Z ]*$/;
  
  if (searchValue == "") {
    error2.style.display = 'block';
    error21.style.display = 'none';
    searchoutput.textContent = '';
  } else if (!regexp.test(searchValue)) {
    error21.style.display = 'block';
    error2.style.display = 'none';
    searchoutput.textContent = '';
  } else {
    let searchResult = attendeeNames.find(x => x.name === searchValue);
    let index = attendeeNames.findIndex(x => x.name === searchValue);

    if (searchResult) {
      searchoutput.textContent = `Attendee found: ${searchResult.name} at seat position ${index + 1}`;
      error2.style.display = 'none';
      error21.style.display = 'none';
    } else {
      error21.style.display = 'block';
      error2.style.display = 'none';
      searchoutput.textContent = '';
    }
  }
});


listbtn.addEventListener('click', () => {
  let listspace = `<ol>`;
  attendeeNames.forEach((attendee, index) => {
    listspace += `<li>${attendee.name}</li>`;
  });
  listspace += `</ol>`;
  document.getElementById('list-div').innerHTML = listspace;
});



removebtn.addEventListener('click', () => {
  let removeValue = removeattendee.value.trim().toUpperCase();
  let regexp = /^[a-zA-Z ]*$/;

  if (removeValue == "") {
    error3.style.display = 'block';
    error31.style.display = 'none';
  } else if (!regexp.test(removeValue)) {
    error31.style.display = 'block';
    error3.style.display = 'none';
  } else {
    let removeResult = attendeeNames.find(x => x.name === removeValue);
    
    if (removeResult){
      attendeeNames = attendeeNames.filter(x => x.name !== removeValue);

      updateLocalStorage();
      removediv.textContent = `Attendee: ${removeResult.name} has been removed`;
      error3.style.display = 'none';
      error31.style.display ='none';
    }
    else {
      error31.style.display = 'block';
      error3.style.display = 'none';
      removediv.textContent = '';
    }
  }
});