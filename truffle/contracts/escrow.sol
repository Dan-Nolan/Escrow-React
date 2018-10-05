pragma solidity ^0.4.18;

contract EscrowContract {
	address public beneficiary;
	address public depositor;
	address public arbiter;

	function EscrowContract(address _arbiter, address _beneficiary) public payable {
		beneficiary = _beneficiary;
		depositor = msg.sender;
		arbiter = _arbiter;
	}

	event Approved(uint v);

	function approve() public {
		require(msg.sender == arbiter);
		Approved(this.balance);
		beneficiary.transfer(this.balance);
	}
}
