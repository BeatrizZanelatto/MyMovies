import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react'

export default function App () {
  const [input, setInput] = useState("");
  const [ movies, setMovies ] = useState<String[]>([]) 
  const [ editarMovie, setEditarMovie ] = useState({ 
    enabled: false,
    tarefa: ''
  })
  const inputRef = useRef  <HTMLInputElement>(null);
  const primeiraR = useRef(true)


  useEffect(() => {
    const MovieSalvo = localStorage.getItem("@cursoreact")
    if (MovieSalvo) { 
      setMovies(JSON.parse(MovieSalvo));
    }
  }, [])

  useEffect( () => {
    if (primeiraR.current) { 
      primeiraR.current=false;
      return;
    }
    localStorage.setItem("@cursoreact", JSON.stringify ( movies ))
  }, [movies])

  const registrar = useCallback ( () => {
    if (!input) {
      alert("Preencha o nome do seu filme!")
      return
    }
    if(editarMovie.enabled){ 
      editarMovieSalvo(); 
      return
    }

    setMovies(movies => [...movies,input])
    setInput("");
  }, [ input, movies ])

  function editarMovieSalvo () { 
    const findIndexMovies = movies.findIndex(movies => movies === editarMovie.movies) 
    const todosMovies = [...movies];
    todosMovies[findIndexMovies] = input 
    setMovies(todosMovies); 
    setEditarMovie ({ 
      enabled: false, 
      movies: ''
    })
    setInput("")
  }

  function excluir ( item: String ) {
    const excluirMovie = movies.filter(movies => movies !== item) 
    setMovies(excluirMovie)

  }

  function editar ( item: String ) {
    inputRef.current?.focus(); 
    setInput(item)
    setEditarMovie({
      enabled: true,
      movies: item
    })
  }

  const totalMovies = useMemo(() => { 
    return movies.length
  }, [movies])

  return (
    <div className='containerDiv'>
      <h1>MyMovies</h1>
      <h2>❀ A sua lista de filmes! ❀</h2>
      <br></br>
      <input
        placeholder="Digite um filme" 
        value={ input }
        onChange={(e) => setInput(e.target.value)}
        ref={ inputRef }
      />
      <button className='bt-confirmar' onClick={ registrar } > { editarMovie.enabled ? "Atualizar filme" : "Adicionar filme"}</button>
      <hr/>
      <strong>Voce tem: { totalMovies } filmes!</strong>
      <hr/>
      {movies.map( (item, index) => ( 
        <section key={item} >
          <div>
            <span>{item}</span>
            <button onClick={ () => excluir(item) } >Excluir</button>
            <button onClick={ () => editar(item) } >Editar</button>
          </div>
        </section>
      ))}
</div>
  )
}