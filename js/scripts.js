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
        item.imageUrl = details.sprites.front_default;
        item.height = details.height;
        //loop for each ofthe pokemon types.
        //Also changing the background color depend on each pokemon type.
        item.types = [];
        for (var i = 0; i < details.types.length; i++) {
          item.types.push(details.types[i].type.name);
        }
        if (item.types.includes("grass")) {
          $("#modal-container").css("background-color", "#7b912b");
        } else if (item.types.includes("fire")) {
          $("#modal-container").css("background-color", "#7a2114");
        } else if (item.types.includes("psychic")) {
          $("#modal-container").css("background-color", "#6e0855");
        } else if (item.types.includes("poison")) {
          $("#modal-container").css("background-color", "#040505");
        } else if (item.types.includes("water")) {
          $("#modal-container").css("background-color", "#124963");
        } else if (item.types.includes("bug")) {
          $("#modal-container").css("background-color", "#c75a00");
        } else if (item.types.includes("rock")) {
          $("#modal-container").css("background-color", "#c7a665");
        } else if (item.types.includes("flying")) {
          $("#modal-container").css("background-color", "#456b42");
        } else if (item.types.includes("electric")) {
          $("#modal-container").css("background-color", "#c9b909");
        } else if (item.types.includes("ice")) {
          $("#modal-container").css("background-color", "#a1bdc9");
        } else if (item.types.includes("ghost")) {
          $("#modal-container").css("background-color", "#ebebeb");
        } else if (item.types.includes("ground")) {
          $("#modal-container").css("background-color", "#523007");
        } else if (item.types.includes("fairy")) {
          $("#modal-container").css("background-color", "#7a637d");
        } else if (item.types.includes("steel")) {
          $("#modal-container").css("background-color", "#969696");
        }
        //loop to get the abilities of a selected pokemon
        item.abilities = [];
        for (var i = 0; i < details.abilities.length; i++) {
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
    var $modalContainer = $("#exampleModalCenter");
    //clear existing content of the model
    $modalContainer.empty();
    //creating div element in DOM
    //adding class to div DOM element
    var modal = $('<div class="modal fade"></div>');
    //creating closing button in modal content
    var closeButtonElement = $('<button class="modal-close">Close</button>');
    // adding event listener to close modal when clicked on button
    closeButtonElement.on("click", hideModal);
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
    modal.append(closeButtonElement);
    modal.append(nameElement);
    modal.append(imageElement);
    modal.append(heightElement);
    modal.append(weightElement);
    modal.append(typesElement);
    modal.append(abilitiesElement);
    $modalContainer.append(modal);
    //adds class to show the modal
    $modalContainer.addClass("is-visible");
  }
  //hides modal when clicked on close button
  function hideModal() {
    var $modalContainer = $("#exampleModalCenter");
    $modalContainer.removeClass("is-visible");
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
