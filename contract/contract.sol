// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

// Interface for the ERC20 token. [1, 2]
interface IERC20 {
    function transferFrom(address sender, address recipient, uint256 amount) external returns (bool);
    function allowance(address owner, address spender) external view returns (uint256);
    function balanceOf(address account) external view returns (uint256);
}

contract SmartPlugCharger {
    // Address of the accepted stablecoin. [1]
    IERC20 public immutable stablecoin;

    // Structure to store transaction details. [12, 17]
    struct TransactionInfo {
        uint256 amount;
        uint256 timestamp;
    }

    // Mapping from a user's address to their last transaction info. [7]
    mapping(address => TransactionInfo) public lastTransactions;

    // Event to log new deposits
    event DepositMade(address indexed user, uint256 amount, uint256 timestamp);

    /**
     * @dev Constructor to set the stablecoin address.
     * @param _stablecoinAddress The address of the ERC20 stablecoin.
     */
    constructor(address _stablecoinAddress) {
        require(_stablecoinAddress != address(0), "SmartPlugCharger: Stablecoin address cannot be zero");
        stablecoin = IERC20(_stablecoinAddress);
    }

    /**
     * @dev Receives a specified amount of stablecoin from the message sender.
     * The sender must have pre-approved this contract to spend at least `_amount` of their stablecoins. [10, 11]
     * @param _amount The amount of stablecoin to deposit.
     */
    function depositTokens(uint256 _amount) external {
        require(_amount > 0, "SmartPlugCharger: Deposit amount must be greater than zero");

        // Check if the user has approved enough tokens for this contract to spend.
        uint256 allowed = stablecoin.allowance(msg.sender, address(this));
        require(allowed >= _amount, "SmartPlugCharger: Insufficient token allowance. Please approve the contract to spend tokens.");

        // Transfer the tokens from the user to this contract. [10]
        bool success = stablecoin.transferFrom(msg.sender, address(this), _amount);
        require(success, "SmartPlugCharger: Token transfer failed");

        // Store the transaction details, overwriting any previous transaction for this user.
        // The smart plug will only read the latest transaction.
        lastTransactions[msg.sender] = TransactionInfo({
            amount: _amount,
            timestamp: block.timestamp // Records the timestamp of the current block. [3, 4, 5, 6]
        });

        emit DepositMade(msg.sender, _amount, block.timestamp);
    }

    /**
     * @dev Allows the smart plug (or any client) to read the last transaction details for a given user.
     * @param _user The address of the user whose transaction info is being queried.
     * @return amount The amount of the last deposit.
     * @return timestamp The timestamp of the last deposit.
     */
    function getLastTransaction(address _user) external view returns (uint256 amount, uint256 timestamp) {
        TransactionInfo storage transaction = lastTransactions[_user];
        return (transaction.amount, transaction.timestamp);
    }

    /**
     * @dev Allows checking the balance of the stablecoin held by this contract.
     * This is mostly for administrative or verification purposes.
     * @return The balance of stablecoin.
     */
    function getContractTokenBalance() external view returns (uint256) {
        return stablecoin.balanceOf(address(this)); // [11]
    }
}