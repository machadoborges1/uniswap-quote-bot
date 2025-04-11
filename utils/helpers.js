const fs = require("fs");
const path = require("path");

function logWithTime(message) {
  console.log(`[${new Date().toISOString()}] ${message}`);
}

function saveToHistory(pairName, value) {
  const folder = "history";
  if (!fs.existsSync(folder)) fs.mkdirSync(folder);
  const filePath = path.join(folder, `${pairName}.csv`);
  const entry = `${new Date().toISOString()},${value}\n`;
  fs.appendFileSync(filePath, entry);
}

function getTokenAddress(symbol, env) {
  const address = env[symbol];
  if (!address) throw new Error(`Endereço não encontrado para token: ${symbol}`);
  return address;
}

module.exports = { logWithTime, saveToHistory, getTokenAddress };