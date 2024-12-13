import { Controller, Get } from '@nestjs/common';
import { BalanceService } from './balance.service';
import { ApiTags, ApiOperation, ApiResponse, ApiQuery } from '@nestjs/swagger';

@ApiTags('balance') // Groups endpoints under the "balance" tag in Swagger UI
@Controller('balance')
export class BalanceController {
  constructor(private readonly balanceService: BalanceService) {}

  @Get('demo')
  @ApiOperation({
    summary:
      'Get native balance and token balances for a wallet address on a specific chain',
  })
  @ApiResponse({
    status: 200,
    description: 'Successfully fetched balance data.',
  })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  async getBalanceData() {
    try {
      const data = await this.balanceService.getDemoData();
      return data;
    } catch (error) {
      console.error(error);
      // You can throw an HttpException or handle it as per your needs
      throw error;
    }
  }
}
