// SPDX-License-Identifier: MIT
pragma solidity 0.8.18;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract BasketToken is ERC20, ERC20Burnable, Ownable {
    address[] public basketTokens;
    mapping(address => bool) public tokenExists;

    constructor(address[] memory tokens) ERC20("MyToken", "MTK") {
        uint iterate = tokens.length;
        for (uint256 i; i < iterate; i++) {
            address token = tokens[i];
            require(token != address(0), "Invalid token address");
            // require(!tokenExists[token], "Token already exists in basket");
            basketTokens.push(token);
            tokenExists[token] = true;
        }
    }

    function addCollateralToGetTokens(address to, uint256 amount) external {
        require(to != address(0), "Invalid recipient address");
        require(amount > 0, "Amount must be greater than 0");
        require(
            (amount % basketTokens.length) == 0,
            "enter multiple of token List"
        );
        for (uint256 i = 0; i < basketTokens.length; i++) {
            address token = basketTokens[i];
            require(
                ERC20(token).allowance(msg.sender, address(this)) >=
                    (amount / basketTokens.length),
                "approve hasn't been given"
            );
            ERC20(token).transferFrom(
                msg.sender,
                address(this),
                amount / basketTokens.length
            );
        }
        _mint(to, amount);
    }

    function removeCollateral(uint256 amount) external {
        require(amount > 0, "Amount must be greater than 0");
        require(
            (amount % basketTokens.length) == 0,
            "enter multiple of token List"
        );
        require(balanceOf(msg.sender) >= amount, "required balance");

        burn(amount);
        uint256 iterate = basketTokens.length;
        for (uint256 i = 0; i < iterate; i++) {
            address token = basketTokens[i];
            require(
                ERC20(token).balanceOf(address(this)) >=
                    (amount / ),
                "doesn't have required tokens"
            );
            ERC20(token).transfer(msg.sender, amount / iterate);
        }
    }

    function getBasketTokens() external view returns (address[] memory) {
        return basketTokens;
    }

    // adding new tokens to the basket
    function addToken(address _tokenAddress) external onlyOwner {
        uint256 iterate = basketTokens.length;
        require(
            ERC20(_tokenAddress).allowance(msg.sender, address(this)) >=
                (totalSupply() / iterate),
            "approve hasn't been given"
        );
        ERC20(_tokenAddress).transferFrom(
            msg.sender,
            address(this),
            totalSupply() / basketTokens.length
        );
        for (uint256 i; i < iterate; i++) {
            address token = basketTokens[i];
            ERC20(token).transfer(
                msg.sender,
                totalSupply() / iterate
            );
        }
        basketTokens.push(_tokenAddress);
    }

    // removing tokens from the basket
    function removeToken(
        uint256 _tokenIndex,
        address _tokenAddress
    ) external onlyOwner {
        uint iterate = basketTokens.length;
        for (uint256 i; i < iterate; i++) {
            address token = basketTokens[i];
            require(
                ERC20(token).allowance(msg.sender, address(this)) >=
                    (totalSupply() / iterate),
                "approve hasn't been given"
            );
            ERC20(token).transferFrom(
                msg.sender,
                address(this),
                totalSupply() / iterate
            );
        }
    }
}
