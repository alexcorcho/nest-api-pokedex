import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreatePokemonDto } from './dto/create-pokemon.dto';
import { UpdatePokemonDto } from './dto/update-pokemon.dto';
import { Pokemon } from './entities/pokemon.entity';
import { Model, isValidObjectId } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';


@Injectable()
export class PokemonService {

  constructor(
    @InjectModel(Pokemon.name) 
    private readonly pokemonModel:Model<Pokemon>){}

  async create(createPokemonDto: CreatePokemonDto) {
    createPokemonDto.name = createPokemonDto.name.toLocaleLowerCase();
    
    try{
      const pokemon = await this.pokemonModel.create(createPokemonDto)
      return pokemon;
    }catch (error){
      this.handleExcaptions(error)
    }
   
  }

  findAll() {
    return `This action returns all pokemon`;
  }

  async findOne(term: string) {
    let pokemon:Pokemon;
    //si no es un numero
    if(!isNaN(+term)){
      pokemon = await this.pokemonModel.findOne({no:term})
    }

//mongo ID
    if(!pokemon && isValidObjectId(term)){
      pokemon = await this.pokemonModel.findById(term);
    }
    //name
    if(!pokemon){
      pokemon = await this.pokemonModel.findOne({name:term.toUpperCase().trim()})
    }

    // si no se encuentra
    if(!pokemon) throw new NotFoundException(`Pokemon con id, nombre o numero "${term} no encontrado`)

    return pokemon
  }

  async update(term: string, updatePokemonDto: UpdatePokemonDto) {
    const pokemon = await this.findOne(term)
    if(updatePokemonDto.name)
      updatePokemonDto.name =updatePokemonDto.name.toLocaleLowerCase();

    try {
      await pokemon.updateOne(updatePokemonDto);
    return {...pokemon.toJSON(), ...updatePokemonDto}

    } catch (error) {
     this.handleExcaptions(error)
    }

   
  }

  async remove(id: string) {
  //  const pokemon = await this.findOne(id);
  //  await pokemon.deleteOne();
  // const result = await this.pokemonModel.findByIdAndDelete(id)
  const {deletedCount} = await this.pokemonModel.deleteOne({_id:id});
  if(deletedCount === 0 )
  throw new BadRequestException(`Pokemon con id "${id}" no se encuentra`)
  return 
  }

  private handleExcaptions(error:any){
    if(error.code === 11000){
      throw new BadRequestException(`EL pokemon ya existe ${JSON.stringify(error.keyValue)}`)
    }
    console.log(error)
    throw new InternalServerErrorException (`No se puede crear pokemon - Chequea los logs del servidor`)
  
  }
}
