// SPDX-License-Identifier: MIT
pragma solidity 0.8.18;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";

contract Vector is ERC20, ERC20Burnable {
    using SafeERC20 for ERC20;
    mapping(address => bool) public tokenExists;
   Backings[] public basketTokens;
    mapping(address => bool) public basketTokenExist;
    struct Backings {
       address backedStableToken;
       uint256 decimal;
   }
    constructor(Backings[] memory _backings) ERC20("Vector USD", "VUSD") {
        uint iterate = _backings.length;
        for (uint256 i; i < iterate; i++) {
            require(_backings[i].backedStableToken != address(0), "Invalid token address");
            Backings memory _back;
            _back.decimal=_backings[i].decimal;
            _back.backedStableToken=_backings[i].backedStableToken;
            basketTokens.push(_back);
            tokenExists[_backings[i].backedStableToken]=true;
        }
    }

// amount is the individual tokens 
    function addCollateralToGetTokens(address to, uint256 amount) external {
        require(to != address(0), "Invalid recipient address");
        require(amount != 0, "Amount must be greater than 0");
        for (uint256 i; i < basketTokens.length; i++) {
            address token = basketTokens[i].backedStableToken;
            require(
                ERC20(token).allowance(msg.sender, address(this)) >=
                    (amount * (10**basketTokens[i].decimal)),
                "approve hasn't been given"
            );
            ERC20(token).safeTransferFrom(  msg.sender, address(this), amount * (10**basketTokens[i].decimal));
        
        }
        _mint(to, amount*(basketTokens.length)*10**decimals());
    }

    function removeCollateral(uint256 amount) external {
        require(amount > 0, "Amount must be greater than 0");
        require(
            (amount % basketTokens.length) == 0,
            "enter multiple of token List"
        );
        require(balanceOf(msg.sender) >= amount*basketTokens.length*(10**decimals()), "required balance");

        burn(amount*basketTokens.length*(10**decimals()));

        uint256 iterate = basketTokens.length;
        for (uint256 i = 0; i < iterate; i++) {
            address token = basketTokens[i].backedStableToken;
            require(
                ERC20(token).balanceOf(address(this)) >=
                    (amount*(10**basketTokens[i].decimal) ),
                "doesn't have required tokens"
            );
            ERC20(token).safeTransfer(  msg.sender, amount * (10**basketTokens[i].decimal));
        }
    }

    function getBasketTokens() external view returns (Backings[] memory) {
        return basketTokens;
    }
}
