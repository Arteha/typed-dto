## typed-dto

Installation: `npm install typed-dto`

## NestJS Example:

##### Define Error for errors middleware:
```typescript
class BadRequestException extends Error
{
    constructor(message?: string)
    {
        super(`400 - ${message || "Bad Request"}.`);
    }
}
```

##### Define Model:
```typescript
import {BaseDTO, Model, Property} from "typed-dto";

@Model
class ArticleDTO extends BaseDTO
{
    @Property({ type: "string", regexp: /^[0-9a-zA-Z]{5,256}$/s })
    public title: string;
    
    @Property({ type: "string", min: 5, max: 256*256 })
    public content: string;
    
    @Property({ type: "date" })
    public publishedAt: Date;
}
```


##### Controller:
```typescript
import { Controller, Get, Query, Post, Body, Put, Param, Delete } from '@nestjs/common';

@Controller("articles")
export class ArticlesController
{
    @Post()
    create(@Body() body = ArticleDTO.create(body)): string
    {
        // body will instance of ArticleDTO or null if not valid
        if(body)
        {
            /* ... service routine ... */
            return "OK";
        }
        throw new BadRequestException("Go away.");
    }
}
```
