import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import chalk from 'chalk';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { HttpExceptionFilter } from 'shared/filters/http-execption.filter';

declare const module: any;

async function bootstrap() {
  // Create the app module
  const app = await NestFactory.create(AppModule);
  // Enable cors
  app.enableCors();
  app.useStaticAssets('files');
  // Set up swaggeer and get the servers domain
  const hostDomain = AppModule.isDev ? `${AppModule.host}:${AppModule.port}` : AppModule.host;
  const swaggerOptions = new DocumentBuilder()
    .setTitle('Contact API')
    .setDescription('Contact APi Documentation')
    .setVersion('1.0.0')
    .setHost(hostDomain.split('//')[1])
    .setBasePath('/v1')
    .addBearerAuth('Authorization', 'header')
    .build();
  //  Create the swagger doc
  const swaggerDoc = SwaggerModule.createDocument(app, swaggerOptions);

  // Set up the rout for the docs
  app.use('/v1/docs/swagger.json', (req, res) => {
    res.send(swaggerDoc);
  });

  SwaggerModule.setup('/v1/docs', app, null, {
    // swaggerUrl: `34.252.4.128/v1/docs/swagger.json`,
    swaggerUrl: `${hostDomain}/v1/docs/swagger.json`,
    explorer: true,
    swaggerOptions: {
      docExpansion: 'list',
      filter: true,
      showRequestDuration: true
    }
  })
  // Add the prefix v1 to all the requests
  app.setGlobalPrefix('v1');
  app.useGlobalFilters(new HttpExceptionFilter());
  // Let the app listen on port 8080
  await app.listen(AppModule.port);
  // Just printed output to highlight server has restarted
  console.log(chalk.green('Server created on ') + chalk.white('' + AppModule.port));

}

bootstrap();

