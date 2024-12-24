import express from 'express';
const app = express();
let ETH_BALANCE = 100;
let USDC_BALANCE = 340000;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.post('/add-liquidity', (req, res) => {
    const quantity = req.body.quantity;
    const updatedEthQuantity = ETH_BALANCE + quantity;
    const updatedUsdcBalance = ETH_BALANCE * USDC_BALANCE / updatedEthQuantity;
    USDC_BALANCE = updatedUsdcBalance;
    ETH_BALANCE = updatedEthQuantity;
    res.json({
        message: 'Added liquidity successfully'
    });
});
app.post('/buy-asset', (req, res) => {
    const quantity = req.body.quantity;
    const updatedEthQuantity = ETH_BALANCE - quantity;
    const updatedUsdcBalance = ETH_BALANCE * USDC_BALANCE / updatedEthQuantity;
    const paidAmount = updatedUsdcBalance - USDC_BALANCE;
    ETH_BALANCE = updatedEthQuantity;
    USDC_BALANCE = updatedUsdcBalance;
    res.json({
        message: 'Bought asset successfully',
        paidAmount: paidAmount
    });
});
app.post('/sell-asset', (req, res) => {
    const quantity = req.body.quantity;
    const updatedEthQuantity = ETH_BALANCE + quantity;
    const updatedUsdcBalance = ETH_BALANCE * USDC_BALANCE / updatedEthQuantity;
    const paidAmount = USDC_BALANCE - updatedUsdcBalance;
    ETH_BALANCE = updatedEthQuantity;
    USDC_BALANCE = updatedUsdcBalance;
    res.json({
        message: 'Sold asset successfully',
        amount: paidAmount
    });
});
app.post('/quote', (req, res) => {
    const quantity = req.body.quantity;
    const updatedUsdcBalance = ETH_BALANCE * USDC_BALANCE / (ETH_BALANCE - quantity);
    const paidAmount = updatedUsdcBalance - USDC_BALANCE;
    res.json({
        message: 'Quoted successfully',
        amount: paidAmount
    });
});
app.get('/pool', (req, res) => {
    const ethPrice = USDC_BALANCE / ETH_BALANCE;
    res.json({
        ethBalance: ETH_BALANCE,
        usdcBalance: USDC_BALANCE,
        ethPrice: ethPrice
    });
});
app.listen(3000);
