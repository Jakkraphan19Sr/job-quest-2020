import { NestFactory } from '@nestjs/core'
import * as _ from 'lodash'
import { ValidationPipe } from '@nestjs/common'
import { MainModule } from './module/main.module'
import {
    DocumentBuilder,
    SwaggerModule,
} from '@nestjs/swagger'

async function bootstrap() {
    const port = _.toNumber(process.env.PORT) || 3000
    const app = await NestFactory.create(MainModule)
    const options = new DocumentBuilder()
        .setTitle('Thai joke API')
        .setDescription('Backend API for Thai joke')
        .setVersion('1.0')
        .build()
    const document = SwaggerModule.createDocument(app, options)
    SwaggerModule.setup('api', app, document)
    app.enableCors()
    app.useGlobalPipes(
        new ValidationPipe({
            transform: true,
        }),
    )
    await app.listen(port)
    return port
}

bootstrap().then(port => {
    console.log(`application started on port ${port}`)
})
