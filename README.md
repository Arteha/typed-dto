## TypedDTO
Strong validated Data Transfer Objects for typescript.

NPM: [typed-dto](https://www.npmjs.com/package/typed-dto)

Installation: `npm install typed-dto`

## Example:

##### Schema:
`./dto/article.dto.ts`
```typescript
import {BaseDTO, Schema, Property} from "typed-dto";

@Schema
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


##### NestJS Usage:
`articles.controller.ts`
```typescript
import { Controller, Post, Body, HttpException } from '@nestjs/common';
import {ArticleDTO} from "./dto/article.dto";

@Controller("articles")
export class ArticlesController
{
    @Post("/create")
    create(@Body() article: ArticleDTO | null = ArticleDTO.create(body)): string
    {
        if(article)
            return "OK";
        throw new HttpException("Invalid body.", 400);
    }
}
```

##### Express Usage:
`app.ts`
```typescript
import * as express from "express";
import * as bodyParser from "body-parser";
import {ArticleDTO} from "./dto/article.dto";

const app = express();
app.use( bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); 

app.post('/articles/create', function(req, res)
{
    const article: ArticleDTO | null = ArticleDTO.create(req.body);
    
    if(article)
    {
        res.writeHead(200);
        res.end("OK");
    }
    else
    {
        res.writeHead(400);
        res.end("Invalid body.");
    }
});

app.listen(3000);
```
