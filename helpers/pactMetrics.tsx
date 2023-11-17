import { getPACTTradingMetrics } from '@impact-market/utils';

export const pactUsdPrice = async (chainId: number) => {
    const response = await getPACTTradingMetrics(chainId);

    return response?.priceUSD;
};
