// index.js
require("dotenv").config();
const { ethers } = require("ethers");
const config = require("./config.json");
const { logWithTime, saveToHistory, getTokenAddress } = require("./utils/helpers");
const UniswapService = require("./services/uniswap");

const provider = new ethers.InfuraProvider(config.network, process.env.INFURA_API_KEY);
const uniswapService = new UniswapService(provider, config.factoryAddress, config.quoterAddress);

async function getQuoteForPair(symbolA, symbolB) {
  try {
    const tokenAAddr = getTokenAddress(symbolA, process.env);
    const tokenBAddr = getTokenAddress(symbolB, process.env);

    const tokenA = uniswapService.createToken(symbolA, tokenAAddr);
    const tokenB = uniswapService.createToken(symbolB, tokenBAddr);

    const result = await uniswapService.getQuote(tokenA, tokenB);

    const pairName = `${symbolA}_${symbolB}`;
    logWithTime(`1 ${symbolA} ≈ ${result} ${symbolB}`);
    saveToHistory(pairName, result);
  } catch (error) {
    logWithTime(`Erro ao cotar ${symbolA}/${symbolB}: ${error.message}`);
  }
}

async function executeAllPairs() {
  for (const pair of config.pairs) {
    const [symbolA, symbolB] = pair.split("/");
    await getQuoteForPair(symbolA, symbolB);
  }
}

(async () => {
  await executeAllPairs(); // Execução inicial

  setInterval(async () => {
    await executeAllPairs();
  }, config.interval);
})();