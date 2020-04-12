/*jshint esversion: 6*/
var pokemonRepository = (function() {
  var repository = [];
  var apiUrl = "https://pokeapi.co/api/v2/pokemon/?limit=900";
  function add(pokemon) {
    if (
      typeof pokemon === "object" &&
      "name" in pokemon &&
      "detailsUrl" in pokemon
    ) {
      repository.push(pokemon);
    } else {
      console.log("add an object");
    }
  }
  function getAll() {
    return repository;
  }
  function addListItem(pokemon) {
    var $pokemonList = $(".pokemon-list");
    var $listItem = $("<li>");
    // var button = document.createElement("button");
    // button.innerText = pokemon.name;
    // button.classList.add("my-class");
    var $button = $('<button type="button" class="my-class btn btn-block" data-toggle="modal" data-target="#exampleModalCenter">' + pokemon.name + "</button>");
    $listItem.append($button);
    $pokemonList.append($listItem);
    $button.on("click", function(event) {
      showDetails(pokemon);
    });
  }
  function showDetails(item) {
    pokemonRepository.loadDetails(item).then(function() {
      console.log(item);
      showModal(item);
    });
  }
  function loadList() {
    return $.ajax(apiUrl)
      .then(function(json) {
        json.results.forEach(function(item) {
          var pokemon = {
            name: item.name,
            detailsUrl: item.url
          };
          add(pokemon);
          console.log(pokemon);
        });
      })
      .catch(function(e) {
        console.error(e);
      });
  }

  function loadDetails(item) {
    var url = item.detailsUrl;
    return $.ajax(url)
      .then(function(details) {
        // Now we add the details to the item
        item.imageUrl = details.sprites.back_default;
        item.height = details.height;
        //loop for each ofthe pokemon types.
        //Also changing the background color depend on each pokemon type.
        item.types = [];
        for (var i = 0; i < details.types.length; i++) {
          item.types.push(details.types[i].type.name);
        }

        //loop to get the abilities of a selected pokemon
        item.abilities = [];
        for (i = 0; i < details.abilities.length; i++) {
          item.abilities.push(details.abilities[i].ability.name);
          // item.abilities.push('slot: ' + details.abilities[i].slot);
          // item.abilities.push('is_hidden: ' + details.abilities[i].is_hidden);
        }

        item.weight = details.weight;
      })
      .catch(function(e) {
        console.error(e);
      });
  }
  // show the modal content
  function showModal(item) {
    var $modalBody = $(".modal-body");
    //clear existing content of the model
    $modalBody.empty();
    //creating div element in DOM
    //adding class to div DOM element
    var $modalContent = $('<div></div>');
    var $modalTitle = $(".modal-title");
    //clear existing content in Title
    $modalTitle.empty();
    //creating element for name in modal content
    var nameElement = $("<h1>" + item.name + "</h1>");
    // creating img in modal content
    var imageElement = $('<img class="modal-img">');
    imageElement.attr("src", item.imageUrl);
    //creating element for height in modal content
    var heightElement = $("<p>" + "height : " + item.height + "</p>");
    //creating element for weight in modal content
    var weightElement = $("<p>" + "weight : " + item.weight + "</p>");
    //creating element for type in modal content
    var typesElement = $("<p>" + "types : " + item.types + "</p>");
    //creating element for abilities in modal content
    var abilitiesElement = $("<p>" + "abilities : " + item.abilities + "</p>");
    //appending modal content to webpage
    $modalTitle.append(nameElement);
    $modalContent.append(imageElement);
    $modalContent.append(heightElement);
    $modalContent.append(weightElement);
    $modalContent.append(typesElement);
    $modalContent.append(abilitiesElement);
    $modalBody.append($modalContent);
  }
  //hides modal when clicked on close button
  function hideModal() {
  }
  //hides modal when clicked on ESC on keyboard
  jQuery(window).on("keydown", e => {
    var $modalContainer = $("#exampleModalCenter");
    if (e.key === "Escape" && $modalContainer.hasClass("is-visible")) {
      hideModal();
    }
  });
  //hides modal if clicked outside of it
  var $modalContainer = document.querySelector("#exampleModalCenter");
  $modalContainer.addEventListener("click", e => {
    var target = e.target;
    if (target === $modalContainer) {
      hideModal();
    }
  });
  return {
    add: add,
    getAll: getAll,
    addListItem: addListItem,
    loadList: loadList,
    loadDetails: loadDetails,
    showModal: showModal,
    hideModal: hideModal
  };
})();
pokemonRepository.loadList().then(function() {
  // Now the data is loaded!
  pokemonRepository.getAll().forEach(function(pokemon) {
    pokemonRepository.addListItem(pokemon);
  });
});
// pokemonRepository.loadDetails();
// pokemonRepository.loadList();

//search bar functionality
$(document).ready(function(){
  $("#myInput").on("keyup", function() {
    var value = $(this)
      .val()
      .toLowerCase();
    $("#myList *").filter(function() {
      $(this).toggle(
        $(this)
          .text()
          .toLowerCase()
          .indexOf(value) > -1
      );
    });
  });
});
