document.addEventListener('DOMContentLoaded', function() {

    getFirst()
  
    loadMore.addEventListener('click', handleClick)
    loadMoreSearch.addEventListener('click', handleClickSearch)
     
    var selectBoxes = document.querySelectorAll('select'); //Drop down Box
    M.FormSelect.init(selectBoxes);  

    var slider = document.querySelectorAll('.slider');
    M.Slider.init(slider);

    var nav = document.querySelectorAll('.sidenav');
    M.Sidenav.init(nav);
     
    var carousel = document.querySelectorAll('.carousel');
    M.Carousel.init(carousel, {
        indicators: true
    }); 

    //Autoplay for Carousel
    //autoplay(); 

          
    var tab = document.querySelectorAll('.tabs');
    M.Tabs.init(tab, {
              
              swipeable: false
             
       });
       

      var fixedAction = document.querySelectorAll('.fixed-action-btn');
      M.FloatingActionButton.init(fixedAction);
      
       var parallax = document.querySelectorAll('.parallax');
      M.Parallax.init(parallax);
      
      var mod = document.querySelectorAll('.modal');
      M.Modal.init(mod, {
                  
                  startingTop: '4%'
                 
           });
       
     window.addEventListener('scroll', reveal);       
      $(window).scroll(function() {      
       var scroll = $(window).scrollTop();
       if (scroll > 100) {
          $('nav').addClass('displayNav');
          $('nav ul a').addClass('displayBlack');
          $('nav a').addClass('displayBlack');
          
        } else {
          $('nav').removeClass('displayNav');
          $('nav ul a').removeClass('displayBlack');
          $('nav a').removeClass('displayBlack');
        }
      });
     
   })

function autoplay() {
    $('.carousel').carousel('next');
    setTimeout(autoplay, 5000);
}

let latestDoc = null;

let limitNumber = 4

const getFirst = async () => {

  var marketplaceListings = document.getElementById("post");

  const ref = db.collection('marketplace').orderBy("created", "desc").limit(limitNumber);

  const data = await ref.get()

  if (data.docs.length < limitNumber) {
    $('.load-more button').hide();
    $('.load-more-search button').hide();

  }

  else {

    $('.load-more button').show();
    $('.load-more-search button').hide();
  }

  data.docs.forEach(doc => {
    
    var itemId = doc.id
    var title = doc.data().title;
    // var titleArray = doc.data().title;
    // var title = titleArray.join(" ")
    var description = doc.data().description;
    var url = doc.data().url;
    var company = doc.data().company;
    var grade = doc.data().grade;
    var price = doc.data().price;
    var contact = doc.data().contact;
    var dateCreated = doc.data().created;
    var date = dateCreated.toDate();
    console.log(date)
      var mm = date.getMonth() + 1;
    console.log(mm)
      var dd = date.getDate();
    console.log(dd)
      var yyyy = date.getFullYear();
    var created = dd + '/' + mm + '/' + yyyy;
    //var created = dateCreated.toDate().toDateString()

//<button class=\"btn waves-effect waves-light\">Message Seller</button>     
//<span class=\"whatsapp\"><a target=\"_blank\" href=\"http://wa.me/65${contact}\"><img width=\'36px\' src=\'https://i.imgur.com/LD6Td0j.png\'>${contact}</a></span> 
//<img class=\'logoCard\' src=\"https://i.imgur.com/IPkTog5.png\"> After card-content and before description
// <h6 class="grey-text text-lighten-1">${created}</h6> 
  var marketplaceListing = `
      <div class = "col m6 s12">
        <div class="card z-depth-3 horizontal">
          <div class="card-image">
            <img class=\"materialboxed\" src=${url} style="max-height: 360px;">
          </div>
          <div class="card-stacked">
            <div class="card-content">
              
              <h6 class="grey-text text-darken-4 capitalize">${title}</h6>
              <h5 class="red-text"><span class="gradeBorder"><b>${company} ${grade}</b></span></h5>
              <h5 id=\"${itemId}\"><span class="green-text gradeBorder"><b>S$${price}</b></span></h5> 
              <p class="grey-text text-darken-4 capitalize"><i>${description}</i></p> 
              <p class="grey-text">Posted: ${created}</p> 
              <h6 class=\'ig\'>
                <a target=\"_blank\" href=\"https://ig.me/m/${contact}\"><img style=\'vertical-align: middle;\'width=\'36px\' src=\'https://www.instagram.com/favicon.ico\'>   <span class=\'hide-on-small-only\'><u><i>${contact}</i></u></span></a>
              </h6>
             
              <div class=\'ebayLogo\'>          
                <a href=\"https://www.ebay.com/sch/i.html?_from=R40&_nkw=${title}&LH_PrefLoc=2&_sop=1&mkcid=1&mkrid=711-53200-19255-0&siteid=0&campid=5338798454&toolid=11800&mkevt=1\" target=\"_blank\"><img src=\'https://i.imgur.com/iuj69Yp.png\' alt=\'ebay\'></a> 
              </div>
            </div>
          </div>                                                            
        </div>
    </div>   
      `                                                                 
                                                                 
  marketplaceListings.innerHTML += marketplaceListing;
  
  

  if (price == 0) {

      document.getElementById(itemId).style.display ='none';
    }
  

  });

window.latestDoc = data.docs[data.docs.length - 1]

loadMore.addEventListener('click', handleClick)
$('#linearLoader').hide();
$('.fixedDiv').hide();

  var materialboxed = document.querySelectorAll('.materialboxed');
  M.Materialbox.init(materialboxed); 


}


const getNext = async () => {


  const ref = db.collection('marketplace').orderBy("created", "desc").startAfter(window.latestDoc).limit(limitNumber);

  const data = await ref.get()

  var listingsDataArray = []
  
  var marketplaceListings = document.getElementById("post");

  data.docs.forEach(doc => {
    
    var itemId = doc.id
    var title = doc.data().title;
    // var titleArray = doc.data().title;
    // var title = titleArray.join(" ")
    var description = doc.data().description;
    var url = doc.data().url;
    var company = doc.data().company;
    var grade = doc.data().grade;
    var price = doc.data().price;
    var contact = doc.data().contact;
    var created = doc.data().created;
    
  var marketplaceListing = `
      <div class = \"col m6 s12\">
        <div class=\"card z-depth-3 horizontal\">
          <div class=\"card-image\">
            <img class=\"materialboxed\" src=${url} style=\"max-height: 350px;\">
          </div>
          <div class="card-stacked">
            <div class="card-content">
              <h6 class="grey-text text-darken-4 capitalize">${title}</h6>
              <h5 class="red-text"><span class="gradeBorder"><b>${company} ${grade}</b></span></h5>
              <h5 id=\"${itemId}\"><span class="green-text gradeBorder"><b>S$${price}</b></span></h5> 
              <p class="grey-text text-darken-4 capitalize"><i>${description}</i></p>  
              <h6 class=\'ig\'>
                <a target=\"_blank\" href=\"https://ig.me/m/${contact}\"><img style=\'vertical-align: middle;\'width=\'36px\' src=\'https://www.instagram.com/favicon.ico\'>   <span class=\'hide-on-small-only\'><u><i>${contact}</i></u></span></a>
              </h6>

              <br> 
              <div class=\'ebayLogo\'>          
                <a href=\"https://www.ebay.com/sch/i.html?_from=R40&_nkw=${title}&LH_PrefLoc=2&_sop=1&mkcid=1&mkrid=711-53200-19255-0&siteid=0&campid=5338798454&toolid=11800&mkevt=1\" target=\"_blank\"><img src=\'https://i.imgur.com/iuj69Yp.png\' alt=\'ebay\'></a> 
              </div>
            </div>
          </div>                                                            
        </div>
    </div>   
      `
                                                                 
                                                                 
    marketplaceListings.innerHTML += marketplaceListing;

    if (price == 0) {

      document.getElementById(itemId).style.display ='none';
    }
  

  });

  

  //update latest latest doc    
  window.latestDoc = data.docs[data.docs.length - 1]


  if (data.empty || data.docs.length < limitNumber) {

    loadMore.removeEventListener('click', handleClick)
    $('.load-more button').hide();
     
  }


$('#linearLoader').hide();
$('.fixedDiv').hide();
    var materialboxed = document.querySelectorAll('.materialboxed');
  M.Materialbox.init(materialboxed); 


}

  const loadMore = document.querySelector('.load-more button');
  const loadMoreSearch = document.querySelector('.load-more-search button');

  const handleClick = () => {
      //console.log("Clicked")
       getNext()

    }  

  const handleClickSearch = () => {
      //console.log("Search Clicked")
       getNextSearch()

    } 


function delay(fn, ms) {
let timer = 0
return function(...args) {
  clearTimeout(timer)
  timer = setTimeout(fn.bind(this, ...args), ms || 0)
}
}

$('#search').keyup(delay(function (e) {

  var searchTerm = $(this).val().toLowerCase();   

  if (searchTerm == "") {
    var marketplaceListings = document.getElementById("post");
    marketplaceListings.innerHTML = ''
    getFirst()

  }

  else {searchMarketplace(searchTerm)}

  
  
    
}, 500));

const searchMarketplace = async (searchTerm) => {

  window.searchTerm = searchTerm
  //console.log(searchTerm)

  $('.load-more button').hide();
  $('.load-more-search button').show();    
;
  const ref = db.collection('marketplace').where("searchTerms", "array-contains", searchTerm).orderBy("created", "desc").limit(limitNumber);

  const data = await ref.get()
  
  var marketplaceListings = document.getElementById("post");
  marketplaceListings.innerHTML = ''

  data.docs.forEach(doc => {
    
    var itemId = doc.id
    var title = doc.data().title;
    // var titleArray = doc.data().title;
    // var title = titleArray.join(" ")
    var description = doc.data().description;
    var url = doc.data().url;
    var company = doc.data().company;
    var grade = doc.data().grade;
    var price = doc.data().price;
    var contact = doc.data().contact;
    var created = doc.data().created;
    
  var marketplaceListing = `
      <div class = "col m6 s12">
        <div class="card z-depth-3 horizontal">
          <div class="card-image">
            <img class=\"materialboxed\" src=${url} style="max-height: 350px;">
          </div>
          <div class="card-stacked">
            <div class="card-content">
              <h6 class="grey-text text-darken-4 capitalize">${title}</h6>
              <h5 class="red-text"><span class="gradeBorder"><b>${company} ${grade}</b></span></h5>
              <h5 id=\"${itemId}\"><span class="green-text gradeBorder"><b>S$${price}</b></span></h5> 
              <p class="grey-text text-darken-4 capitalize"><i>${description}</i></p>  
              <h6 class=\'ig\'>
                <a target=\"_blank\" href=\"https://ig.me/m/${contact}\"><img style=\'vertical-align: middle;\'width=\'36px\' src=\'https://www.instagram.com/favicon.ico\'>   <span class=\'hide-on-small-only\'><u><i>${contact}</i></u></span></a>
              </h6>

              <br> 
              <div class=\'ebayLogo\'>          
                <a href=\"https://www.ebay.com/sch/i.html?_from=R40&_nkw=${title}&LH_PrefLoc=2&_sop=1&mkcid=1&mkrid=711-53200-19255-0&siteid=0&campid=5338798454&toolid=11800&mkevt=1\" target=\"_blank\"><img src=\'https://i.imgur.com/iuj69Yp.png\' alt=\'ebay\'></a> 
              </div>
            </div>
          </div>                                                            
        </div>
    </div>   
      `
                                                                 
                                                                 
    marketplaceListings.innerHTML += marketplaceListing;

    if (price == 0) {

      document.getElementById(itemId).style.display ='none';
    }

  

  });

  
  loadMoreSearch.addEventListener('click', handleClickSearch)

  //update latest latest doc    
  window.latestDoc = data.docs[data.docs.length - 1]

   if (data.empty || data.docs.length < limitNumber) {

    loadMoreSearch.removeEventListener('click', handleClickSearch)
    $('.load-more-search button').hide();
     
  }

$('#linearLoader').hide();
$('.fixedDiv').hide();
    var materialboxed = document.querySelectorAll('.materialboxed');
  M.Materialbox.init(materialboxed); 


}


const getNextSearch = async () => {


  const ref = db.collection('marketplace').where("searchTerms", "array-contains", window.searchTerm).orderBy("created", "desc").startAfter(window.latestDoc).limit(limitNumber);

  const data = await ref.get()
  
  var marketplaceListings = document.getElementById("post");

  data.docs.forEach(doc => {
    
    var itemId = doc.id
    var title = doc.data().title;
    // var titleArray = doc.data().title;
    // var title = titleArray.join(" ")
    var description = doc.data().description;
    var url = doc.data().url;
    var company = doc.data().company;
    var grade = doc.data().grade;
    var price = doc.data().price;
    var contact = doc.data().contact;
    var created = doc.data().created;
    
  var marketplaceListing = `
      <div class = "col m6 s12">
        <div class="card z-depth-3 horizontal">
          <div class="card-image">
            <img class=\"materialboxed\" src=${url} style="max-height: 350px;">
          </div>
          <div class="card-stacked">
            <div class="card-content">
              <h6 class="grey-text text-darken-4 capitalize">${title}</h6>
              <h5 class="red-text"><span class="gradeBorder"><b>${company} ${grade}</b></span></h5>
              <h5 id=\"${itemId}\"><span class="green-text gradeBorder"><b>S$${price}</b></span></h5> 
              <p class="grey-text text-darken-4 capitalize"><i>${description}</i></p> 
              <h6 class=\'ig\'>
                <a target=\"_blank\" href=\"https://ig.me/m/${contact}\"><img style=\'vertical-align: middle;\'width=\'36px\' src=\'https://www.instagram.com/favicon.ico\'>   <span class=\'hide-on-small-only\'><u><i>${contact}</i></u></span></a>
              </h6>

              <br> 
              <div class=\'ebayLogo\'>          
                <a href=\"https://www.ebay.com/sch/i.html?_from=R40&_nkw=${title}&LH_PrefLoc=2&_sop=1&mkcid=1&mkrid=711-53200-19255-0&siteid=0&campid=5338798454&toolid=11800&mkevt=1\" target=\"_blank\"><img src=\'https://i.imgur.com/iuj69Yp.png\' alt=\'ebay\'></a> 
              </div>
            </div>
          </div>                                                            
        </div>
    </div>   
      `
                                                                 
                                                                 
    marketplaceListings.innerHTML += marketplaceListing;

    if (price == 0) {

      document.getElementById(itemId).style.display ='none';
    }

  

  });

  

  //update latest latest doc    
  window.latestDoc = data.docs[data.docs.length - 1]

  if (data.empty || data.docs.length < limitNumber) {

    loadMoreSearch.removeEventListener('click', handleClickSearch)
    $('.load-more-search button').hide();
     
  }


$('#linearLoader').hide();
$('.fixedDiv').hide();
    var materialboxed = document.querySelectorAll('.materialboxed');
  M.Materialbox.init(materialboxed); 


}

// function searchMarketplace (value, data){  

//   var filteredData = []

//   for (var i=0; i <data.length; i++) {
  
//     value = value.toLowerCase()
  
  
//     //change 
//     var name = data[i][0].toLowerCase()   
  
  
//     if(name.includes(value)) {
  
//       filteredData.push(data[i])
  
//     }
    
//   }
//   window.filteredData = filteredData
//   return filteredData

// }

function marketplaceListings (data) {

var listingsDataArray = []

data.forEach(doc => {
  
  var description = doc.data().description;
  var url = doc.data().url;
  var company = doc.data().company;
  var grade = doc.data().grade;
  var price = doc.data().price;
  var contact = doc.data().contact;
  var created = doc.data().created;

  var listingData = [description, url, company, grade, price, contact, created]
  listingsDataArray.push(listingData)



});
window.listingsDataArray = listingsDataArray
generateMarketplace(listingsDataArray)

}     
   
function generateMarketplace (listingsArray) {

  var marketplaceListings = document.getElementById("post");
  marketplaceListings.innerHTML = ''
  
  for (var i = 0; i < listingsArray.length; i++) {
    var description = listingsArray[i][0];    
    var url = listingsArray[i][1];
    var company = listingsArray[i][2];
    var grade = listingsArray[i][3]; 
    var price = listingsArray[i][4];
    var contact = listingsArray[i][5];
    var created = listingsArray[i][6];
    
  var marketplaceListing = `
      <div class = "col m6 s12">
        <div class="card z-depth-3 horizontal">
          <div class="card-image">
            <img src=${url} style="max-height: 350px;">
          </div>
          <div class="card-stacked">
            <div class="card-content">
              <h6 class="grey-text text-darken-4">${description}</h6>
              <h5 class="red-text"><span class="gradeBorder"><b>${company} ${grade}</b></span></h5>
              <h5><span class="boPrice">S$${price}</span></h5>  
              <a target=\"_blank\" href=\"https://ig.me/m/${contact}"><button class=\"btn waves-effect waves-light\">Message Seller</button></a>
              <br>  
              <br>           
              <a href=\"https://www.ebay.com/sch/i.html?_from=R40&_nkw=${title}&LH_PrefLoc=2&_sop=1&mkcid=1&mkrid=711-53200-19255-0&siteid=0&campid=5338798454&toolid=11800&mkevt=1\" target=\"_blank\"><img src=\'https://i.imgur.com/iuj69Yp.png\' alt=\'ebay\'></a> 
            </div>
          </div>                                                            
        </div>
    </div>   
      `
                                                                 
                                                                 
  marketplaceListings.innerHTML += marketplaceListing;
   }


  $('#linearLoader').hide();
  $('.fixedDiv').hide();
       

};


$('#sorting').on('change', function(){
     var search = document.getElementById("search").value;

     if (search.length === 0) {
        var data = window.listingsDataArray

     }
     else {

       var data = window.filteredData
     }       

      switch($('#sorting option:selected').val()) {
          case 'descriptionAsc':
            $('#linearLoader').show();
            data = data.sort((a,b) => a[0] > b[0] ? 1 : -1)                
            generateMarketplace(data)
            break;               

          case 'descriptionDesc':
            $('#linearLoader').show(); 
            data = data.sort((a,b) => a[0] < b[0] ? 1 : -1)                
            generateMarketplace(data)
            break;

          case 'dateAsc':
            $('#linearLoader').show();
            data = data.sort((a,b) => a[6] > b[6] ? 1 : -1)                
            generateMarketplace(data)
            break;

          case 'dateDesc':
            $('#linearLoader').show(); 
            data = data.sort((a,b) => a[6] < b[6] ? 1 : -1)                
            generateMarketplace(data)
            break;

          case 'priceAsc':
            $('#linearLoader').show();
            data = data.sort((a,b) => a[4] > b[4] ? 1 : -1)                
            generateMarketplace(data)
            break;

          case 'priceDesc':
            $('#linearLoader').show();
            data = data.sort((a,b) => a[4] < b[4] ? 1 : -1)                
            generateMarketplace(data)
            break;                                                                
          default: console.log ("default")
      }
  }); 


  function reveal(){
    var reveals = document.querySelectorAll('.reveal');

    for(var i = 0; i < reveals.length; i++){

      var windowheight = window.innerHeight;
      var revealtop = reveals[i].getBoundingClientRect().top;
      var revealpoint = 150;

      if(revealtop < windowheight - revealpoint){
        reveals[i].classList.add('active');
      }
//       else{
//          reveals[i].classList.remove('active');
//        }
    }
  }


  function userClickedMessage (){
  
  

    
    var toValidate = {
      
      formEmail: "Email is Required",
      formMessage: "Message is Required",

    };   
    
    var idKeys = Object.keys(toValidate);
    
    var allValid = true;
    
    idKeys.forEach(function(id){
       var isValid = checkIfValid(id,toValidate[id]);     
       if(!isValid){
          allValid = false;
       
       }
    
    });
    

    
    if(allValid){
        
        submitMessage();
    
    }
     
  }
  
  
  function checkIfValid(elID,message){
  
     var isValid = document.getElementById(elID).checkValidity();
     
   
     if(!isValid){
       //warn the user
       M.toast({html: message});
      
       return false;
       }
       return true;  
   }
   
   function openForm() {
        document.getElementById("myForm").style.display = "block";
    }
  
    function closeForm() {
      document.getElementById("myForm").style.display = "none";
    }   
    
    function closeForm1() {
      document.getElementById("submitted").style.display = "none";
    }   
       
   
   
function submitMessage () {

  var userInfoMessage = {};  //userInfo is an Object with properties
      
      userInfoMessage.formName = document.getElementById("formName").value;
      userInfoMessage.formEmail = document.getElementById("formEmail").value;
      userInfoMessage.formMessage = document.getElementById("formMessage").value;
     

      google.script.run.sendMessage (userInfoMessage);
      document.getElementById("myForm").style.display = "none";
      document.getElementById("submitted").style.display = "block";
   

}     