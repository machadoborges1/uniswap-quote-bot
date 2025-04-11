# Bot de Cotação Uniswap

Este projeto fornece um bot que monitora e registra as cotações de pares de tokens na Uniswap V3. Ele consulta o contrato Quoter da Uniswap para obter as cotações e as salva em arquivos CSV para análise posterior.

## Funcionalidades

-   **Cotação de Pares:** Obtém as cotações de pares de tokens definidos no arquivo `config.json`.
-   **Registro de Histórico:** Salva as cotações em arquivos CSV com timestamps.
-   **Monitoramento Contínuo:** Executa as cotações em intervalos regulares definidos no arquivo `config.json`.

## Pré-requisitos

-   Node.js (versão 12 ou superior)
-   npm (Node Package Manager)
-   Conta Infura (para obter um URL de provedor Ethereum)
-   Arquivo `.env` com a chave da API Infura.

## Instalação

1.  Clone este repositório:

    ```bash
    git clone https://github.com/machadoborges1/uniswap-quote-bot
    cd uniswap-quote-bot
    ```

2.  Instale as dependências:

    ```bash
    npm install
    ```

3.  Crie um arquivo `.env` na raiz do projeto e adicione sua chave da API Infura:

    ```
    INFURA_API_KEY=SUA_CHAVE_API_INFURA
    ```

4.  Configure os pares de tokens e o intervalo de monitoramento no arquivo `config.json`.

## Uso

1.  Execute o script `index.js`:

    ```bash
    node index.js
    ```

## Dependências

-   `dotenv`: Para carregar variáveis de ambiente de um arquivo `.env`.
-   `ethers`: Para interagir com a blockchain Ethereum.
-   `@uniswap/sdk-core`: Para tipos e utilitários da Uniswap SDK.
-   `@uniswap/v3-sdk`: Para funcionalidades da Uniswap V3 SDK.
-   `@uniswap/v3-periphery`: Para ABIs de contratos da Uniswap V3.

## Configuração

O arquivo `config.json` contém as seguintes configurações:

-   `network`: A rede Ethereum a ser usada (por exemplo, "mainnet").
-   `factoryAddress`: O endereço do contrato de fábrica da Uniswap V3.
-   `quoterAddress`: O endereço do contrato Quoter da Uniswap V3.
-   `pairs`: Um array de pares de tokens a serem monitorados (por exemplo, ["WETH/USDT", "WBTC/USDT"]).
-   `interval`: O intervalo em milissegundos para executar as cotações (por exemplo, 60000 para 1 minuto).

## Licença

Este projeto é licenciado sob a Licença MIT. Consulte o arquivo `LICENSE` para obter mais informações.

## Autor

Humberto Machado

## Contribuição

Contribuições são bem-vindas! Sinta-se à vontade para abrir problemas (issues) e enviar pull requests.

## Observações

-   ⚠️ **Segurança:** Mantenha sua chave da API Infura em segredo. Não a compartilhe com ninguém.
-   Este projeto é fornecido "como está", sem garantias. Use-o por sua conta e risco.
-   Certifique-se de ter saldo suficiente em sua carteira para pagar as taxas de gás ao interagir com a blockchain Ethereum.