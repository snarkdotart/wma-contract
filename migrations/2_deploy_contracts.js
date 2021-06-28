const Cookies = artifacts.require('ShitCoin');

module.exports = function(deployer) {
  deployer.deploy(Cookies, 'White Male Artist', '$HT COIN')
};
