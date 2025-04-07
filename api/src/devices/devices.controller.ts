import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { DevicesService } from './devices.service';
import { AuthGuard } from 'src/guards/auth.guard';
import { Role, Roles } from 'src/decorators/roles.decorator';
import { RolesGuard } from 'src/guards/roles.guard';
@UseGuards(AuthGuard)

@Controller('devices')
export class DevicesController {
  constructor(private readonly devicesService: DevicesService) { }

  @Get()
  findAll() {
    return this.devicesService.findAll();
  }
  @UseGuards(RolesGuard)
  @Roles(Role.Admin)
  @Get(':id')
  findOne(@Param('id') id: string) {

    return this.devicesService.findOne(id);
  }

}
