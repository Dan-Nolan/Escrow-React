import { bytecode, abi } from './EscrowContract.json';
import { web3 } from './web3Util.js';

const EscrowContract = new web3.eth.Contract(abi);

const approve = (escrowContractAddress, arbiterAddress) => {
  EscrowContract.options.address = escrowContractAddress;

  return EscrowContract.methods['approve']().send({
    from: arbiterAddress
  })
}

export default approve;
