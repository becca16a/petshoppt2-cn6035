// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "truffle/Assert.sol";
import "truffle/DeployedAddresses.sol";
import "../contracts/Adoption.sol";

contract TestAdoption {
    // The address of the adoption contract to be tested
    Adoption adoption = Adoption(DeployedAddresses.Adoption());

    // The id of the pet that will be used for testing
    uint expectedPetId = 8;

    function testUserCanAdoptPet() public {
        uint returnedId = adoption.adopt(expectedPetId);
        Assert.equal(returnedId, expectedPetId, "Adoption of the expected pet should match what is returned.");
    }

    function testGetAdopterAddressByPetId() public {
        address adopter = adoption.adopters(expectedPetId);
        Assert.notEqual(adopter, address(0), "Owner of the expected pet should not be the empty address.");
    }

    function testGetAdopterAddressByPetIdInArray() public {
        // Store adopters in memory rather than storage
        address[16] memory adopters = adoption.getAdopters();
        Assert.equal(adopters[expectedPetId], address(this), "Owner of the expected pet should be this contract");
    }
}