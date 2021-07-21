import { Query, Resolver } from "type-graphql";

@Resolver()
export class HelloWorldResolver{
    // Retorno da query é uma String
    @Query(() => String)
    // Nome da Query
    hello() {
        return "Hello World"
    }
}