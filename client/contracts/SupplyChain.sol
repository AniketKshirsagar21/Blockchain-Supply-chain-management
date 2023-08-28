// SPDX-License-Identifier: MIT
pragma solidity >=0.4.21 <0.9.0;

library Structure {
    enum State {
        Manufactured,
        PurchasedByDistributer,
        ShippedByManufacturer,
        ReceivedByDistributer,
        PurchasedByCustomer,
        ShippedByDistributer,
        ReceivedByCustomer
    }
    struct ManufactureDetails {
        address manufacturer;
        string manufacturerName;
        string manufacturerDetails;
        string manufacturerLongitude;
        string manufacturerLatitude;
        uint256 manufacturedDate;
    }
     struct ProductDetails {
        string productName;
        uint256 productCode;
        uint16 productPrice;
        string productCategory;
        uint16 quantity;
    }
    struct Product {
        uint256 uid;
        uint256 sku;
        address owner;
        State productState;
        ManufactureDetails manufacturer;
        DistributerDetails distributer;
        ProductDetails productdet;
        address customer;
        string transaction;
    }
    struct DistributerDetails {
        address distributer;
        string distributerLongitude;
        string distributerLatitude;
    }
    struct CustomerDetails {
        address customer;
        string customerLongitude;
        string customerLatitude;
    }
    struct ProductHistory {
        Product[] history;
    }
    struct Roles {
        bool Manufacturer;
        bool Distributer;
        bool Customer;
    }
}

contract SupplyChain {
    event ManufacturerAdded(address indexed _account);

    //product code
    uint256 public uid;
    uint256 sku;

    address owner;

    mapping(uint256 => Structure.Product) products; // product Id -> product
    mapping(uint256 => Structure.ProductHistory) productHistory; // 
    mapping(address => Structure.Roles) roles; // person address -> role
    mapping(address => Structure.Product[]) manufacturerProducts;
    mapping(address => Structure.Product[]) distributerProducts;
    mapping(address => Structure.Product[]) customerProducts;
    function hasManufacturerRole(address _account) public view returns (bool) {
        require(_account != address(0),"Burn address");
        return roles[_account].Manufacturer; // boolean
    }

    function addManufacturerRole(address _account) public {
        require(_account != address(0),"Burn address");
        require(!hasManufacturerRole(_account),"Already Manufacturer"); 

        roles[_account].Manufacturer = true;
    }

    function hasDistributerRole(address _account) public view returns (bool) {
        require(_account != address(0),"Burn address");
        return roles[_account].Distributer;
    }

    function addDistributerRole(address _account) public {
        require(_account != address(0),"Burn address");
        require(!hasDistributerRole(_account),"Already Distributor");

        roles[_account].Distributer = true;
    }


    function hasCustomerRole(address _account) public view returns (bool) {
        require(_account != address(0),"Burn address");
        return roles[_account].Customer;
    }

    function addCustomerRole(address _account) public {
        require(_account != address(0),"Burn address");
        roles[_account].Customer = true;
    }

    constructor() payable {
        owner = msg.sender;
        sku = 1;
        uid = 1;
    }

    event Manufactured(uint256 uid);
    event PurchasedByDistributer(uint256 uid);
    event ShippedByManufacturer(uint256 uid);
    event ReceivedByDistributer(uint256 uid);
    event PurchasedByCustomer(uint256 uid);
    event ShippedByDistributer(uint256 uid);
    event ReceivedByCustomer(uint256 uid);

    modifier verifyAddress(address add) {
        require(msg.sender == add,"Address Not Matching");
        _;
    }

    modifier manufactured(uint256 _uid) {
        require(products[_uid].productState == Structure.State.Manufactured,"Product Not Manufactured");
        _;
    }

    modifier shippedByManufacturer(uint256 _uid) {
        require(
            products[_uid].productState == Structure.State.ShippedByManufacturer,"Product Not Shipped by Manufacturer"
        );
        _;
    }

    modifier receivedByDistributer(uint256 _uid) {
        require(
            products[_uid].productState == Structure.State.ReceivedByDistributer,"Not received by Distributer"
        );
        _;
    }

    modifier purchasedByCustomer(uint256 _uid) {
        require(
            products[_uid].productState == Structure.State.PurchasedByCustomer,"Not purchased by Customer"
        );
        _;
    }

    modifier shippedByDistributer(uint256 _uid) {
        require(
            products[_uid].productState == Structure.State.ShippedByDistributer,"Not shipped by Distributer"
        );
        _;
    }


    modifier receivedByCustomer(uint256 _uid) {
        require(
            products[_uid].productState == Structure.State.ReceivedByCustomer,"Product Not received by Customer"
        );
        _;
    }

    function manufactureEmptyInitialize(Structure.Product memory product)
        internal
        pure
    {
        address distributer;
        string memory transaction;
        string memory distributerLongitude;
        string memory distributerLatitude;

        address customer;

        product.distributer.distributer = distributer;
        product.distributer.distributerLongitude = distributerLongitude;
        product.distributer.distributerLatitude = distributerLatitude;

        product.customer = customer;
        product.transaction = transaction;
    }

    function manufactureProductInitialize(
        Structure.Product memory product,
        string memory productName,
        uint256 productCode,
        uint16 productPrice,
        string memory productCategory,
        uint16 quantity
    ) internal pure {
        product.productdet.productName = productName;
        product.productdet.productCode = productCode;
        product.productdet.productPrice = productPrice;
        product.productdet.productCategory = productCategory;
        product.productdet.quantity = quantity;
    }

    ///@dev STEP 1 : Manufactured a product.
    function manufactureProduct(
        string memory manufacturerName,
        string memory manufacturerDetails,
        string memory manufacturerLongitude,
        string memory manufacturerLatitude,
        string memory productName,
        uint256 productCode,
        uint16 productPrice,
        uint16 quantity,
        string memory productCategory
    ) public {
        require(hasManufacturerRole(msg.sender),"Invalid Sender : Does not have manufacturer role");
        uint256 _uid = uid;
        Structure.Product memory product;
        product.sku = sku;
        product.uid = _uid;
        product.manufacturer.manufacturerName = manufacturerName;
        product.manufacturer.manufacturerDetails = manufacturerDetails;
        product.manufacturer.manufacturerLongitude = manufacturerLongitude;
        product.manufacturer.manufacturerLatitude = manufacturerLatitude;
        product.manufacturer.manufacturedDate = block.timestamp;

        product.owner = msg.sender;
        product.manufacturer.manufacturer = msg.sender;

        manufactureEmptyInitialize(product);

        product.productState = Structure.State.Manufactured;
       
        manufactureProductInitialize(
            product,
            productName,
            productCode,
            productPrice,
            productCategory,
            quantity
        );

        products[_uid] = product;

        productHistory[_uid].history.push(product);

        sku = sku + 1;
        uid = uid + 1;
        manufacturerProducts[msg.sender].push(product);
        emit Manufactured(_uid);
    }

    ///@dev STEP 2 : Purchase of manufactured product by distributer.
    function purchaseBydistributer(uint256 _uid) public payable manufactured(_uid) {
        require(hasDistributerRole(msg.sender),"Invalid Sender : Does not have distributor role");
        products[_uid].distributer.distributer = msg.sender;
        products[_uid].productdet.quantity = 0;
        products[_uid].productState = Structure.State.PurchasedByDistributer;
        productHistory[_uid].history.push(products[_uid]);
        
        emit PurchasedByDistributer(_uid);
    }

    ///@dev STEP 3 : Shipping of purchased product to Distributer.
    function shipTodistributer(uint256 _uid, uint256 _amount)
        public
        verifyAddress(products[_uid].manufacturer.manufacturer)
    {
        require(hasManufacturerRole(msg.sender),"Invalid Sender : Does not have manufacturer role");
        payable(msg.sender).transfer(_amount);
        products[_uid].productState = Structure.State.ShippedByManufacturer;
        productHistory[_uid].history.push(products[_uid]);
        emit ShippedByManufacturer(_uid);
    }

    ///@dev STEP 4 : Received the purchased product shipped by Manufacturer.
    function receiveBydistributer(
        uint256 _uid,
        string memory distributerLongitude,
        string memory distributerLatitude
    )
        public
        shippedByManufacturer(_uid)
        verifyAddress(products[_uid].distributer.distributer)
    {
        require(hasDistributerRole(msg.sender),"Invalid Sender : Does not have distributor role");
        products[_uid].owner = msg.sender;
        products[_uid].distributer.distributerLongitude = distributerLongitude;
        products[_uid].distributer.distributerLatitude = distributerLatitude;
        products[_uid].productState = Structure.State.ReceivedByDistributer;
        productHistory[_uid].history.push(products[_uid]);
        distributerProducts[msg.sender].push(products[_uid]);

        emit ReceivedByDistributer(_uid);
    }

    ///@dev STEP 5 : Purchase of a product at distributer by Customer.
    function purchaseByCustomer(uint256 _uid) public payable receivedByDistributer(_uid)
    {
        require(hasCustomerRole(msg.sender),"Invalid Sender : Does not have customer role");
        products[_uid].customer = msg.sender;
        products[_uid].productState = Structure.State.PurchasedByCustomer;
        productHistory[_uid].history.push(products[_uid]);
        
        emit PurchasedByCustomer(_uid);
    }

    ///@dev STEP 7 : Shipping of product by third party purchased by customer.
    function shipBydistributer(uint256 _uid,uint16 _amount)
        public
        verifyAddress(products[_uid].owner)
        verifyAddress(products[_uid].distributer.distributer)
    {
        require(hasDistributerRole(msg.sender),"Invalid Sender : Does not have distributor role");
        products[_uid].productState = Structure.State.ShippedByDistributer;
        productHistory[_uid].history.push(products[_uid]);
        payable(msg.sender).transfer(_amount);
        emit ShippedByDistributer(_uid);
    }

    

    ///@dev STEP 8 : Shipping of product by delivery hub purchased by customer.
    function receiveByCustomer(uint256 _uid)
        public
        verifyAddress(products[_uid].customer)
    {
        require(hasCustomerRole(msg.sender),"Invalid Sender : Does not have customer role");
        products[_uid].owner = msg.sender;
        products[_uid].productState = Structure.State.ReceivedByCustomer;
        productHistory[_uid].history.push(products[_uid]);
        customerProducts[msg.sender].push(products[_uid]);

        emit ReceivedByCustomer(_uid);
    }

    ///@dev Fetch product
    function fetchProductPart1(
        uint256 _uid,
        string memory _type,
        uint256 i
    )
        public
        view
        returns (
            uint256,
            uint256,
            uint16,
            address,
            address,
            string memory,
            string memory,
            string memory,
            string memory
        )
    {
        require(products[_uid].uid != 0,"_Uid == 0");
        Structure.Product storage product = products[_uid];
        if (keccak256(bytes(_type)) == keccak256(bytes("product"))) {
            product = products[_uid];
        }
        if (keccak256(bytes(_type)) == keccak256(bytes("history"))) {
            product = productHistory[_uid].history[i];
        }
        return (
            product.uid,
            product.sku,
            product.productdet.quantity,
            product.owner,
            product.manufacturer.manufacturer,
            product.manufacturer.manufacturerName,
            product.manufacturer.manufacturerDetails,
            product.manufacturer.manufacturerLongitude,
            product.manufacturer.manufacturerLatitude
        );
    }

    ///@dev Fetch product
    function fetchProductPart2(
        uint256 _uid,
        string memory _type,
        uint256 i
    )
        public
        view
        returns (
            uint256,
            string memory,
            uint256,
            uint256,
            uint16,
            string memory,
            Structure.State,
            address,
            string memory
        )
    {
        require(products[_uid].uid != 0);
        Structure.Product storage product = products[_uid];
        if (keccak256(bytes(_type)) == keccak256(bytes("product"))) {
            product = products[_uid];
        }
        if (keccak256(bytes(_type)) == keccak256(bytes("history"))) {
            product = productHistory[_uid].history[i];
        }
        return (
            product.manufacturer.manufacturedDate,
            product.productdet.productName,
            product.productdet.productCode,
            product.productdet.productPrice,
            product.productdet.quantity,
            product.productdet.productCategory,
            product.productState,
            product.distributer.distributer,
            product.distributer.distributerLongitude
        );
    }


    function fetchProductCount() public view returns (uint256) {
        return uid;
    }

    function fetchProductHistoryLength(uint256 _uid)
        public
        view
        returns (uint256)
    {
        return productHistory[_uid].history.length;
    }

    function fetchProductState(uint256 _uid)
        public
        view
        returns (Structure.State)
    {
        return products[_uid].productState;
    }

    function setTransactionHashOnManufacture(string memory tran) public {
        productHistory[uid - 1].history[productHistory[uid - 1].history.length - 1].transaction = tran;
    }

    function setTransactionHash(uint256 _uid, string memory tran) public {
        Structure.Product storage p = productHistory[_uid].history[productHistory[_uid].history.length - 1
            ];
        p.transaction = tran;
    }

}