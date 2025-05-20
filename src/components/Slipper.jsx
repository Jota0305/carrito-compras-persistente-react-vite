export default function Slipper({ slipper, addToCart }) {

  const { id, name, colour, image, description, price } = slipper;

  return (
    
    <div className="col-md-6 col-lg-4 my-4 row align-items-center">
      <div className="col-2">
        <img className="img-fluid" src={`/img/${image}.png`} alt="imagen" />
      </div>
      <div className="col-8">
        <h3 className="text-black fs-4 fw-bold text-uppercase">{name}</h3>
        <h4>Color: {colour}</h4>
        <p>{description}</p>
        <p className="fw-black text-black fs-3">S/ {price}</p>
        <button 
          type="button" 
          className="btn btn-dark w-100"
          onClick={() => addToCart(slipper)}>
            Agregar al Carrito
        </button>
      </div>
    </div>

  );
}
