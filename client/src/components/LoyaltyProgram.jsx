import React from 'react';

const LoyaltyProgram = () => {
    const loyaltyPoints = 2500;
    const loyaltyLevel = 'Gold';

    return (
        <div>
            <h2>Loyalty Program</h2>
            <p>Current Points: {loyaltyPoints}</p>
            <p>Current Level: {loyaltyLevel}</p>
        </div>
    );
};

export default LoyaltyProgram;
