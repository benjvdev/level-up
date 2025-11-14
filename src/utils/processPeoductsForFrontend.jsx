export function processProductsForFrontend(backendProducts) {
  if (!Array.isArray(backendProducts)) {
    return [];
  }

  //filtramos solo los disponibles
  const availableProducts = backendProducts.filter(
    (product) => product.disponible === true
  );

  //transformamos los datos
  const transformedData = availableProducts.map((product) => ({
    code: product.id_producto,
    name: product.nombre,
    description: product.descripcion,
    price: product.precio,
    category: product.categoria,
    image: product.image,
    id_producto: product.id_producto,
    disponible: product.disponible //pasamos el 'disponible' por si acaso
  }));

  return transformedData;
}