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
        uint256 productPrice;
        string productCategory;
        uint256 quantity;
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