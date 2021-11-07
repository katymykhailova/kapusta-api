const updateUserBalance = (user, amount, type, _id) => {
  const amountNumber = Number(amount);
  let balanceAfter;
  const resultBalance = balance => {
    return type ? balance + amountNumber : balance - amountNumber;
  };

  const userBalance = user.balance;
  if (userBalance || userBalance === 0) {
    balanceAfter = resultBalance(userBalance);
  } else {
    balanceAfter = amountNumber;
  }

  return balanceAfter;
};

module.exports = updateUserBalance;
