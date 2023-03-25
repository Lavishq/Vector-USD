// SPDX-License-Identifier: MIT
pragma solidity 0.8.18;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract USDToken {
    constructor(_name, _symbol) ERC20(_name, _symbol) {
        _mint(msg.sender, 100 * 10 ** decimals());
    }
}
