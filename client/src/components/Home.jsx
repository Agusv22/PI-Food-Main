import React from "react";
import { useState , useEffect } from "react";
import { useDispatch, useSelector} from "react-redux";
import { Link } from "react-router-dom";
import { getRecipes, filterByDiets, orderByTitle, orderByHealthScore } from "../actions";
import Card from "./Card";
import Paginado from "./Paginado";
import SearchBar from "./SearchBar";
import "./Home.css";
import fotoreceta from "../assets/recetas.jpg"

//useEffect actualiza cuando algo sucede
export default function Home(){
// Nos sirve para utilizar la constante despachando las acciones
    
    const dispatch = useDispatch()

    //Es lo mismo que hacer un mapStateToProps
    // Se declara la constante allRecipes para almacenar todo lo que está en el estado de recipes
    const allRecipes = useSelector((state) => state.recipes)

    //Vamos a setear estados locales
    const [orden, setOrden] = useState('');
    const [ordenHS, setOrdenHS] = useState('');

    //Arranco en la primer pagina (useState(1))
    const [currentPage, setCurrentPage] = useState(1);
    //seteamos cuantas recetas queremos por paginas(9)
    const [recipesPerPage, setRecipesPerPage] = useState(9);

    const indexOfLastRecipes = currentPage * recipesPerPage 
    const indexOfFirstRecipes = indexOfLastRecipes - recipesPerPage
    // el slide te divide un array dependiendo lo que le paso por parametro
    const currentRecipes = allRecipes.slice(indexOfFirstRecipes, indexOfLastRecipes);


    const paginado= (pageNumber) => {
        setCurrentPage(pageNumber)
    }


    useEffect(() =>{
    if(!allRecipes.length)
        dispatch(getRecipes());
    },[dispatch])

    // apretas el boton y te resetea todas las recetas 
    function handleClick(e){
        e.preventDefault();
        dispatch(getRecipes())
        setCurrentPage(1);
    }

    function handleFiltersDiets(e){
        
        dispatch(filterByDiets(e.target.value));
        setCurrentPage(1);
    }

    function handleSortTitle(e){
        e.preventDefault();
        dispatch(orderByTitle(e.target.value));
        setCurrentPage(1);
        setOrden(`Ordenado ${e.target.value}`)
    }

    function handleSortHealthScore(e){
        e.preventDefault();
        dispatch(orderByHealthScore(e.target.value));
        setCurrentPage(1);
        setOrdenHS(`Ordenado ${e.target.value}`)
    }


    return (
        <div>
            <img src={fotoreceta} width="50px" height="50px"/>
        <Link to= "/recetas"><div className="botonreceta"> Create Recipe </div></Link>
        <h1 className="titulohome">The Best Recipes!!</h1>
        <button className="cargar" onClick = {e => {handleClick(e)}}>
            Refresh Recipes!
        </button>
        <div className="nombresito1">
            <select className="ordenar" onChange={e => handleSortTitle(e)}>
                <option value="ascendente">A - Z</option>
                <option value="descendente">Z - A</option>
            </select>
            <select className="calorias" onChange={e => handleSortHealthScore(e)}>
                <option value= "mostHS">Most HealthScore</option>
                <option value= "lessHS">Less HealthScore</option>
            </select>
                <select className="tiposdedieta" onChange={e => {handleFiltersDiets(e)}}>
                <option value="All">All</option>
                <option value="gluten free">Gluten Free</option>
                <option value="ketogenic">Ketogenic</option>
                <option value="dairy free">Dairy free</option>
                <option value="lacto ovo vegetarian">Lacto ovo Vegetarian</option>
                <option value="vegan">Vegan</option>
                <option value="pescatarian">Pescatarian</option>
                <option value="paleolithic">Paleolithic</option>
                <option value="primal">Primal</option>
                <option value="fodmap friendly">Fodmap friendly</option>
                <option value="low fodmap">Low Fodmap</option>
                <option value="whole 30">Whole 30</option>
                <option value="vegetarian">Vegetarian</option>
                
            </select>
            <Paginado
            recipesPerPage= {recipesPerPage}
            allRecipes={allRecipes.length}
            paginado = {paginado}
            />
            <SearchBar setCurrentPage={setCurrentPage}/>
            { allRecipes.length === 0 ? <div> <img src="https://www.menuelsharkia.com/static/images/loading-foods.gif" alt="img not found"/></div> :
                <div className="cartita">
            {currentRecipes?.map(e => {
                return (
                    <fragment>
                <Card title={e.title} image={e.img? e.img : e.image} dietType={e.dietName? e.dietName : e.dieta?.map(e => {return (<div>{e.dietName}</div>)})} key={e.id} id={e.id}/>
                </fragment>
                );
            })}
        </div>
        }
        </div>
        </div>
    )
}