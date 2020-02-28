//begins (function() {
  var strainRepository = (function () {
    var repository = [];
    var apiUrl = 'https://strainapi.evanbusse.com/EHDvJvQ/strains/search/all'; //api key

    //adds new strain to repository
    function add(strain) {
      repository.push(strain);
    }
    //function to return strain object array
    function getAll() {
      return repository;
    }
    //function to show details of each strain
    function showDetails(strain) {
      strainRepository.loadList(strain).then(function() {
        showModal(strain);
      });
    }
    //function to add list for each strain
    function addListItem(strain) {
      var $listItem = $('<li></li>');
      var $button = $('<button type="button" id="strain-button" class="button" data-toggle="modal" data-target=".modalContainer">' + strain.name + '</button>');
      $listItem.append($button);
      $('.strain-list').append($listItem);

      $button.on('click', function() {
      showDetails(strain);
      });
    }
    //function to load strain list from API
    function loadList() {
      return $.ajax(apiUrl, {dataType: 'json'})
      .then(function(strains) {
        // console.log(strain)
        /*Replace fetch with ajax*/
        $.each(strains, function(strainName) {
          const strainObj = {
            ...strains[strainName],
            name: strainName
          };
          add(strainObj);
        });
      })
      .catch(function(error) {
        console.error(error);
      });
    }
    //create modal
    function showModal(strain) {
      var modalContainer = $('.modal-container');
      var modalTitle = $('.modal-title');
      var modalBody = $('.modal-body');
      modalContainer.append(modalTitle);
      modalTitle.append(modalBody);
      modalTitle.empty();
      modalBody.empty();

    //creating name element in modal
    var nameElement = $('<h1>' + strain.name + '</h1>');
    //creating race elemement
    var raceElement = $('<p>' + strain.race + '</p>');
    //creating flavor element
    var flavorElement = $('<p>' + strain.flavor + '<p>');
    //creating effects element
    var effectsElement = $('<p>' + strain.effects + '</P>');

    //append modal content
    modalTitle.append(nameElement);
    modalBody.append(raceElement);
    modalBody.append(flavorElement);
    modalBody.append(effectsElement);
    }
      //function to close modal
      //function hideModal() {
        //$('.modal-container').removeClass('is-visible');
    //}


  return {
    add: add,
    getAll: getAll,
    addListItem: addListItem,
    showDetails: showDetails,
    loadList: loadList,
    showModal: showModal,
    //hideModal: hideModal
  };
}());
//end of iife
strainRepository.loadList().then(function() {
  //data loaded
  strainRepository.getAll().forEach(function(strain) {
    strainRepository.addListItem(strain);
  });
});
