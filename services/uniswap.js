const { ethers } = require("ethers");
const { Token, ChainId } = require("@uniswap/sdk-core");
const { computePoolAddress, FeeAmount } = require("@uniswap/v3-sdk");
const QuoterABI = require("@uniswap/v3-periphery/artifacts/contracts/lens/Quoter.sol/Quoter.json");

class UniswapService {
  constructor(provider, factoryAddress, quoterAddress) {
    this.provider = provider;
    this.factoryAddress = factoryAddress;
    this.quoterAddress = quoterAddress;
    this.quoterContract = new ethers.Contract(quoterAddress, QuoterABI.abi, provider);
  }

  createToken(symbol, address) {
    const decimals = symbol === "USDT" ? 6 : 18;
    return new Token(ChainId.MAINNET, address, decimals, symbol, symbol);
  }

  getTokenOrder(tokenA, tokenB) {
    return tokenA.toLowerCase() < tokenB.toLowerCase()
      ? { token0: tokenA, token1: tokenB }
      : { token0: tokenB, token1: tokenA };
  }

  async getQuote(tokenA, tokenB) {
    const { token0, token1 } = this.getTokenOrder(tokenA.address, tokenB.address);
    const poolAddress = computePoolAddress({
      factoryAddress: this.factoryAddress,
      tokenA,
      tokenB,
      fee: FeeAmount.MEDIUM,
    });

    const amountIn = ethers.parseEther("1");
    const amountOut = await this.quoterContract.quoteExactInputSingle(
      token0,
      token1,
      FeeAmount.MEDIUM,
      amountIn,
      0
    );

    const decimals = tokenB.symbol === "USDT" ? 6 : 18;
    return ethers.formatUnits(amountOut, decimals);
  }
}

module.exports = UniswapService;