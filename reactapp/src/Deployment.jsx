import React, {Component} from 'react';
import deploy from './contract/deploy';
import {web3} from './contract/web3Util';

class Deployment extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ether: '',
            arbiter: '',
            beneficiary: '',
            transactions: [],
        }
        this.deploy = this.deploy.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    deploy() {
        const {ether, arbiter, beneficiary} = this.state;
        if (web3) {
            web3.eth.getAccounts().then((accounts) => {
                let account = accounts[0];
                if (account) {
                    deploy(+ether, arbiter, beneficiary, account).then(({options}) => {
                        const {address} = options;
                        this.setState({
                          transactions: this.state.transactions.concat(`Transaction was successful! Deployed to ${address}.`)
                        });
                    }).catch((err) => {
                        this.setState({
                          transactions: this.state.transactions.concat(`Deployment Failed.`)
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
        const {ether, arbiter, beneficiary, transactions} = this.state;
        return (
            <div className="container py-3 px-4 my-3 border">
                <h1> Deployment Function </h1>
                <p className="font-weight-light">
                    This is the function used to deploy your Escrow Contract.
                    Try using it with metamask to send the transactions.
                </p>
                <form className="p-sm">
                    <div className="form-group">
                        <label htmlFor="ether">
                            Amount of Wei
                            <input type="number" className="form-control" id="ether" placeholder="Ether Amount"
                                   value={ether} onChange={this.handleChange('ether')}/>
                        </label>
                    </div>
                    <div className="form-group">
                        <label htmlFor="arbiter">
                            Arbiter Address
                            <input type="text" className="form-control" id="arbiter" placeholder="Address"
                                   value={arbiter} onChange={this.handleChange('arbiter')}/>
                        </label>
                    </div>
                    <div className="form-group">
                        <label htmlFor="beneficiary">
                            Beneficiary Address
                            <input type="text" className="form-control" id="beneficiary" placeholder="Address"
                                   value={beneficiary} onChange={this.handleChange('beneficiary')}/>
                        </label>
                    </div>
                    <div className="btn btn-primary" onClick={this.deploy}>Deploy</div>
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

export default Deployment;
