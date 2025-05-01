App = {
  web3Provider: null,
  contracts: {},

  init: async function () {
    // Load pets.
    $.getJSON('pets.json', function (data) {
      var petsRow = $('#petsRow');
      var petTemplate = $('#petTemplate');

      for (let i = 0; i < data.length; i++) {
        var petCard = petTemplate.clone();
        petCard.find('.panel-title').text(data[i].name);
        petCard.find('img').attr('src', data[i].picture);
        petCard.find('.pet-breed').text(data[i].breed);
        petCard.find('.pet-age').text(data[i].age);
        petCard.find('.pet-location').text(data[i].location);
        petCard.find('.adopt-btn').attr('data-id', data[i].id);

        petsRow.append(petCard.html());
      }
    });

    return await App.initWeb3();
  },

  initWeb3: async function () {
    if (window.ethereum) {
      App.web3Provider = window.ethereum;
      try {
        await window.ethereum.request({ method: "eth_requestAccounts" });
      } catch (error) {
        console.error("User denied account access");
      }
    } else if (window.web3) {
      App.web3Provider = window.web3.currentProvider;
    } else {
      App.web3Provider = new Web3.providers.HttpProvider('http://localhost:7545');
    }
    web3 = new Web3(App.web3Provider);

    return App.initContract();
  },

  initContract: function () {
    $.getJSON("contracts/Adoption.json", function(data) {
      var AdoptionArtifact = data;
      App.contracts.Adoption = TruffleContract(AdoptionArtifact);
      App.contracts.Adoption.setProvider(App.web3Provider);

      App.markAdopted();
    });

    return App.bindEvents();
  },

  bindEvents: function () {
    $(document).on('click', '.adopt-btn', App.handleAdopt);
  },

  markAdopted: function () {
    App.contracts.Adoption.deployed().then(function (instance) {
      return instance.getAdopters.call();
    }).then(function (adopters) {
      for (let i = 0; i < adopters.length; i++) {
        if (adopters[i] !== '0x0000000000000000000000000000000000000000') {
          $('.panel-pet').eq(i).find('button').text('Success').attr('disabled', true);
        }
      }
    }).catch(function (err) {
      console.log(err.message);
    });
  },

  handleAdopt: function (event) {
    event.preventDefault();

    var petId = parseInt($(event.target).data('id'));

    web3.eth.getAccounts(function (error, accounts) {
      if (error) {
        console.log(error);
      }

      var account = accounts[0];

      App.contracts.Adoption.deployed().then(function (instance) {
        return instance.adopt(petId, { from: account });
      }).then(function () {
        return App.markAdopted();
      }).catch(function (err) {
        console.log(err.message);
      });
    });
  }
};

$(function () {
  App.init();
});

