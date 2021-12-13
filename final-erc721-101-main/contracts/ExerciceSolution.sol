pragma solidity ^0.6.0;
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";


contract ExerciceSolution is ERC721 {
    

    
    
    mapping(uint => uint) public legs;
    mapping(uint => string) public name;
    mapping(uint => bool) public wings;
    mapping(uint => uint) public sex;

    uint public counter = 1;

    constructor(string memory name_, string memory symbol_, address address_to, uint256 id_token) public ERC721(name_, symbol_){

        _mint (address_to, id_token);

    }
    

    function isBreeder(address account) external returns (bool){

        return true;
    }

	function registrationPrice() external returns (uint256){

        return 3;
    }

	function registerMeAsBreeder() public payable{
        return;
    }

    function getCounter() public view returns (uint256){

        return counter;

    }

	function declareAnimal(string memory _name, bool _wings,uint _legs ,uint _sex) public returns (uint256){

        
        counter += 1;

        sex[counter] = _sex;
        legs[counter] = _legs;
        name[counter] = _name;
        wings[counter] = _wings;

        _mint (msg.sender, counter);


        return counter;
    }
    function declareAnimalForMe(uint _sex, uint _legs, bool _wings, string memory _name, address address_to ) public returns (uint256) {

        counter += 1;

        sex[counter] = _sex;
        legs[counter] = _legs;
        name[counter] = _name;
        wings[counter] = _wings;

        _mint (address_to, counter);

        return counter;


    }

	function getAnimalCharacteristics(uint animalNumber) public returns (string memory _name, bool _wings, uint _legs, uint _sex){
        _name = name[animalNumber];
        _wings = wings[animalNumber];
        _legs = legs[animalNumber];
        _sex = sex[animalNumber];

    }

	function declareDeadAnimal(uint animalNumber) external{
        return;
    }




}