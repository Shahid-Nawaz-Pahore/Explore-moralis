import { Injectable } from '@nestjs/common';
import Moralis from 'moralis';
import { EvmChain } from '@moralisweb3/common-evm-utils';

@Injectable()
export class BalanceService {
  // Set the address and chain as you did before
  private readonly address = '0x07549c13f3eC7bf3Fca6C7A86FF7e67162B2ECe3';
  private readonly chain = EvmChain.POLYGON_AMOY;

  async getDemoData() {
    // Get native balance
    const nativeBalance = await Moralis.EvmApi.balance.getNativeBalance({
      address: this.address,
      chain: this.chain,
    });
    const native = nativeBalance.result.balance.ether;

    // Get token balances
    const tokenBalances = await Moralis.EvmApi.token.getWalletTokenBalances({
      address: this.address,
      chain: this.chain,
    });
    const tokens = tokenBalances.result.map((token) => token.display());

    return { native, tokens };
  }
}
