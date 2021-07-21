import { Resolver, Mutation, Arg, Int, Query, Field, InputType} from 'type-graphql';
import { Movie } from '../entity/Movie';

@InputType()
class MovieInput{
    @Field()
    title: string;

    @Field()
    minutes: number;
}

@Resolver()
export class MovieResolver {
    // vai retornar o item que está sendo criado
    @Mutation(() => Movie)
    // Passando argumento para função
    async createMovie(
        @Arg("title", () => String) title: string, 
        @Arg("minutes", () => Int) minutes: number
    ){
        // Salvando o dado e retornando
        const movie = await Movie.create({ title, minutes }).save();
        return movie;
    }

    @Mutation(() => Boolean)
    async updateMovie(
        @Arg("id", () => Int) id: number,
        @Arg("input", () => MovieInput) input: MovieInput
    ){
        // Atualizando o dado
        await Movie.update({ id }, input);
        return true;
    }

    @Mutation(() => Boolean)
    async deleteMovie(
        @Arg("id", () => Int) id: number,
    ){
        // deletando o dado
        await Movie.delete({ id });
        return true;
    }

    // irá retornar uma lista
    @Query(() => [Movie])
    movies(){
        return Movie.find()
    }
}