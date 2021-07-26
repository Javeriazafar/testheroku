// SPDX-License-Identifier: GPL-3.0
pragma experimental ABIEncoderV2;
pragma solidity >=0.4.20;

 //import "../TexOwner.sol";
 //use buffer 1 and 3
 
 contract AdminUser{
     
         //add fabric treatementt denim treatment like stone washing, sand washing, enzyme wash, acid wash, sandblasting, river wash, whiskers and vintage look.
        address public lastAccess;
        address public owner;
        uint public creationTime;
        bytes32 a;
        //mapping (uint=> items) itemlist;
       
       
        mapping(address => User) private usersdetail;
        address[] private userindex;
        uint count = userindex.length;
        mapping(address => uint8) authorizedCaller;

       
       
        constructor() public {
            owner = msg.sender;
              creationTime = block.timestamp;
            authorizedCaller[msg.sender] = 1;
            emit AuthorizedCaller(msg.sender);
         }
 
         struct User{
            string us_name;
            string password;
            address Createdby;
            uint creationTime;
            uint index;
            string email;
            string location;
            uint role;
   
         }
         struct Userroles{
             uint us_roles;
         }
         
         mapping(address=>uint) us_role;
         mapping(bytes32 => User) idmap;
         
       

        event OwnershipRenounced(address indexed previousOwner);
        event OwnershipTransferred(address indexed previousOwner, address indexed newOwner);
        event AuthorizedCaller(address caller);
        event DeAuthorizedCaller(address caller);
        event LogNewUser   (address indexed _userAddress, uint index,string  name, string password,  string email, uint userrole, bytes32 _hash);
        event LogUpdateUser(address indexed _userAddress, uint index,  string email, string location, string password);
        event ProduceByFarmer(uint upc);         //1

       
        modifier onlyAuthCaller(){
            lastAccess = msg.sender;
            require(authorizedCaller[msg.sender] == 1);
            _;
        }
       
        modifier Onlyowner(){
            require( msg.sender==owner);
            _;
        }
       
       
        function renounceOwnership() public {
            emit OwnershipRenounced(owner);
            owner = address(0);
        }
       
         function isOwner() public view returns (bool) {
            return msg.sender == owner;
        }
         function isUser(address _userAddress)public view  returns(bool isIndeed) {
            if(userindex.length == 0) return false;
            return (userindex[usersdetail[_userAddress].index] == _userAddress);
      }
         
         function authorizeCaller(address _caller) public Onlyowner returns(bool)
        {
            authorizedCaller[_caller] = 1;
            emit AuthorizedCaller(_caller);
            return true;
        }
       function rolesmapping(address role) public view returns(uint){
           return(us_role[role]);
       }
        /* deauthorize caller */
        function deAuthorizeCaller(address _caller) public Onlyowner returns(bool)
        {
            authorizedCaller[_caller] = 0;
            emit DeAuthorizedCaller(_caller);
            return true;
        }
       
     
        function setUser(address _userAddress, string memory us_name, string memory password, string memory  email, string memory location,uint   role) public  returns(bytes32 _a,uint index) {
            //require(authorizedCaller[msg.sender]==1);
            //authorizedCaller[msg.sender] = 0;
            //require(authorizedCaller[msg.sender]==0);
           
            require(isUser(_userAddress)==false);
           
            usersdetail[_userAddress].Createdby = msg.sender;
            usersdetail[_userAddress].creationTime= block.timestamp;
            usersdetail[_userAddress].us_name=us_name;
            usersdetail[_userAddress].password=password;
            usersdetail[_userAddress].email=email;
            usersdetail[_userAddress].location=location;
            usersdetail[_userAddress].role=role;
            us_role[_userAddress]= role;
           
            userindex.push(_userAddress);
            usersdetail[_userAddress].index = userindex.length-1;
            a= sha256(abi.encodePacked(_userAddress,us_name,location,password,email,role));
            idmap[a]=usersdetail[_userAddress];
           
           emit  LogNewUser(
            _userAddress,
            usersdetail[_userAddress].index,
            us_name,
            password,
            email,
            us_role[_userAddress],
            a
            );
           
             return (a,userindex.length-1);
        }
        //  function getUserCount() public view returns(uint index) {
        //     return userindex.length;
        //     }
           
           
        //  function getUser(address _userAddress) public  returns ( bytes32  a,
        //                                                             string memory us_name,
        //                                                               string memory password,
        //                                                               string memory  email,
        //                                                               address _Createdby,
        //                                                               uint  role)
        //     {
        //         require(isUser(_userAddress)==true);
               
        //         User memory details = usersdetail[_userAddress];
               
        //         a= sha256(abi.encodePacked(details.us_name, details.password,details.email, details.Createdby,details.creationTime));
                 
        //         idmap[a]=usersdetail[_userAddress];
        //         return (a,details.us_name, details.password,details.email,details.Createdby,us_role[_userAddress]);
        //     }  
           
        function getdata(bytes32 transactionhash) public view returns(User memory used){
             return (idmap[transactionhash]);
           
        }
        function updateUser(address _userAddress, string memory email, string memory location, string memory password) public returns(bool success) {
           
            require(isUser(_userAddress)==true) ;
            usersdetail[_userAddress].email = email;
            usersdetail[_userAddress].location = location;
            usersdetail[_userAddress].password = password;
            emit LogUpdateUser(
            _userAddress,
            usersdetail[_userAddress].index,
            email,
            location,
            password
            );
            return true;
        }  
 
     
 }
    // library Roles {
    //   struct Role {
    //     mapping (address => bool) bearer;
    //   }
   
    //   /**
      //  * @dev give an account access to this role
    //    */
    //   function add(Role storage role, address _userAddress) internal {
    //     require(_userAddress != address(0));
    //     require(!has(role, _userAddress));
   
    //     role.bearer[_userAddress] = true;
    //   }
   
    //   /**
    //    * @dev remove an account's access to this role
    //    */
    //   function remove(Role storage role, address _userAddress) internal {
    //     require(_userAddress != address(0));
    //     require(has(role, _userAddress));
   
    //     role.bearer[_userAddress] = false;
    //   }
   
    //   /**
    //    * @dev check if an account has this role
    //    * @return bool
    //    */
    //   function has(Role storage role, address _userAddress)
    //     internal
    //     view
    //     returns (bool)
    //   {
    //     require(_userAddress != address(0));
    //     return role.bearer[_userAddress];
    //   }
    // }
     
     
//  contract Supplier{
     
//       using Roles for Roles.Role;
//     uint public creationTime;
//       // Define 2 events, one for Adding, and other for Removing
//       event SupplierAdded(address indexed account);
//       event SupplierRemoved(address indexed account);
   
//       // Define a struct 'farmers' by inheriting from 'Roles' library, struct Role
//       Roles.Role private suppliers;
   
//       // In the constructor make the address that deploys this contract the 1st farmer
//       constructor() public {
//         _addSupplier(msg.sender);
//         creationTime = block.timestamp;
   
//       }
   
//       // Define a modifier that checks to see if msg.sender has the appropriate role
//       modifier onlySupplier() {
//         require(isSupplier(msg.sender));
//         _;
//       }
   
//       // Define a function 'isFarmer' to check this role
//       function isSupplier(address _userAddress) public view returns (bool) {
//         return suppliers.has(_userAddress);
//       }
   
//       // Define a function 'addFarmer' that adds this role
//       function addSupplier(address _userAddress) public onlySupplier {
//         _addSupplier(_userAddress);
//       }
   
//       // Define a function 'renounceFarmer' to renounce this role
//       function renounceSupplier() public {
//         _removeSupplier(msg.sender);
//       }
   
//       // Define an internal function '_addFarmer' to add this role, called by 'addFarmer'
//       function _addSupplier(address _userAddress) internal {
//         suppliers.add(_userAddress);
//         emit SupplierAdded(_userAddress);
//       }
   
//       // Define an internal function '_removeFarmer' to remove this role, called by 'removeFarmer'
//       function _removeSupplier(address _userAddress) internal {
//         suppliers.remove(_userAddress);
//         emit SupplierRemoved(_userAddress);
//       }

//  }
//          contract Manufacturer {
             
             
//           using Roles for Roles.Role;
         
//           // Define 2 events, one for Adding, and other for Removing
//           event ManufacturerAdded(address indexed _userAddress);
//           event ManufacturerRemoved(address indexed _userAddress);
//           address manuowner;
//           bytes32 hash;
         
         
//           // Define a struct 'distributors' by inheriting from 'Roles' library, struct Role
//           Roles.Role private distributors;
//         event LogNewUser   (address indexed _userAddress, uint index);

//           address[] private userindex;
   
//           // In the constructor make the address that deploys this contract the 1st distributor
//           constructor() public {
//               manuowner =msg.sender;
//             _addDistributor(msg.sender);
//           }
//         modifier onlyManufacturer(){
//             require(msg.sender == manuowner);
//             _;
//         }
//           // Define a modifier that checks to see if msg.sender has the appropriate role
//           modifier onlyDistributor() {
//             require(isDistributor(msg.sender));
           
//             _;
           
           
//           }
       
//           // Define a function 'isDistributor' to check this role
//           function isDistributor(address account) public view returns (bool) {
             
//             return distributors.has(account);
//           }
  
       
//     // Define a function 'addDistributor' that adds this role
//           function addDistributor(address account) public onlyDistributor {
//             _addDistributor(account);
//           }
       
//           // Define a function 'renounceDistributor' to renounce this role
//           function renounceDistributor() public {
//             _removeDistributor(msg.sender);
//           }
       
//           // Define an internal function '_addDistributor' to add this role, called by 'addDistributor'
//           function _addDistributor(address account) internal {
//             distributors.add(account);
//             emit ManufacturerAdded(account);
//           }
       
//           // Define an internal function '_removeDistributor' to remove this role, called by 'removeDistributor'
//           function _removeDistributor(address account) internal {
//             distributors.remove(account);
//             emit ManufacturerRemoved(account);
//           }
//         }
//    contract Brand {
//       using Roles for Roles.Role;
//       // Define 2 events, one for Adding, and other for Removing
//       event ConsumerAdded(address indexed account);
//       event ConsumerRemoved(address indexed account);
   
//       // Define a struct 'consumers' by inheriting from 'Roles' library, struct Role
//       Roles.Role private consumers;
//       // In the constructor make the address that deploys this contract the 1st consumer
//       constructor() public {
//         //_addConstructor(msg.sender);
//         _addConsumer(msg.sender);
//       }
   
//       // Define a modifier that checks to see if msg.sender has the appropriate role
//       modifier onlyBrand() {
//         require(isBrand(msg.sender));
//         _;
//       }
   
//       // Define a function 'isConsumer' to check this role
//       function isBrand(address account) public view returns (bool) {
//         return consumers.has(account);
//       }
   
//       // Define a function 'addConsumer' that adds this role
//       function addBrand(address account) public onlyBrand {
//         _addConsumer(account);
//       }
   
//       // Define a function 'renounceConsumer' to renounce this role
//       function renounceConsumer(address account) public {
//         _removeConsumer(account);
//       }
   
//       // Define an internal function '_addConsumer' to add this role, called by 'addConsumer'
//       function _addConsumer(address account) internal {
//         consumers.add(account);
//         emit ConsumerAdded(account);
//       }
   
//       // Define an internal function '_removeConsumer' to remove this role, called by 'removeConsumer'
//       function _removeConsumer(address account) internal {
//         consumers.remove(account);
//         emit ConsumerRemoved(account);
//       }
// }      
  contract Supplychain{
     
     
           
          // Define a variable called 'upc' for Universal Product Code (UPC),12 digit codes.
        string  upc;
        string productupc;
        uint productsku;
       
        // Define a variable called 'sku' for Stock Keeping Unit (SKU),string of alpha and numeric,unique to the companies ,8 digit
        uint  sku;
        uint placeholder; // Block number place holder
        address owner;
        // Define a public mapping 'items' that maps the UPC to an Item.
        mapping (string => Item)  items;
        mapping (string => Denim) products;
        mapping (uint256 =>Denim[])  public idToProof;
       
         // Define a public mapping 'itemsHistory' that maps the UPC to an array of TxHash,
        // that track its journey through the supply chain -- to be sent from DApp.
        mapping (string => Txblocks) itemsHistory;
        mapping (string=>address[]) public merhmap;
        //mapping()
        mapping(address=>mapping(address=>uint)) public mechsupquantity;
        // Define enum 'State' with the following values:
        enum State
        {
            ProduceBySupplier,         // 0
            ForSaleBySupplier,         // 1
            PurchasedByManufacturer,  // 2
            ShippedBySupplier,         // 3
            ReceivedByManufacturer,   // 4
            ProcessedByManufacturer,  // 5
            PackagedByManufacturer,    // 6
            ForSaleByManufacturer,    // 7
            PurchasedByBrand,         // 8
            ShippedByManufacturer,    // 9
            ReceivedByBrand// 10
        }
       
        struct Item {
            uint    sku;                    // Stock Keeping Unit (SKU)
            string    upc;                    // Universal Product Code (UPC), generated by the Farmer, goes on the package, can be verified by the Consumer
            uint creationTime;
            address ownerID;                // Metamask-Ethereum address of the current owner as the product moves through 8 stages
            address originsupplierID;         // Metamask-Ethereum address of the Farmer // ADDED PAYABLE
            string  originsupplierName;         // Farmer Name
            string  originsupplierLatitude;     // Farm Latitude
            string  originsupplierLongitude;    // Farm Longitude
            uint    productPrice;           // Product Price
            uint quantity;
            string materialtype;
            State   itemState;// Product State as represented in the enum above
            string merchandizerid;
            address manufacturerID;          // Metamask-Ethereum address of the Distributor
            address brandID;             // Metamask-Ethereum address of the Consumer // ADDED payable
        }
       
        struct Denim {
           
            string treatements;
            string productupc;
            address ownerID;
            State productstate;
            uint productsku;
            address brandID;
            string empID;
            uint256 creationTime;
            address manufacturerID;
            string merchandizerid;
            
            string  machine_id;
            string itemsUPC;

        }

       
        struct Txblocks {
            uint FTD; // blockfarmerToDistributor
            uint RTC; // blockRetailerToConsumer
            uint PM;//blockpurchsetoprocess
            uint PPA;//blockprocesstopacakge
          }
         
        State constant defaultState = State.ProduceBySupplier;
        event LogProductDetails(string _upc, string _machineid, string _employeeid);
        event logNewItem   (string _upc,string upc,uint sku, address employee, string  _originsupplierName, string  _originsupplierLatitude, string  _originsupplierLongitude,string  _materialtype, uint _price, uint  _quantity, uint256 hash );
        event lognewPurchse   (string _upc,uint time,   string _merch,uint _quantity, address originsupplierID, uint256 FTD);
        event QuantityLesserThanRequired(uint upc);
        event ProduceBySupplier(string upc);         //1
        event ForSaleBySupplier(string upc); //2
        event PurchasedByManufacturer(string upc);  //3
        event ShippedBySupplier(string upc);         //4
        event ReceivedByManufacturer(string upc);   //5
        event ProcessedByManufacturer(string upc);  //6
        event PackagedByManufacturer(string upc);   //7
        event ForSaleByManufacturer(string upc);    //8
        event PurchasedByBrand(string upc);     //13
        event ShippedByManufacturer(string upc);    //10
        event ReceivedByBrand(string upc);     //13
       
        // modifier forSaleBySupplier(string _upc) {
        // require(items[_upc].itemState == State.ForSaleBySupplier);
        // _;
        // }
        // modifier producedBySupplier(string _upc) {
        // require(items[_upc].itemState == State.ProduceBySupplier);
        // _;
        // }
        modifier verifyCaller (address _userAddress) {
        require(msg.sender == _userAddress);
        _;
        }
        // modifier purchasedByManufacturer(string _upc) {
        // require(items[_upc].itemState == State.PurchasedByManufacturer);
        // _;
        // }
       
        // modifier shippedBySupplier(string _upc) {
        // require(items[_upc].itemState == State.ShippedBySupplier);
        // _;
        // }
       
        // modifier receivedByManufacturer(string _upc) {
        // require(items[_upc].itemState == State.ReceivedByManufacturer);
        // _;
        // }
       
//         modifier processByManufacturer(string _upc) {
//         require(products[_upc].productstate == State.ProcessedByManufacturer);
//         _;
//         }
       
//         modifier packagedByManufacturer(string _upc) {
//         require(products[_upc].productstate == State.PackagedByManufacturer);
//         _;
//         }
//         modifier forSaleByManufacturer(string _upc) {
//         require(products[_upc].productstate  == State.ForSaleByManufacturer);
//         _;
//   }


//         modifier shippedByManufacturer(string _upc) {
//         require(products[_upc].productstate  == State.ShippedByManufacturer);
//         _;
//         }
       
       
//         modifier purchasedByBrand(string _upc) {
//         require(products[_upc].productstate  == State.PurchasedByBrand);
//         _;
//         }
         

       
        constructor () public  {
            owner=msg.sender;
            sku = 1;
            productsku=1;
            // Manufacturer manufacturer= new Manufacturer();
            // Supplier supplier= new Supplier();
            // Brand brand= new Brand();
        }
                   // allows you to convert an address into a payable address
         
        function itemBySupplier(string memory _upc, string memory _originsupplierName, string memory _originsupplierLatitude, string memory _originsupplierLongitude,string memory _materialtype, uint _price, uint  _quantity) public
        // check address belongs to farmerRole
        {
       
        // address manufacturerID; // Empty distributorID address
        // address brandID; // Empty consumerID address
       
        // Item memory newProduce; // Create a new struct Item in memory
        // newProduce.sku = sku;  // Stock Keeping Unit (SKU)
        // newProduce.upc = _upc; // Universal Product Code (UPC), generated by the Farmer, goes on the package, can be verified by the Consumer
        // newProduce.ownerID = msg.sender;  // Metamask-Ethereum address of the current owner as the product moves through 8 stages
        // newProduce.originsupplierID = msg.sender; // Metamask-Ethereum address of the Farmer
        // newProduce.originsupplierName = _originsupplierName;  // Farmer Name
        // newProduce.originsupplierLatitude = _originsupplierLatitude; // Farm Latitude
        // newProduce.originsupplierLongitude = _originsupplierLongitude;  // Farm Longitude
        // newProduce.productPrice = _price;  // Product Price
        // newProduce.creationTime = now;
        // newProduce.quantity = _quantity;
        // newProduce.itemState = defaultState; // Product State as represented in the enum above
       
        // newProduce.manufacturerID = manufacturerID; // Metamask-Ethereum address of the Distributor
        // newProduce.brandID = brandID; // Metamask-Ethereum address of the Consumer // ADDED payable
        items[_upc] = Item(sku,_upc,block.timestamp,msg.sender,msg.sender,_originsupplierName, _originsupplierLatitude ,_originsupplierLongitude,_price,_quantity,_materialtype,defaultState,'',address(0),address(0));

        //items[_upc] = newProduce; // Add newProduce to items struct by upc
         Txblocks memory txBlock; // create new txBlock struct
        txBlock.FTD = placeholder; // assign placeholder values
        txBlock.RTC = placeholder;
        itemsHistory[_upc] = txBlock; // add txBlock to itemsHistory mapping by upc
       

        // Increment sku
        sku = sku + 1;
           emit logNewItem   ( _upc,'null', sku,msg.sender,_originsupplierName,   _originsupplierLatitude,  _originsupplierLongitude,  _materialtype, _price,  _quantity,0);
       
        // Emit the appropriate event
        emit ProduceBySupplier(_upc);
        // emit ForSaleBySupplier(_upc);
       
       
        }
      function orderByManufacturer(string memory desc) public view returns(address orderBy,string memory description){
            return (msg.sender , desc);
      }
      function orderByBrand(string memory desc) public view returns(address orderBy,string memory description){
            return (msg.sender , desc);
      }
     
    //   function sellItemBySupplier(string memory _upc) public
    //   // check msg.sender belongs to farmerRole
    //     producedBySupplier(_upc) // check items state has been produced
    //     verifyCaller(items[_upc].ownerID) // check msg.sender is owner
    //     {
    //     items[_upc].itemState = State.ForSaleBySupplier;
    //     emit ForSaleBySupplier(_upc);
    //     }
       
        function purchaseItemByManufacturer(string memory _upc, uint quantity, string memory _merchandizerId) public  
         //producedBySupplier(_upc) // check items state has been produced
        //verifyCaller(items[_upc].ownerID) // check msg.sender is owner// check msg.sender belongs to distributorRole
        //forSaleBySupplier(_upc) // check items state is for ForSaleByFarmer
        {
        // transfer funds from distributor to farmer
        items[_upc].ownerID = msg.sender; // update owner
        items[_upc].manufacturerID = msg.sender; // update distributor
       
        items[_upc].itemState = State.PurchasedByManufacturer; // update state
        items[_upc].merchandizerid=_merchandizerId;
        //items[_upc].itemState = State.ReceivedByManufacturer; // update state
       //mechsupquantity[_merchandizerId][items[_upc].originsupplierID]=quantity;
       merhmap[_merchandizerId].push(items[_upc].originsupplierID);
        itemsHistory[_upc].FTD = block.number; // add block number
      //emit ForSaleBySupplier(_upc);
        emit lognewPurchse   (_upc,block.timestamp,_merchandizerId, quantity,items[_upc].originsupplierID,itemsHistory[_upc].FTD);
       
        emit PurchasedByManufacturer(_upc);
       
       
        //0xAb8483F64d9C6d1EcF9b849Ae677dD3315835cb2
        //0x4B20993Bc481177ec7E8f571ceCaE8A9e22C02db
        //0x78731D3Ca6b7E34aC0F824c42a7cC18A495cabaB
        //0x617F2E2fD72FD9D5503197092aC168c91465E7f2
        }
        // function productMappings(string memory _productupc) public view returns(){
        //     return()
        // }
        function shippedItemBySupplier(string memory _upc) public
         // check msg.sender belongs to FarmerRole
        //purchasedByManufacturer(_upc)
        verifyCaller(items[_upc].originsupplierID) // check msg.sender is originFarmID
        {
         
        items[_upc].itemState = State.ShippedBySupplier; // update state
        emit ShippedBySupplier(_upc);
        }
       
//         function receivedItemByManufacturer(string memory _upc, uint quantity, address _merchandizerId) public
//          // check msg.sender belongs to DistributorRole
//         //shippedBySupplier(_upc)
//         verifyCaller(items[_upc].ownerID) // check msg.sender is owner
//         {
           
//         items[_upc].itemState = State.ReceivedByManufacturer; // update state
//       mechsupquantity[_merchandizerId][items[_upc].originsupplierID]=quantity;
// merhmap[_merchandizerId].push(items[_upc].originsupplierID);
       
//         emit lognewPurchse(_upc,block.timestamp,_merchandizerId,0,0,0);
//         emit ReceivedByManufacturer(_upc);
//         }
       
       
        function processedItemByManufacturer(string memory _upc,string memory  _machine, string memory _productupc, string memory _merchandizerId,string memory _treatements , string memory _empaddress) public
         // check msg.sender belongs to DistributorRole
        //receivedByManufacturer(_upc)
        //verifyCaller(items[_upc].ownerID) // check msg.sender is owner
        {
           
        address brandID;
        products[_productupc] = Denim(_treatements,_productupc,msg.sender,State.ProcessedByManufacturer,productsku,brandID, _empaddress ,block.timestamp,msg.sender,_merchandizerId,_machine,_upc);
        uint256 batchno= uint256(keccak256(abi.encodePacked(msg.sender, block.timestamp)));
       
        idToProof[batchno].push(products[_productupc]);

       
        itemsHistory[_productupc].PM = block.number; // add block number
        products[_productupc].productstate= State.ProcessedByManufacturer;
        productsku = productsku + 1;
        emit logNewItem   ( _productupc,'',productsku,msg.sender,  _treatements,'null','null','null',0,0,batchno);
        emit LogProductDetails(products[_productupc].itemsUPC,products[_productupc].machine_id, products[_productupc].empID);
        emit ProcessedByManufacturer(_productupc);
        }
       
   
        function packageItemByDistributor(string memory _productupc) public
         // check msg.sender belongs to DistributorRole
        //processByManufacturer(_productupc)
        //verifyCaller(products[_productupc].ownerID) // check msg.sender is owner
        {
       
        products[_productupc].productstate= State.PackagedByManufacturer;
        //itemsHistory[_productupc].PPA = block.number; // add block number
        emit PackagedByManufacturer(_productupc);
        }
       
        // function sellItemByManufacturer(string memory _productupc) public
        //  // check msg.sender belongs to DistributorRole
        // //packagedByManufacturer(_productupc)
        // //verifyCaller(products[_productupc].manufacturerID) // check msg.sender is owner
        // {
       
       
        // emit logNewItem(_productupc,'null',0,address(0),"null","null",'null','null',0,0,0);
        // emit ForSaleByManufacturer(_productupc);
        // }
        function purchaseItemByBrand(string memory _productupc) public
        // check msg.sender belongs to ConsumerRole
        //forSaleByManufacturer(_productupc)
        {
        products[_productupc].brandID = msg.sender;
        //items[_upc].brandID=msg.sender;
        products[_productupc].ownerID = msg.sender;
        products[_productupc].productstate= State.ForSaleByManufacturer;
        products[_productupc].productstate = State.PurchasedByBrand;
                //idToProof[_batchno].push(  products[_productupc]);

        itemsHistory[_productupc].RTC = block.number;
        emit lognewPurchse(_productupc,block.timestamp,'',0,products[_productupc].brandID,0);
        emit PurchasedByBrand(_productupc);
        }
        function shippedItemByDistributor(string memory _productupc ,uint _shipmentAgent) public
         // check msg.sender belongs to DistributorRole
        //purchasedByBrand(_productupc)
        verifyCaller(products[_productupc].manufacturerID) // check msg.sender is distributorID
        {
            //products[_productupc].ShipmnetAgent=_shipmentAgent;
        products[_productupc].productstate = State.ShippedByManufacturer;
        emit lognewPurchse(_productupc,block.timestamp,'',_shipmentAgent,address(0),0);
        emit ShippedByManufacturer(_productupc);
        }
       
        function fetchItemBufferOne(string memory _upc) public view returns
        (
        uint    itemSKU,
        string  memory  itemUPC,
        address ownerID,
        address originSupplierID,
        string memory  originSupplierName,
        string memory originSupplierLatitude,
        string memory originSupplierLongitude,
        uint price,
        uint creationtime
        )
        {
        // Assign values to the 8 parameters
        Item memory item = items[_upc];
   
        return (item.sku,
          item.upc,
          item.ownerID,
         item.originsupplierID,
          item.originsupplierName,
          item.originsupplierLongitude,
          item.originsupplierLatitude,
          item.productPrice,
          item.creationTime
        );
  }
      function fetchItemBufferTwo(string memory _upc) public view returns
        (
        uint    itemSKU,
        string memory   itemUPC,
        string memory materialtype,
        State   itemState,
        address manufacturerID,
        address brandID,
        string memory merchandizerid
        )
        {
          // Assign values to the 9 parameters
        Item memory item = items[_upc];
        return
        (
          item.sku,
          item.upc,
          item.materialtype,
          item.itemState,
          item.manufacturerID,
          item.brandID,
          item.merchandizerid
        );

  }
   function fetchItemBufferThree(string memory _productupc) public view returns
        (
        uint    itemSKU,
        string memory  itemUPC,
        address manufacturerID,
        address brandID,
        string memory merchandizerid,
        string memory treatement,
        State   itemState,
        string memory  empID,
        string memory machine_id,
        uint time
        )
        {
          // Assign values to the 9 parameters
        Denim memory product = products[_productupc];
        return
        (
          product.productsku,
          product.itemsUPC,
          product.manufacturerID,
          product.brandID,
          product.merchandizerid,
          product.treatements,
          product.productstate,
          product.empID,
          product.machine_id,
          product.creationTime
         
   
        );

  }
    function fetchitemHistory(string memory _upc, string memory _productupc) public view returns
        (
          uint blockSupplierToDistributor,
          uint blockManufacturerToBrand,
          uint blockpurchsetoprocess,
          uint blockprocesstopacakge
        )
        {
          // Assign value to the parameters
          Txblocks memory txblock = itemsHistory[_upc];
          return
          (
            txblock.FTD,
            itemsHistory[_productupc].RTC,
            itemsHistory[_productupc].PM,
            itemsHistory[_productupc].PPA
   
          );
   
        }



   } 
