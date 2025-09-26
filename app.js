const { useState, useEffect } = React;

const MostradorDeLogo = ({ empresa }) => {
  const manejarErrorImagen = (e) => {
    e.target.src = 'https://via.placeholder.com/150?text=No+Encontrado';
    console.warn(`No se pudo cargar el logo para: ${empresa.dominio}`);
  };

  const { nombre, dominio } = empresa;
  const urlLogo = `https://logo.clearbit.com/${dominio}`;

  return (
    <div className="logo-container">
      <img src={urlLogo} alt={`Logo de ${nombre}`} onError={manejarErrorImagen} />
      <h2>{nombre}</h2>
    </div>
  );
};

const FormularioDeBusqueda = ({ alBuscar }) => {
  const [termino, setTermino] = useState('');

  const manejarEnvio = (evento) => {
    evento.preventDefault();
    if (termino.trim()) {
      alBuscar(termino.trim());
    }
  };

  return (
    <form onSubmit={manejarEnvio} className="search-form d-flex gap-2 mt-4">
      <input
        type="text"
        className="form-control"
        placeholder="Ej: google.com, github.com..."
        value={termino}
        onChange={(e) => setTermino(e.target.value)}
      />
      <button type="submit" className="btn btn-primary">Buscar</button>
    </form>
  );
};

const App = () => {
  const empresasSugeridas = [
    { nombre: 'Google', dominio: 'google.com' },
    { nombre: 'Facebook', dominio: 'facebook.com' },
    { nombre: 'GitHub', dominio: 'github.com' },
    { nombre: 'Netflix', dominio: 'netflix.com' },
    { nombre: 'Spotify', dominio: 'spotify.com' },
  ];
  
  const [empresa, setEmpresa] = useState(empresasSugeridas[0]);
  const [sugerencia, setSugerencia] = useState(empresasSugeridas[1]);
  
  useEffect(() => {
    const idIntervalo = setInterval(() => {
      const indiceAleatorio = Math.floor(Math.random() * empresasSugeridas.length);
      setSugerencia(empresasSugeridas[indiceAleatorio]);
    }, 5000);

    return () => clearInterval(idIntervalo);
  }, []);

  const buscarYEstablecerLogo = (dominio) => {
    let empresaEncontrada;
    
    empresaEncontrada = empresasSugeridas.find(c => c.dominio.toLowerCase() === dominio.toLowerCase());
    
    if (!empresaEncontrada) {
      const nuevoNombre = dominio.split('.')[0];
      empresaEncontrada = { 
        nombre: nuevoNombre.charAt(0).toUpperCase() + nuevoNombre.slice(1), 
        dominio: dominio 
      };
    }
    
    setEmpresa(empresaEncontrada);
  };
  
  return (
    <div className="row justify-content-center">
      <div className="col-md-8 col-lg-6">
        <MostradorDeLogo empresa={empresa} />
        <FormularioDeBusqueda alBuscar={buscarYEstablecerLogo} />
        <p className="text-center mt-3 suggestion-text">
          Sugerencia: Intenta buscar "{sugerencia.dominio}"
        </p>
      </div>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));