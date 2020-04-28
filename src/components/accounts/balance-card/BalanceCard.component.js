import React from 'react';

class BalanceCard extends React.Component {
    render() {
        let {name, currency, balance} = this.props;
        return (
            <div>
                {name}
                {currency}
                {balance}
            </div>
        );
    }
}

export default BalanceCard;
