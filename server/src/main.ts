import { INestApplication, ValidationPipe } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { NestFactory } from '@nestjs/core'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'

import { AppModule } from './app.module'

const setupSwaggerModule = (app: INestApplication) => {
  const config = new DocumentBuilder().setTitle('XX API').build()
  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('api', app, document)
}

const bootstrap = async () => {
  const app = await NestFactory.create(AppModule)
  app.useGlobalPipes(new ValidationPipe({}))
  setupSwaggerModule(app)
  app.enableCors()
  const configService = app.get(ConfigService)
  await app.listen(configService.get('PORT') ?? 8000)
}

bootstrap()
