import React from 'react';

/**
 * este componente recibe un número y lo formatea
 * como moneda chilena
 * @param {{ amount: number, className?: string }} props
 */
function Price({ amount, className }) {

  // fallback por si el 'amount' no es un número válido
  if (typeof amount !== 'number' || isNaN(amount)) {
    return <span className={className}>$...</span>;
  }
  
  //formato para peso chileno 
  const formattedPrice = amount.toLocaleString('es-CL', {
    style: 'currency',
    currency: 'CLP',
    maximumFractionDigits: 0,
    minimumFractionDigits: 0,
  });

  return (
    <span className={className}>
      {formattedPrice}
    </span>
  );
}

//react.memo para optimizar
// no volverá a renderizar si las props no cambian
export default React.memo(Price);