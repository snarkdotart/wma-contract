var Cookies = artifacts.require('ShitCoin');

var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);
expect = chai.expect;

contract('Cookies Basic Test', async accounts => {
  before(async () => {
    instance = await Cookies.new('Test Name', 'Test Symbol')
  });

  it('1. Check if the owner is current owner.', async () => {
    const owner = accounts[0];
    let tokenOwner = await instance.owner();
    expect(tokenOwner).to.be.equal(owner)
  });

  it('2. Add new Token with example URI and check total Supply.', async () => {
    let supply = await instance.totalSupply();
    expect(supply.toNumber()).to.be.equal(0);
    await instance.mint(accounts[1], 'testURI');
    supply = await instance.totalSupply();
    expect(supply.toNumber()).to.be.equal(1);
    let uri = await instance.tokenURI(1);
    expect(uri).to.be.equal('testURI');

    let balance = await instance.balanceOf(accounts[1]);
    expect(balance.toNumber()).to.be.equal(1)
  });
 
  it('3. Mint new token with new ID. Should be accepted.', async () => {
    await expect(instance.mint(accounts[2], 'testURI2')).to.be
      .eventually.fulfilled
  });

  it('4. Open Cookie. Check if event was emitted.', async () => {
    let result = await instance.openCookie(1, { from: accounts[1] });
    expect(result.logs[0].event).to.be.equal('CookieOpened');
    expect(result.logs[0].args.id.toNumber()).to.be.equal(1);
  });

  it('5. Open same Cookie again. It should be rejected.', async () => {
   await expect(instance.openCookie(1, { from: accounts[1] })).to.be.eventually.rejected
  });

  it('6. Transfer Opened Cookie. Should be rejected.', async () => {
   await expect(instance.transferFrom(accounts[2],accounts[3],1, { from: accounts[2] })).to.be.eventually.rejected
  });

  it('7. Transfer Closed Cookie. Should be accepted.', async () => {
   await expect(instance.transferFrom(accounts[2],accounts[3],2, { from: accounts[2] })).to.be.eventually.fulfilled
  });

  it('8. SafeTransfer Opened Cookie. Should be rejected.', async () => {
   await expect(instance.safeTransferFrom(accounts[2],accounts[3],1, { from: accounts[2] })).to.be.eventually.rejected
  });

  it('9. SafeTransfer Closed Cookie. Should be accepted.', async () => {
   await expect(instance.safeTransferFrom(accounts[3],accounts[2],2, { from: accounts[3] })).to.be.eventually.fulfilled
  });

});
