//begins (function() {
  var pokemonRepository = (function () {
    var repository = [];
    var apiUrl = 'strainapi.evanbusse.com/EHDvJvQ/strains/data/desc/STRAIN_ID'; //api key
    var $strainList = $('ul');
    var $modalcontainer = $('#modal-container')

    //adds new pokemon to repository
    function add(strain) {
      repository.push(strain);
    }
    //function to return pokemon object array
    function getAll() {
      return repository;
    }
    //function to add list for each strain
    function addListItem(strain) {
      var $listItem = $('<li></li>');
      var $button = $('<button type="button" class="strain-button"');
      $strainList.append($listItem);
      $listItem.append($button);
      $button.on('click', function() {
        showDetails(strain)
      });
    }
    //function to load strain list from API
    function loadList() {
      return $.ajax(apiUrl, {dataType: 'json'}).then(function(responseJSON) {
        return responseJSON;
      }).then(function(json) {
        json.results.forEach(function(strain) {
          var strain = {
            name: strain.name,
            detailsUrl: strain.url
          };
          add(strain);
        });
      }).catch(function(e) {
        console.error(e);
      })
    }
    function loadDetails(strain) {
      var url = strain.detailsUrl;
      return $.ajax(url, {dataType: 'json'}).then(function(responseJSON) {
        return responseJSON;
      }).then(function(details) {
        strain.race = details.race;
        strain.effect = details.effect;
        strain.flavor = details.flavor;
      }).catch(function (e) {
        console.error(e);
      });
    }
    //create modal
    function showModal(strain) {
      $('#modal-container')
        .empty()
        .append('<div class="modal"></div>');
      $('.modal')
        .append('<button class=:"modal-close"></button>')
        .append('<h1 class="strain-name"></h1>')
        .append('<p class="strain-race"></p>')
        .append('<p class="strain-effect"></p>')
        .append('<p class="strain-flavor"></p>');

      $('#modal-container').addClass('is-visible');
    }
      //function to close modal
      function hideModal() {
        $('#modal-container').removeClass('is-visible');
    }
  })

  return {
    add: add,
    getAll: getAll,
    addListItem: addListItem,
    showDetails: showDetails,
    loadList: loadList,
    loadDetails: loadDetails,
    showModal: showModal,
    hideModal: hideModal
  };
}());
//end of iife
strainRepository.loadList().then(function() {
  //data loaded
  strainRepository.getAll().forEach(function(strain) {
    strainRepository.addListItem(strain);
  });
});
