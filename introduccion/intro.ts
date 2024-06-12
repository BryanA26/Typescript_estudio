// Inferencia
// Ts infiere que a y b son tipo number
const a = 1 
const b = 2 
const c = a + b 
// Por lo tanto c tambien sera number

// Ts infiere que cadena es tipo string y existe el metodo
let cadena = 'hola mundo'
cadena.toLocaleUpperCase()


//Functions
// Las funciones no tienen inferencia sino tienen contexto
function saludar(name:string) {
    console.log(`hola ${name}`)
}

//Tipado de obj 
function  saludos({name, age}:{name:string, age:number}) {
    console.log(`Hola ${name}, tienes ${age} años`)
}

saludos({name:'pedro', age: 2})

// o

function sal(persona : {name: string, age: number}) {
    const {name,age} = persona
}

// Ts infiere en el valor que devuelve una funcion

function edad(persona : {name: string, age: number}) {
    const {name,age} = persona
    console.log(`hola ${name}, tienes ${age} años`)
    return name
}

//arrow functions

const saludito  = (persona:{name:string, age: number}) : string => {
    const {name,age} = persona
    console.log(`hola ${name}, tienes ${age} años`)
    return name
}

//En ciertos casos si funciona las inferencias 
const avengers = ['iron man','hulk','rihana']
avengers.forEach(avenger =>{
    console.log(avenger.toUpperCase())
})

//Objetos

let tony = {
    name: 'star',
    age : 100
}

tony.name

//type alias, pascal case

// type Heroe = {
//     name: string,
//     poder: string,
//     edad: number
// }

// let power: Heroe = {
//     name: 'thor',
//     poder: 'martillo',
//     edad: 45
// }

// const series = (power: Heroe):Heroe => {
//     const {name,poder,edad} = power
//     return {name,poder,edad}
// }

// const THOR = series({
//     name:'thor',
//     poder: 'martillo',
//     edad: 45
// })


//Optional properties y templates union types
type HeroeId = `${string}-${string}-${string}-${string}`
type Heroe = {
    readonly id?: HeroeId, //-> readonly hace que id sea INMUTABLE
    name: string,
    poder: string,
    edad: number
    isActive?: boolean // -> ?: si esta devuelve un true si no esta no pasa nada elvis operator
}

let power: Heroe = {
    name: 'thor',
    poder: 'martillo',
    edad: 45
}

const series = (power: Heroe):Heroe => {
    const {name,poder,edad} = power
    return {
        id : crypto.randomUUID(),
        name,
        poder,
        edad, 
        isActive: true}
}

// const THOR = series({
//     name:'thor',
//     poder: 'martillo',
//     edad: 45
// })

// null safety si el id existe o no SIGA
// THOR.id?.toString()

const THOR = Object.freeze(series({name: 'thor',poder:'martillo',edad:45})) //-> Object.freeze impide agregar, modificar y/o eliminar nuevas propiedades


//templates union types

type HexadecimalColor = `#${string}`

const colorA : HexadecimalColor = '#00000'
// const colorB : HexadecimalColor = '99999' -> error porque el tipo dice que debe tener #

THOR.name ?? 'no se' //-> Valor por defecto

//intersection types

// type pelota = {
//     tipo: string
//     medida: number
// }

type pelotaExiste = {
    isActive?: boolean
}

type infoPelota = {
    tipo: string
    medida: number
}

type pelota = infoPelota & pelotaExiste

let bola:pelota = {
    tipo :'futbol',
    medida : 20,
    isActive: true
    
}

const SOCCER = (bola:pelota) =>{
    const {tipo,medida,isActive} = bola
    return {
        tipo,
        medida,
        isActive
    }
}