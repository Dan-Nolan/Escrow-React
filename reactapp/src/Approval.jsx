import React, {Component} from 'react';
import approve from './contract/approve';
import {web3} from "./contract/web3Util";

class Approval extends Component {
    constructor(props) {
        super(props);
        this.state = {
            escrowAddress: '',
            transactions: [],
        }
        this.approve = this.approve.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    approve() {
        const {escrowAddress} = this.state;

        if (web3) {
            web3.eth.getAccounts().then((accounts) => {
                let account = accounts[0];
                if (account) {
                    approve(escrowAddress, account).then(() => {
                        this.setState({
                          transactions: this.state.transactions.concat(`Approval successful for Escrow at ${escrowAddress}.`)
                        });
                    }).catch((err) => {
                        this.setState({
                          transactions: this.state.transactions.concat(`Approval unsuccessful for Escrow at ${escrowAddress}.`)
                        });
                        alert(err);
                    });
                }
            })
        }
    }

    handleChange(prop) {
        return ({target}) => this.setState({[prop]: target.value});
    }

    render() {
        const {escrowAddress, transactions} = this.state;
        return (
            <div className="container py-3 px-4 my-3 border">
                <h1> Approve Function </h1>
                <p className="font-weight-light">
                    This is the function the arbiter uses to approve the transaction.
                    First you'll need to deploy an escrow contract before you can approve it.
                    Then, use the address from the contract and approve it.
                </p>
                <form>
                    <div className="form-group">
                        <label htmlFor="beneficiary">Escrow Address
                            <input type="text" className="form-control" id="escrow" placeholder="Contract Address"
                                   value={escrowAddress} onChange={this.handleChange('escrowAddress')}/>
                        </label>
                    </div>
                    <div className="btn btn-primary" onClick={this.approve}>Approve</div>
                </form>
                <ul className="list-group py-2">
                    {
                        transactions.map(tx => {
                            return (
                                <li className="alert alert-info" key={tx}>
                                    {tx}
                                </li>
                            )
                        })
                    }
                </ul>
            </div>
        );
    }
}

export default Approval;
